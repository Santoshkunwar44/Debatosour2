const {stripe} = require("../utils/stripe");


class UtilityMethods{

    async getUserSubscriptionStatus(stripeCustomerId){
  
        try {
            
       
        const subscriptions = await stripe.subscriptions.list(
            {
              customer: stripeCustomerId ?? null ,
              status: "all",
              expand: ["data.default_payment_method"],
            },
            {
              apiKey: process.env.STRIPE_SECRET_KEY,
            }
          );
          if (!subscriptions.data.length) {
            return {
                status:false
            }
          } else {
            return {
                plan: subscriptions.data[0].plan.nickname,
                status: true,
            }
          }
        } catch (error) {
            throw Error(error)
        }
    }

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