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
