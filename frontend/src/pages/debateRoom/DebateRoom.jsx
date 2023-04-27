import { useEffect, useLayoutEffect, useState  ,useRef} from "react"
import DebateScreenBox from "../../Layouts/Debate/DebateScreenBox/DebateScreenBox"
import { useToast } from '@chakra-ui/react';
import Participants from "../../Layouts/Debate/Participants/Participants"
import Navbar from "../../Layouts/Navbar/Navbar"
import LiveChat from "../../components/DebateRoom/LiveChat/LiveChat"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { getAgoraTokenApi, getDebateByIdApi  ,joinParticipantApi,removeParticipantApi } from "../../utils/Api"
import { bindActionCreators } from "redux"
import { v4 as uuid } from "uuid"
import { actionCreators } from "../../redux/store"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import AgoraRTM from 'agora-rtm-sdk'
import AgoraRTC from 'agora-rtc-sdk-ng'
import DebateAction from "../../components/DebateRoom/DebateAction/DebateAction"
import "./DebateRoom.css"
const APPID = "3b884a948c2e48848703ed80ad78b4c5";


const Rtm_client = AgoraRTM.createInstance(APPID);
const Rtc_client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
const rtcUid = Math.floor(Math.random() * 2032)
const DebateRoom = () => {
  const { activeDebate, isLive, isUserParticipant ,roomLoading} = useSelector((state) => state.debate);
  const { data } = useSelector(state => state.user)
  const [UrlSearchParams, setUrlSearchParams] = useSearchParams();
  const [WatchType, setWatchType] = useState()
  const { debateId } = useParams()
  const dispatch = useDispatch()
  const rtmChannelRef = useRef()
  const { AddActiveDebate, SetRoomIsLiveOrNot, SetIsUserParticipant, setIsLoading  ,SetRoomLoading} = bindActionCreators(actionCreators, dispatch)


  const [audioTracks, setAudioTracks] = useState({
    localAudioTracks: null,
    remoteAudioTracks: {}
  })
  const [RoomMembers, setRoomMembers] = useState([])
  const [micMuted, setMicMuted] = useState(true)
  const navigate = useNavigate()
  const [rtmChannel, setRtmChannel] = useState();
  const [activeSpeakers, setActiveSpeakers] = useState([])
  const toast = useToast()


  useLayoutEffect(() => {

    if (!isLive) return;
    const getAgoraToken = async () => {
      SetRoomLoading(true)
      const res = await getAgoraTokenApi({ channelName: debateId, role: "publisher", uid: rtcUid, tokentype: "1000", expiry: 86400 })
      if (res.status === 200) {
        let { rtcToken, rtmToken } = res.data;
        if (isLive) {
          initRTC(rtcToken);
          initRTM(rtmToken);
        }
      }
    }

    getAgoraToken()


  }, [isLive]);
  useEffect(() => {

    return async () => {
      closeTracks()
      AddActiveDebate(null)
      removeParticipant()
    }
  }, [])

  useEffect(() => {
    if (UrlSearchParams.get("audience")) {
      setWatchType("AUDIENCE")
    } else {
      setWatchType("PARTICIPANT")
    }
  }, [UrlSearchParams]);

  useEffect(() => {
    if (!debateId) return;
    fetchDebateById()
  }, [debateId]);

  useEffect(() => {



    let now = new Date().getTime();
    if (now < activeDebate?.startTime) {
      SetRoomIsLiveOrNot(false)
    } else {
      SetRoomIsLiveOrNot(true
      )
    }

  }, [activeDebate, data])


  useEffect(() => {
    if (!activeDebate) return;
    if (data) {
      let isParticipant = activeDebate?.teams.some(team => team.members.some(member => member._id === data?._id))
      if (isParticipant) {
        SetIsUserParticipant(true)
      } else {
        SetIsUserParticipant(false)
      }
    } else {
      SetIsUserParticipant(false)
    }
  }, [data, activeDebate])

  useEffect(()=>{

    if(isLive &&  activeSpeakers.length > 0){
      SetRoomLoading(false)
    }
    if(!isLive && activeDebate){
      SetRoomLoading(false)
    }

  },[isLive,activeSpeakers ])
  

  const initRTC = async (token) => {
    // Rtc_client.on("user-joined", handleUserJoined)
    Rtc_client.on("user-published", handleUserPublished)
    Rtc_client.on("user-left", handleUserLeave)
    await Rtc_client.join(APPID, debateId, token, rtcUid);
    if (!UrlSearchParams.get("audience")) {
      audioTracks.localAudioTracks = await AgoraRTC.createMicrophoneAudioTrack()
      audioTracks.localAudioTracks.setMuted(true)
      await Rtc_client.publish(audioTracks.localAudioTracks);
    }
    initVolumeIndicator()
  }

  const initRTM = async (token) => {    
    let userType;
    if (UrlSearchParams.get("audience")) {
      userType = "audience";
    } else {
      userType = "host";
    }
    let uid = rtcUid.toString()
    await Rtm_client.login({ uid, token });
    
    if (UrlSearchParams.get("audience")) {
      await Rtm_client.addOrUpdateLocalUserAttributes({ "name": "audience", "rtcUid": rtcUid?.toString(), 'avatar': "audience", "id": "audience", "type": userType ,"mic":"muted"});
    } else {
    
      await Rtm_client.addOrUpdateLocalUserAttributes({ "name": `${data.firstName} ${data.lastName}`, "rtcUid": rtcUid?.toString(), 'avatar': data.avatar, "id": data._id, "type": userType ,"mic":"muted" });
      await addParticipant()

    }
    const channel = Rtm_client.createChannel(debateId);
    rtmChannelRef.current = channel;

    setRtmChannel(channel)
    channel.on("MemberJoined", handleMemberJoined)
    channel.on("MemberLeft", handleMemberLeft);
    await channel.join()
  
    getChannelMembers(channel);

  }





  const fetchDebateById = async () => {
    if (!debateId) return;
    try {
      const res = await getDebateByIdApi(debateId)
      console.log("the active debate ", res)
      if (res.status !== 200) throw Error(res.data.message)
      AddActiveDebate(res.data.message[0]);
    } catch (error) {
      console.log(error)
    }
  }


  const getChannelMembers = async (channel) => {
    if (!channel) return;
    const members = await channel.getMembers()
    const uniqueMember = [...new Set(members)];

    
    let allMembers = await Promise.all(uniqueMember.map(async (memId) => {

      let { name, rtcUid, avatar, isAdmin, id, type } = await Rtm_client.getUserAttributes(memId, ['name', 'rtcUid', 'avatar', 'isAdmin', "id", "type"]);

      return {
        userId: memId,
        username: name,
        rtcUid,
        avatar,
        isMuted: true,
        id: id,
        type,
        isAdmin: Boolean(isAdmin)
      }

    }));
    allMembers = allMembers.filter(mem => mem.type !== "audience")
    setRoomMembers(allMembers)
  }

  const checkIfAnySpeakerIsUnmute=()=>{
 


  }

  let initVolumeIndicator = async () => {

    //1
    AgoraRTC.setParameter('AUDIO_VOLUME_INDICATION_INTERVAL', 200);
    Rtc_client.enableAudioVolumeIndicator();

    //2
    Rtc_client.on("volume-indicator", volumes => {
      setActiveSpeakers(volumes)
    })
  }
  const handleMemberJoined = async (MemberId) => {

    let { name, rtcUid, avatar, isAdmin, id, type } = await Rtm_client.getUserAttributes(MemberId, ['name', 'id', 'rtcUid', 'avatar', 'isAdmin', 'type'])


    const doesUserExist = RoomMembers.find(mem => mem.id === id)
    if (type === "audience") return;
    if (!doesUserExist) {


      setRoomMembers(mem => ([
        ...mem,
        {
          userId: MemberId,
          username: name,
          rtcUid,
          avatar,
          isMuted: true,
          id,
          isAdmin: Boolean(isAdmin)
        }
      ]))

    }





  }
  const handleUserPublished = async (user, mediaType) => {
    await Rtc_client.subscribe(user, mediaType);
    if (mediaType === "audio") {
      audioTracks.remoteAudioTracks[user.uid] = [user.audioTrack]
      user.audioTrack.play()
    }
  }
  const handleUserLeave = (theUser) => {

    delete audioTracks.remoteAudioTracks[theUser.uid]

  }
  const handleMemberLeft = (MemberId) => {
    console.log("someone left the room", MemberId)
    setRoomMembers(mem => mem.filter(m => m.userId !== MemberId))
  }

  const handleMicTogggle = async() => {


    console.log("the room speakekr",  await getRoomSpeaker())
   
    if(micMuted){
      if(!await getRoomSpeaker()){
        updateChannelAttribute(false)
        audioTracks.localAudioTracks.setMuted(false)
        setMicMuted(false)
      }else{
        toast({
          title: '',
          description: "Someone else is speaking .  ",
          status: 'error',
          duration: 5000,
          position: "top",
          isClosable: true,
        })
      }
    }else{
      updateChannelAttribute(true)
      audioTracks.localAudioTracks.setMuted(true)
      setMicMuted(true)
    }

   
  }
  const closeTracks = async() => {
  await  leaveRTMChannel()
 
    if (!UrlSearchParams.get("audience") && audioTracks?.localAudioTracks) {
      audioTracks.localAudioTracks?.stop()
      audioTracks.localAudioTracks?.close()
    }
    if(Rtc_client){

      Rtc_client.unpublish()
      Rtc_client.leave()
    }

  }
  const removeParticipant=async()=>{
    if(!UrlSearchParams.get("audience") && data){
      try {
       const res =  await removeParticipantApi(debateId,{
        participantId:data?._id
        })


          } catch (error) {
              console.log(error)
}
    }

  }
  const addParticipant=async()=>{
    if(!UrlSearchParams.get("audience") && data){
      try {
       const res =  await joinParticipantApi(debateId,{
        participantId:data?._id
        })
          } catch (error) {
              console.log(error)
}
    }

  }
  const leaveRTMChannel = async () => {
    
 await removeMeAsSpeaker()
    await rtmChannel?.leave();
    await Rtm_client?.logout();
  }

  const handleLeaveRoom = () => {
    closeTracks()
    navigate(-1)
  }

  const getRoomSpeaker=async()=>{


    if(Rtm_client && rtmChannelRef.current){
      const res =  await Rtm_client.getChannelAttributes(rtmChannelRef.current.channelId);
      let speakerId = res?.speaker?.value ;
      if(!speakerId || speakerId === "null" ){
        return false
      }else{
        return speakerId
      }
    }
  }

const removeMeAsSpeaker=async()=>{
 let speakerId =  await getRoomSpeaker()
console.log("unmountng",speakerId,Rtm_client,rtmChannelRef.current)
 if(speakerId && Rtm_client && rtmChannelRef.current){
  if(speakerId.toString() === rtcUid.toString()){
    console.log("ia am removeing me final")
    await   Rtm_client.addOrUpdateChannelAttributes(rtmChannelRef.current.channelId,{
      "speaker": "null"
    })   
  }
 }
}

const updateChannelAttribute =async(mute)=>{


  if(!rtmChannel || !Rtm_client )return;
  if(mute){
    await   Rtm_client.addOrUpdateChannelAttributes(rtmChannel.channelId,{
      "speaker": "null"
    })    
  }else{

  if(rtcUid){
    await   Rtm_client.addOrUpdateChannelAttributes(rtmChannel.channelId,{
      "speaker":  rtcUid.toString()
    })
  }
}
    
}


  return (
    <>
      <Navbar />
      <div className='DebateRoomWrapper' >
        <div className='debate_room_top_header'>
          <h1 className='Debate_room_main_text'>
            <img width={"50px"} src="/images/error_dino.png" alt="dinosour" />
            <h1 className='main_text_one'>  {isLive ? "ENJOY" : "NOT STARTED"}</h1>   </h1>
          <div className='round_text'>
            ROUND 0/{activeDebate?.noOfRounds}
          </div>
        </div>
        <DebateScreenBox 
         isLive={isLive}
         isUserParticipant={isUserParticipant}
         isNotWatch={WatchType !=="AUDIENCE"}
         activeSpeakers={activeSpeakers} 
         roomMembers={RoomMembers} />

          <DebateAction
          isUserParticipant={isUserParticipant}
          isLive={isLive}
          WatchType={WatchType}
          roomId={debateId}
            handleMicToggle={handleMicTogggle}
            handleLeaveRoom={handleLeaveRoom}
            micMuted={micMuted}
            setMicMuted={setMicMuted}

          /> 
    
        {
          isLive && WatchType === "AUDIENCE" ? <button className="leave_btn" onClick={handleLeaveRoom}>LEAVE</button> : ""
        }
        {/* <DebateInfo /> */}
        <div className='debate_bottom_container'>
          <Participants />
          <LiveChat />
        </div>
      </div>

    </>
  )
}

export default DebateRoom
