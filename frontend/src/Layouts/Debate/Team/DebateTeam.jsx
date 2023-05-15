import "./DebateTeam.css"
import { BiUpvote } from "react-icons/bi"
import ParticipantPerson from '../../../components/DebateRoom/participantPerson/ParticipantPerson'
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from "../../../redux/store"
import { unVoteTeamApi, voteAndUnvoteTeamApi, voteTeamApi } from "../../../utils/Api"

const DebateTeam = ({  team }) => {
  const {votedTeam ,activeDebate} =useSelector(state=>state.debate);
  const {data} =useSelector(state=>state.user)
  const {rtmChannel} =useSelector(state=>state.other)
  const dispatch =useDispatch( )
  const {setVotedTeamAction  ,AddActiveDebate} = bindActionCreators(actionCreators,dispatch )


  const handleVote=async()=>{

    if(!data || !activeDebate)return;

    let payload = {
      user:data?._id,
      team:team.name,
      debate:activeDebate?.current?._id  
    }
  
    try {
      let updatedDebate ;
    if(votedTeam){
      if(team.name === votedTeam){
      let res =  await unVoteTeamApi(payload)
      updatedDebate = res.data.message
      setVotedTeamAction(null)
      }else{
        // vote and unvote
        delete payload.team;
        payload.voteTeam = team.name;
        payload.unVoteTeam = votedTeam ;
        const res =  await voteAndUnvoteTeamApi(payload);
        updatedDebate = res.data.message
        setVotedTeamAction(team.name)
      }
    }else{
      // vote the team 
     const res =  await voteTeamApi(payload);
      updatedDebate = res.data.message;
      setVotedTeamAction(team.name)
    }



    activeDebate.current = updatedDebate
    AddActiveDebate(activeDebate)

    if(rtmChannel?.current){
      rtmChannel.current.sendMessage({text:JSON.stringify({...updatedDebate,type:"live_vote"})})
    }
  } catch (error) {
    console.log(error)   
  }
  }
 

  return (
    <div className='debateTeamWrapper'>
      <div className='team_header_info'>
        <h2 className='team_name'>{team.name}</h2>
        <div className='vote_box'>
          <div className='vote_count'>
            {/* <BiUpvote/> */}

          </div>
          <button 
          onClick={handleVote}
           className={`vote_button ${team?.name === votedTeam ? "voted":""}`}>
            <BiUpvote />
            <p>{team.vote.length}</p>
            <p>VOTE</p>
          </button>
        </div>
      </div>
      <div className='team_member_list'>
        {
          team.members.map(person => (
            <ParticipantPerson person={person} key={person._id} />

          ))
        }
      </div>


    </div>
  )
}

export default DebateTeam

