export const getMyTeam=(teams,myUserId)=>{

    if(!teams|| !myUserId)return;

   return  teams.find(team=>team.members.find(mem=>mem._id === myUserId))

}