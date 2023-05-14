

export const getMyTeam=(teams,myUserId)=>{

    if(!teams|| !myUserId)return;

   return  teams.find(team=>team.members.find(mem=>mem._id === myUserId))

}
export const getNextSpeakTeam = (teams,debateStartedTeam,roundShot)=>{


    if(!teams || !debateStartedTeam || !roundShot)return ;

    let teamsName = teams.map(team=>team.name)
    if(Math.floor(roundShot % 2) ===0 ){
     let nextTeam = teamsName.find(team=>team !== debateStartedTeam)
        return nextTeam;
    }else{
        return  debateStartedTeam;
    }

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
