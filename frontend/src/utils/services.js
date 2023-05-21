import AgoraRTC from "agora-rtc-sdk-ng";
import { Rtc_client, Rtm_client  } from "../pages/debateRoom/DebateRoom";
import { Enums } from "../redux/action/actionTypes/Enumss";
import { getAgoraTokenApi, joinParticipantApi, updateDebateApi } from "./Api";
import { avatarsTypeData } from "./data";
import SpeechRecognition from "react-speech-recognition";

export const getMyTeam = (teams, myUserId) => {
  if (!teams || !myUserId) return;

  return teams.find((team) => team.members.find((mem) => mem._id === myUserId));
};
export const getNextSpeakTeam = (teams, debateStartedTeam, roundShot) => {
  if (!teams || !debateStartedTeam || !roundShot) return;

  let teamsName = teams.map((team) => team.name);
  if (Math.floor(roundShot % 2) === 0) {
    let nextTeam = teamsName.find((team) => team !== debateStartedTeam);
    return nextTeam;
  } else {
    return debateStartedTeam;
  }
};
export const setLoggedInUserData = (userData) => {
  if (userData) {
    localStorage.setItem("user", JSON.stringify(userData));
  }
};

export const getLoggedInUserData = () => {
  return JSON.parse(localStorage.getItem("user"));
};


export const removeLoggedInUserData=()=>{
  localStorage.removeItem("user")
}


export const getTimeCountDown=(timeInMs , day,hour,min,sec)=>{
  if(timeInMs){
      const { day,hour,min, sec} =    getTimeFromMs(timeInMs)
      return ` ${day ? `${day > 1 ? `${day}days` :`${day}day`} :` :""}  ${hour ? `${hour > 1 ? "hours":"hour"}:`:""} ${(min ||  hour) ? `${min}min :`:""} ${`${sec}sec`}
      `
  }else{

    return ` ${day ? `${day > 1 ? `${day}days` :`${day}day`} :` :""}  ${hour ? `${hour > 1 ? `${hour}hours`:`${hour}hour`}  :`:""} ${(min ||  hour) ? `${min}min :`:""} ${`${sec}sec`}
    `
  }
}

export const getTimeFromMs=(timeInMs)=>{
   const day =  Math.floor(timeInMs / 1000 / 60 / 60 / 24);
   const hour = Math.floor((timeInMs / 1000 / 60 / 60) % 24);
   let min = Math.floor(timeInMs / (1000 * 60));
   let sec = Math.floor((timeInMs / 1000) % 60);

    return {day,hour ,min,sec}
   
}

export const getTheVotedTeam=(teams,userId)=>{

    const theTeam =  teams.find(team=>team.vote?.find(user=>user===userId))
    if(theTeam){
        return theTeam.name;
    }else{
        return false
    }
}

export const getNamesofTeam=(teams)=>{

    return   teams?.map(team=>team.name)
  

}

export const changeVote=(teams,type,userId ,teamsName )=>{
    return teams.map(team=>{
        if(team.name === teamsName){
            if(type==="pull"){

                return {...team,vote:team.vote.filter(mem=>mem !== userId)}
            }else{
                    return {...team,vote:[...team.vote  , userId]  }
            } 
        }else{
            return team;
        }
    })
}

export function generateRandomNumber() {
  var min = 100000; // Minimum 6-digit number (inclusive)
  var max = 999999; // Maximum 6-digit number (inclusive)

  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber
}

export function getMysterAvatar(gameResult){
  const randomNumber = Math.floor(Math.random()*100);
  let mysteryAvatar ;

  if(gameResult==="win"){
    if(randomNumber<25){
    mysteryAvatar=   getRandomAvatar(avatarsTypeData.common,"Common")
    }else if(randomNumber < 50){
     mysteryAvatar= getRandomAvatar(avatarsTypeData.rare,"Rare")
      
    }else if(randomNumber <75){
   mysteryAvatar=   getRandomAvatar(avatarsTypeData.legendary,"Legendary")
    }else{
      mysteryAvatar= getRandomAvatar(avatarsTypeData.epic,"Epic")
    }
  }else if(gameResult==="lose"){

    if(randomNumber<5){
          mysteryAvatar=   getRandomAvatar(avatarsTypeData.legendary,"Legendary")
      }else if(randomNumber < 15){
          mysteryAvatar= getRandomAvatar(avatarsTypeData.epic,"Epic")
      }else if(randomNumber <35){
           mysteryAvatar=   getRandomAvatar(avatarsTypeData.rare,"Rare")
      }else{
         mysteryAvatar= getRandomAvatar(avatarsTypeData.common,"Common")
      }
  }
  return mysteryAvatar;
}

