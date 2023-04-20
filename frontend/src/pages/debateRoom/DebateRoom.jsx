import { useEffect, useLayoutEffect, useState } from "react"
import DebateScreenBox from "../../Layouts/Debate/DebateScreenBox/DebateScreenBox"
import Participants from "../../Layouts/Debate/Participants/Participants"
import Navbar from "../../Layouts/Navbar/Navbar"
import LiveChat from "../../components/DebateRoom/LiveChat/LiveChat"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { getAgoraTokenApi, getDebateByIdApi } from "../../utils/Api"
import { bindActionCreators } from "redux"
import { v4 as uuid } from "uuid"
import { actionCreators } from "../../redux/store"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import AgoraRTM from 'agora-rtm-sdk'
import AgoraRTC from 'agora-rtc-sdk-ng'
import DebateAction from "../../components/DebateRoom/DebateAction/DebateAction"
import "./DebateRoom.css"
const APPID = "4ab5fb9ff2764849805b851cbb85d761";


const Rtm_client = AgoraRTM.createInstance(APPID);
const Rtc_client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
const rtcUid = Math.floor(Math.random() * 2032)
const DebateRoom = () => {
  const { activeDebate, isLive, isUserParticipant } = useSelector((state) => state.debate);
  const { data } = useSelector(state => state.user)
  const [UrlSearchParams, setUrlSearchParams] = useSearchParams();
  const [WatchType, setWatchType] = useState()
  const { debateId } = useParams()
  const dispatch = useDispatch()
  const { AddActiveDebate, SetRoomIsLiveOrNot, SetIsUserParticipant, setIsLoading } = bindActionCreators(actionCreators, dispatch)


  const [audioTracks, setAudioTracks] = useState({
    localAudioTracks: null,
    remoteAudioTracks: {}
  })
  const [RoomMembers, setRoomMembers] = useState([])
  const [micMuted, setMicMuted] = useState(true)
  const navigate = useNavigate()
  const [rtmChannel, setRtmChannel] = useState();
  const [activeSpeakers, setActiveSpeakers] = useState([])



  useLayoutEffect(() => {

    if (!isLive) return;
    const getAgoraToken = async () => {
      setIsLoading(true)
      const res = await getAgoraTokenApi({ channelName: debateId, role: "publisher", uid: rtcUid, tokentype: "1000", expiry: 86400 })
      console.log('res status ', res.status)
      if (res.status === 200) {
        let { rtcToken, rtmToken } = res.data;
        if (isLive) {
          initRTC(rtcToken);
          initRTM(rtmToken);
          setIsLoading(false)

        }
      }
    }

    getAgoraToken()


  }, [isLive]);
  useEffect(() => {

    return () => {
      closeTracks()
      AddActiveDebate(null)
    }
  }, [])

  useEffect(() => {
    if (UrlSearchParams.get("audience")) {
      setWatchType("AUDIENCE")
    } else {
      setWatchType("PARTICIPANT")
    }
  }, [UrlSearchParams])
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
  // init rtc


  // useEffect(() => {
  //   if (RoomMembers.length <= 2) return;
  //   const uniqueUsers = RoomMembers.filter((user, index, arr) => {
  //     return arr.findIndex((t) => t.id === user.id) === index;
  //   });
  //   setRoomMembers(uniqueUsers)
  // }, [RoomMembers])

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
      await Rtm_client.addOrUpdateLocalUserAttributes({ "name": "audience", "rtcUid": rtcUid?.toString(), 'avatar': "audience", "id": "audience", "type": userType });
    } else {
      await Rtm_client.addOrUpdateLocalUserAttributes({ "name": `${data.firstName} ${data.lastName}`, "rtcUid": rtcUid?.toString(), 'avatar': data.avatar, "id": data._id, "type": userType });

    }
    const channel = Rtm_client.createChannel(debateId)
    setRtmChannel(channel)
    channel.on("MemberJoined", handleMemberJoined)
    channel.on("MemberLeft", handleMemberLeft);
    await channel.join()
    getChannelMembers(channel)

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

  const handleMicTogggle = () => {
    audioTracks.localAudioTracks.setMuted(!micMuted)
    setMicMuted((prev) => !prev)
  }
  const closeTracks = () => {
    leaveRTMChannel()

    if (!UrlSearchParams.get("audience")) {
      audioTracks.localAudioTracks.stop()
      audioTracks.localAudioTracks.close()
    }
    Rtc_client.unpublish()
    Rtc_client.leave()

  }
  const leaveRTMChannel = async () => {
    await rtmChannel?.leave()
    await Rtm_client.logout()
  }

  const handleLeaveRoom = () => {
    closeTracks()
    navigate(-1)
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
        <DebateScreenBox isLive={isLive} activeSpeakers={activeSpeakers} roomMembers={RoomMembers} />
        {
          isUserParticipant === null ? ".." : (isUserParticipant && isLive && WatchType === "PARTICIPANT") ? <DebateAction
            handleMicToggle={handleMicTogggle}
            handleLeaveRoom={handleLeaveRoom}
            micMuted={micMuted}
            setMicMuted={setMicMuted}

          /> : ""
        }
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
