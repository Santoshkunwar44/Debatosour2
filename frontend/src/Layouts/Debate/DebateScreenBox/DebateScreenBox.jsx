import { useSelector } from 'react-redux'
import DebatorView from '../DebatorView/DebatorView'
import "./DebateScreenBox.css"
import { useEffect, useState } from 'react';
import NotStartedView from '../DebatorView/NotStartedView/NotStartedView';
import NoneJoined from '../NoneJoined/NoneJoined';
import DebateScreenSkeleton from "../../Skeleton/DebateScreenBox/DebateScreenSkeleton"

const DebateScreenBox = ({ roomMembers, activeSpeakers, isLive  ,isNotWatch,isUserParticipant}) => {
  const { activeDebate, activeParticipants } = useSelector((state) => state.debate);


  const [teams, setTeams] = useState([])
  useEffect(()=>{

  },[teams])
  useEffect(() => {

    if (activeDebate) {


      let speakerTeams = roomMembers.filter(speaker => {
        return activeDebate.teams.some(team => {
          return team.members.some(member => {
            return member._id === speaker.id;
          });
        });
      }).map(speaker => {
        let team = activeDebate.teams.find(team => {
          return team.members.some(member => {
            return member._id === speaker.id;
          });
        });
        return { id: speaker.id, teamName: team.name, ...speaker };
      }).reduce((acc, speaker) => {
        if (acc[speaker.teamName]) {
          acc[speaker.teamName].push(speaker);
        } else {
          acc[speaker.teamName] = [speaker];
        }
        return acc;
      }, {});




      const TeamArray = [
        {
          name: activeDebate.teams[0].name,
          members: []
        },
        {
          name: activeDebate.teams[1].name,
          members: []
        }
      ]

      Object.keys(speakerTeams).forEach((team) => {
        TeamArray.forEach((teamObj) => {
          if (teamObj.name === team) {
            teamObj.members = speakerTeams[team];
          }
        })

      })
      console.log("final", TeamArray)
      setTeams(TeamArray)
    }
  }, [activeDebate, roomMembers])


  return (

    <div className="DebateScreenBoxWrapper">
      {
        (activeDebate && activeParticipants) ?

          <>
            <div className='box_wrappers'>
              <div className='screen_box_header'>

                <h4 className='team_name teamOne'>{teams[0]?.name}</h4>

              </div>
              <div className="left_team">
                {
                  isLive ?    teams[0] &&    teams[0]?.members?.length > 0 ? teams[0]?.members?.map((mem) => (

                    <DebatorView activeSpeakers={activeSpeakers} debator={mem} key={mem.id} />

                  ))  :  <NoneJoined team={teams[0]} /> :""
                }
                {
               !isLive &&
                 <NotStartedView team={activeDebate?.teams[0]?.members} />
                }

              </div>
            </div>
            <div className='box_wrappers pink_wrapper'>

              <div className='screen_box_header'>
                <div className='team_name teamTwo'> {teams[1]?.name}</div>
              </div>
              <div className="right_team">
                {
                  isLive ? teams[1]   &&     teams[1]?.members?.length > 0 ? teams[1]?.members?.map((member) => (
                    <DebatorView pink={true} activeSpeakers={activeSpeakers} debator={member} key={member._id} />
                  )) : <NoneJoined team={teams[1]} />  :""
                }
                {
                  !isLive && <NotStartedView pink={true} team={activeDebate?.teams[1]?.members} />
                }
              </div>
            </div>
          </>

          :
          <DebateScreenSkeleton/>
      }





    </div>
  )
}

export default DebateScreenBox

    // activeDebate? activeDebate.participants.map((debator, index) => (
          //   <DebatorView isSpeaking={(index === 0 || index === 1) ? true : false} key={debator._id} debator={debator} />
          // )) : <p>loading..</p>