const  getRandomAvatar=(avatars , avatarType)=>{
  let randomNum = Math.floor(Math.random() * avatars.length);
 return { type:avatarType,  avatar: avatars[randomNum]}
}
 
export const checkIfUserAlreadyExist=(speakers,uid)=>{
  return speakers.find(speaker=>speaker?.uid ===uid)
}
class DebateRoomServices{

  #username;
  constructor({rtmChannelRef ,navigate,rtcUid ,data:user , lastApiCallConfig, setRoomLoading ,activeDebateRef , debateStateRef, setUsername ,setDebateState ,setActiveMicControlTeam  ,isAudience ,setRoomMembers ,setMicMuted ,debateId ,RoomMembers ,audioTracks ,setActiveSpeakers ,setRtmChannelAction ,isLive  ,micMuted  ,AddActiveDebate,setMessage ,roundShotsCount ,showToast ,activeSpeakers ,timeRemainingRef ,otherState  ,activeMicControlTeam
  }){
    this.navigate = navigate
    this.rtmChannelRef = rtmChannelRef; 
    this.rtcUid = rtcUid;
    this.currentUser= user;
    this.activeDebate = activeDebateRef;
    this.showToast=showToast;
    this.debateState = debateStateRef;
    this.changeDebateState=setDebateState
    this.changeUserName=setUsername;
    this.changeMicControlTeam= setActiveMicControlTeam;
    this.AddActiveDebate= AddActiveDebate;
    this.setMessage = setMessage;
    this.isAudience = isAudience ;
    this.changeRoomMember=setRoomMembers;
    this.debateId = debateId;
    this.RoomMembers=RoomMembers;
    this.audioTracks = audioTracks;
    this.changeActiveSpeakers=setActiveSpeakers ;
    this.activeSpeakers = activeSpeakers ;
    this.timeRemainingRef= timeRemainingRef;
    this.setMicMuted = setMicMuted;
    this.activeMicControlTeam=activeMicControlTeam;
    this.micMuted  = micMuted;
    this.isLive= isLive ;
    this.SetRoomLoading=setRoomLoading ;
    this.setRtmChannelAction = setRtmChannelAction;
    this.lastApiCallConfig= lastApiCallConfig;
    this.roundShotsCount = roundShotsCount;
    this.otherState = otherState ;

  }

  getWinnerByVote(teams){
    let teamWithLongestVote = null;
    let maxLength = 0;
  
    const teamOne = teams[0].vote.length;
    const teamTwo = teams[1].vote.length;
  
    if(teamOne===teamTwo){
      return Enums.MATCH_TIED;
    }
  
    teams.forEach(team => {
      if (team.vote.length > maxLength) {
        maxLength = team.vote.length;
        teamWithLongestVote = team.name;
      }
    });
  
      return teamWithLongestVote;
  }
  
   getTeamDataByName (teamName) {
    if (!this.activeDebate?.current) return;
    return this.activeDebate?.current.teams.find(team => team.name === teamName)

  }

  async UpdateChannelAttr(key,payload){
    const {channelId} = this.rtmChannelRef.current
    await Rtm_client.addOrUpdateChannelAttributes(channelId, {
      [key]: JSON.stringify(payload)
    })
  }
 
  async handlePauseDebate  () {
    const { isPaused, isStarted } = this.debateState?.current;
    if (!this.activeSpeakers || !isStarted || isPaused) return;

    const otherDebators = this.activeSpeakers.filter(speaker => speaker.uid !== this.rtcUid);
    let debateRoundsPayload = {
      ...this.debateState?.current,
      changedAt: Date.now(),
      isPaused: true,
      remainingTime: this.timeRemainingRef.current
    }
    if (otherDebators.length === 0) {
      await this.UpdateChannelAttr("debateRounds",debateRoundsPayload)
    };

  }

  async initVolumeIndicator  () {

    //1
    AgoraRTC.setParameter('AUDIO_VOLUME_INDICATION_INTERVAL', 200);
    Rtc_client.enableAudioVolumeIndicator();

    //2
    Rtc_client.on("volume-indicator", volumes => {
      this.changeActiveSpeakers(volumes)
    })
  }

