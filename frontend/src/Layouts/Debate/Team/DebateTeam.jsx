import "./DebateTeam.css"
import { BiUpvote } from "react-icons/bi"
import ParticipantPerson from '../../../components/DebateRoom/participantPerson/ParticipantPerson'

const DebateTeam = ({ index, team, isLive }) => {
  return (
    <div className='debateTeamWrapper'>
      <div className='team_header_info'>
        <h2 className='team_name'>{team.name}</h2>
        <div className='vote_box'>
          <div className='vote_count'>
            {/* <BiUpvote/> */}

          </div>
          <button className='vote_button'>
            <BiUpvote />
            <p>{team.vote}</p>
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

