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