  async removIntervalFunc(){
    const { removeInterval } = this.otherState;
    if (!removeInterval) return;
    clearInterval(removeInterval?.intervalRef?.current);
    removeInterval.intervalArrRef.current = [];
  }
  async handleUserPublished  (user, mediaType)  {
    await Rtc_client.subscribe(user, mediaType);
    if (mediaType === "audio") {
      this.audioTracks.remoteAudioTracks[user.uid] = [user.audioTrack]
      user.audioTrack.play()
    }
  }
  async handleUserLeave(theUser) {
    delete  this.audioTracks.remoteAudioTracks[theUser.uid]
  }
  async getChannelAttributeFunc(){

    if (!Rtm_client || !this.rtmChannelRef.current) return;
    
    const {channelId} = this.rtmChannelRef.current;
    const attr = await Rtm_client.getChannelAttributes(channelId);
    return attr
  }
  async addSpeechToChannel(transcript,resetTranscript){


    if(!this.currentUser || this.activeDebate.judgeType !== Enums.AIJUDGE || !transcript)return;

    const attr =  await this.getChannelAttributeFunc();

    let  speechText = attr?.speechText?.value;
    const thePast = speechText ? JSON.parse(speechText) : []
    let currentRound=this.debateState.round_shot
    const userId = this.currentUser?._id
    let myTeam =  getMyTeam(this.activeDebate.teams,userId).name;
    myTeam  = this.debateState.speakTeam === "both" ? 'both' : myTeam
    let currentRoundSpeech = {}


       let remoteCurrentRoundSpeech= thePast[currentRound-1];

        if(remoteCurrentRoundSpeech){
         let  ourTeamSpeech=  remoteCurrentRoundSpeech[myTeam] 
         if(ourTeamSpeech){

           let mySpeechText = ourTeamSpeech[userId]
           // check if the user is speaking first time or has the previous speech text
           if(mySpeechText){
            mySpeechText= `${mySpeechText} ${transcript}`
          }else{
            mySpeechText= ` ${transcript}`
          }
          
          currentRoundSpeech={
            [myTeam]:{
              ...ourTeamSpeech,
              round:currentRound,
              [userId]: mySpeechText
            }
          }
          
        }else{
          currentRoundSpeech={  
            [myTeam]:{
              round:currentRound,
              [userId]: transcript
            }
          }
        }
          
        }else{
          currentRoundSpeech={
          [myTeam]:{
            round:currentRound,
            [userId]: transcript
          }
        }
        }

        
      let newArr = [...thePast  ] 
      newArr[currentRound-1 ] = currentRoundSpeech
      resetTranscript()
      // await  updateChannelSpeechText(newArr)



  } 
  async LeaveRtmChannel(){
    await this.RemoveMeAsASpeaker()
    await this.rtmChannelRef.current?.leave();
    await Rtm_client?.logout();
  }
  async closeTracks(){
    
    await this.addSpeechToChannel()
    await this.handlePauseDebate();
    await this.LeaveRtmChannel();

    if (!this.isAudience && this.audioTracks?.localAudioTracks) {
      this.audioTracks.localAudioTracks?.stop()
      this.audioTracks.localAudioTracks?.close()
    }
    if (Rtc_client) {
      Rtc_client?.unpublish()
      Rtc_client?.leave()
    }


  }
  async getRoomSpeaker(){
    if (Rtm_client && this.rtmChannelRef.current) {
      const res = await Rtm_client.getChannelAttributes(this.rtmChannelRef.current.channelId);
      let speakerId = res?.speaker?.value;
      if (!speakerId || speakerId === "null") {
        return false
      } else {
        return speakerId
      }
    }

  }
  async RemoveMeAsASpeaker(){
    const {current:RtmChannel} = this.rtmChannelRef
    let speakerId = await this.getRoomSpeaker();
    if (speakerId && Rtm_client && RtmChannel) {
      if (speakerId.toString() === this.rtcUid.toString()) {
        await Rtm_client.addOrUpdateChannelAttributes(RtmChannel.channelId, {
          "speaker": "null"
        })
      }
    }
  }



