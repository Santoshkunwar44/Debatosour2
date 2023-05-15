class UtilityMethods{
    hasVoted(teams,teamName,userId){
        return  teams.some(team=>{
            if(team.name===teamName){
                if(team?.vote?.length === 0 || !team?.vote  ){
                    return false
                }else{
                    return team.vote?.find(user=>user.toString() === userId)
                }
            }else{
                return false
            }
        })
    }
}
module.exports = new UtilityMethods()