  async showAdminName(){
    console.log("admin",this.#username)
  }
  async getChannelMembers(channel){
    if(!channel)return
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
        isAdmin: isAdmin === "true"
      }

    }));
  return  allMembers = allMembers.filter(mem => mem.type !== "audience")
  }
  async setTheSpeakerTeamToChannel (team, removeSpeakersFromChannel)  {
    if (!team ) return;


    let speakersDataPayload;
    if (removeSpeakersFromChannel) {
      speakersDataPayload = "null"
    } else {
      if (team === "both") {
        speakersDataPayload = "both"
      } else {
        const speakersIds = team.members.map(mem => mem._id)
        speakersDataPayload = {
          speakersIds,
          debateType: this.debateState.type,
          teamName: team.name,
        }
      }
    }


    
    await this.UpdateChannelAttr("speakersData",speakersDataPayload)




  }
  async handleLastApiCall(){
    const {_id,judgeType,teams} = this.activeDebate.current ;
   const winnerTeam =  this.getWinnerByVote(teams);
   const payload={
    winner:winnerTeam
   }
   
   if(judgeType===Enums.AIJUDGE){
    payload.transcript =  "transcript here"
   }
   try {
     const {status,data} = await updateDebateApi(_id,payload);
     if(status ===200){
      this.lastApiCallConfig.current.hasApiCalled = true;
     }else{
      throw Error("something went wrong")
     }
   } catch (error) {
      console.log(error);
   }
  }
async handleLastSetup(){


  let myUid = Number(this.rtcUid)
  const nextUser = this.RoomMembers.find((mem)=>Number(mem.rtcUid) > myUid)
  if(!nextUser){
  await  this.handleLastApiCall()
  await  this.createChannelMessage({
    type:"last_api_call_success"
  })
  }


}


  async handleCloseDebate () {
    const { timeFormat } = this.activeDebate.current;
    let debateRoundsPayload = {
      round_shot: timeFormat.length + 1,
      speakTeam: "",
      speakTime: 0,
      isStarted: false,
      noOfRounds: timeFormat.length,
      hasFinished: true,
      startedAt: 0,
      endTime: 0,
      both: false,
      isPaused: false,
      changedAt: 0,
    }
    this.changeDebateState(debateRoundsPayload)
    this.changeMicControlTeam(null)
    await this.UpdateChannelAttr("debateRounds",debateRoundsPayload)
    await this.setTheSpeakerTeamToChannel(null , true)
    await this.handleLastSetup()
  }
 handleChangeUsername(){
  this.changeUserName("manas")
}
async handleMemberJoined   (MemberId)  {

  let { name, rtcUid, avatar, isAdmin, id, type } = await Rtm_client.getUserAttributes(MemberId, ['name', 'id', 'rtcUid', 'avatar', 'isAdmin', 'type'])


  const doesUserExist = this.RoomMembers.find(mem => mem.id === id)
  if (type === "audience") return;
  if (!doesUserExist) {

    this.changeRoomMember(mem => ([
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
async addParticipant()  {
  if(this.isAudience)return;
    try {
     await joinParticipantApi(this.activeDebate?.current._id, {
        participantId: this.currentUser?._id
      })
    } catch (error) {
      console.log(error)
    }
}
async handleMemberLeft (MemberId)  {
  this.changeRoomMember(mem => mem.filter(m => m.userId !== MemberId))
}
async handleChannelMessage  (message)  {
  const data = JSON.parse(message.text);
  console.log("icoming message",data)
  if (data.type === "round_change") {
    if (this.roundShotsCount.current !== 1 && data?.rounds?.isMicPassed) {
  this.removIntervalFunc()
    }

    const { rounds, speakers } = data
    if (this.roundShotsCount.current >= rounds.round_shot) return;
    if (speakers.teamName === "both") {
      this.changeMicControlTeam("both")
    } else {
      this.changeMicControlTeam(this.getTeamDataByName(speakers.teamName))
    }
    this.changeDebateState(rounds)
  } else if (data.type === "resume_debate") {
    this.changeDebateState(data)
  } else if (data.type === "live_chat") {
    delete data.type
    this.setMessage(prev => ([
      ...prev, data
    ]))
  } else if (data.type === "live_vote") {
    delete data.type;
    this.activeDebate.current = data;
    this.AddActiveDebate(this.activeDebate)
  }else if(data.type==="last_api_call_success"){
    this.lastApiCallConfig.current.hasApiCalled=true
  }
}
async InitRTM({token}){

  try {
    const {_id,avatar,firstName,lastName}   =  this.currentUser;
    const {admin:{_id:adminId}} = this.activeDebate.current
    let rtcUid = this.rtcUid.toString();
    let isAdmin  = _id === adminId
    await Rtm_client.login({ uid:rtcUid, token });
    if (this.isAudience) {
      await Rtm_client.addOrUpdateLocalUserAttributes({ "name": "audience", "rtcUid": rtcUid, 'avatar': "audience", "id": "audience", "type": "audience", "mic": "muted" });
    } else {
      await Rtm_client.addOrUpdateLocalUserAttributes({
         "name": `${firstName} ${lastName}`,
          "rtcUid": rtcUid, 
          'avatar': avatar, 
          "id": _id, 
          "type": "host",
           'isAdmin':  `${isAdmin}`,
           "mic": "muted" });
      await this.addParticipant()
    }
    const channel = Rtm_client.createChannel(this.debateId);
    channel.on("MemberJoined",(memId)=> this.handleMemberJoined(memId))
    channel.on("MemberLeft", (memId)=> this.handleMemberLeft(memId));
    channel.on("ChannelMessage", (message)=> this.handleChannelMessage(message))
    this.setRtmChannelAction(channel)
    this.rtmChannelRef.current = channel;
    await channel.join()
    this.setChannelMember(channel);
  } catch (error) {
console.log("error",error)  
  }
}

async setChannelMember(channel){
    if (!channel) return;
    const allMembers =  await this.getChannelMembers(channel)
    this.changeRoomMember(allMembers)
}
async initRTC  (token)  {
  try {

  await Rtc_client.join(process.env.REACT_APP_AGORA_APP_ID, this.debateId, token, this.rtcUid);
  Rtc_client.on("user-published", (user,mediaType)=> this.handleUserPublished(user,mediaType));
  Rtc_client.on("user-left",(user)=> this.handleUserLeave(user));
  if (!this.isAudience) {
    this.audioTracks.localAudioTracks = await AgoraRTC.createMicrophoneAudioTrack()
    this.audioTracks.localAudioTracks.setMuted(true)
    await Rtc_client.publish(this.audioTracks.localAudioTracks);
  }
  await this.initVolumeIndicator();
        
} catch (error) {
      console.log(error)
}
}

async getAgoraToken() {
  this.SetRoomLoading(true)
  console.log("inside agora",this.isLive)
  const res = await getAgoraTokenApi({ channelName: this.debateId, role: "publisher", uid: this.rtcUid, tokentype: "1000", expiry: 86400 })
  if (res.status === 200) {
    let { rtcToken, rtmToken } = res.data;
    if (this.isLive) {
      await this.initRTC(rtcToken);
      await this.InitRTM({ rtmToken });
      this.SetRoomLoading(false)
    }
  }
}
async createChannelMessage(message)  {
  await this.rtmChannelRef.current.sendMessage({ text: JSON.stringify(message) })
}
async handleResumeDebate ()  {
  const { isPaused, isStarted } = this.debateState.current;
  if (!isStarted || !isPaused) return;
  const debateRoundsPayload = {
    ...this.debateState.current,
    isPaused: false,
    changedAt: Date.now()
  };

  this.changeDebateState(debateRoundsPayload);
  await this.UpdateChannelAttr("debateRounds",debateRoundsPayload)
  await this.createChannelMessage({ ...debateRoundsPayload, type: "resume_debate" })



}
async checkIfUserAlreadyExist(){
}
async checkIfUserCanUnMute (){
  if (!this.activeMicControlTeam) return;

  if (this.activeMicControlTeam === "both") {
    return true;
  }

  const myTeam = getMyTeam(this.activeDebate?.current?.teams,this.currentUser?._id)?.name
  if (this.activeMicControlTeam.name !== myTeam) {
    this.showToast("Next team has  mic control", "error");
    return false;
  }     
  if (await this.getRoomSpeaker()) {
    this.showToast("Someone else is speaking", "error");
    return false;
  }else{
    return true;
  }
    



}
async handleMicTogggle  () {
  console.log("toggling")
  if (this.micMuted) {
    console.log("toggling unmuting",)
    if (!await this.checkIfUserCanUnMute()) {
      return;
    };
    await this.UpdateChannelAttr("speaker",this.rtcUid.toString())
    this.audioTracks.localAudioTracks.setMuted(false)
    this.setMicMuted(false)
    await  SpeechRecognition.startListening()
  }
  else {
    console.log("toggling muting",)
    this.audioTracks.localAudioTracks.setMuted(true)
    this.setMicMuted(true)
    await this.UpdateChannelAttr("speaker","null")
    await this.addSpeechToChannel()
  }


}






}
export  { DebateRoomServices}