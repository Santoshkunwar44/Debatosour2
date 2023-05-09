import { useSelector } from 'react-redux'
import DebatorView from '../DebatorView/DebatorView'
import "./DebateScreenBox.css"
import { useEffect, useState, useRef } from 'react';
import NotStartedView from '../DebatorView/NotStartedView/NotStartedView';
import NoneJoined from '../NoneJoined/NoneJoined';
import DebateScreenSkeleton from "../../Skeleton/DebateScreenBox/DebateScreenSkeleton"
import { TbMicrophone2 } from "react-icons/tb"
import SpeakTimeLeft from '../SpeakTimeLeft/SpeakTimeLeft';

const DebateScreenBox = ({ timeRemainingRef, roomMembers, startTeam, handleCloseDebate, activeSpeakers, isLive, debateState, activeMicControlTeam, handleFinishSpeakTime }) => {
  const { activeDebate, activeParticipants } = useSelector((state) => state.debate);
  const intervalArrRef = useRef([])
  const [teams, setTeams] = useState([]);

  const [countDown, setCountDown] = useState({
    min: null,
    sec: null

  });
  const intervalRef = useRef()

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

  useEffect(() => {
    if (!debateState ) return;
    const { hasFinished, isStarted, isPaused } = debateState;
    if(!isStarted || hasFinished)return;

    if (   intervalArrRef.current.length < 1 && !isPaused) {
      handleTimeLeft()
    } else if (isPaused  ) {
      handlePausedTimeLeft()

    } else if (hasFinished) {
      handleCloseDebate()
    }
  }, [debateState, intervalArrRef])

  const handleTimeLeft = () => {
    const { remainingTime  , changedAt} = debateState;

    intervalRef.current = setInterval(() => {
      const end = changedAt+remainingTime;
      const diff = end - Date.now();

      if (diff >= 0) {
         timeRemainingRef.current = diff;
        let min = Math.floor(diff / (1000 * 60));
        let sec = Math.floor((diff / 1000) % 60);

        setCountDown({
          min,
          sec
        })
      } else {
        setCountDown({
          min: 0,
          sec: 0,
        })
        timeRemainingRef.current = 0;
        clearInterval(intervalRef.current)
        intervalArrRef.current = []
        handleFinishSpeakTime()
        // end this round and pass mic to next team and update the channel
      }
    }, 1000);

    intervalArrRef.current = [intervalRef.current]
  }

  const handlePausedTimeLeft = () => {
    const { remainingTime } = debateState;

      let min = Math.floor(remainingTime / (1000 * 60));
      let sec = Math.floor((remainingTime / 1000) % 60);
      setCountDown({
        min,
        sec
      })
    } 



  return (
    <>

      <SpeakTimeLeft
        startTeam={startTeam}
        debateState={debateState} countDown={countDown} />
      <div className="DebateScreenBoxWrapper">

        {
          (activeDebate && activeParticipants) ?

            <>
              <div className='box_wrappers'>
                <div className='screen_box_header'>

                  <h4 className='team_name teamOne'>{teams[0]?.name}</h4>
                  {
                    ((isLive && activeMicControlTeam?.name === teams[0]?.name) || (activeMicControlTeam === "both" && isLive)) && <div className="mic_control_wrapper">
                      <TbMicrophone2 className={"team_mic_icon"} /></div>
                  }

                </div>
                <div className="left_team">
                  {
                    isLive ? teams[0] && teams[0]?.members?.length > 0 ? teams[0]?.members?.map((mem) => (

                      <DebatorView activeSpeakers={activeSpeakers} debator={mem} key={mem.id} />

                    )) : <NoneJoined team={teams[0]} /> : ""
                  }
                  {
                    !isLive &&
                    <NotStartedView team={activeDebate?.teams[0]?.members} />
                  }

                </div>
              </div>
              <div className='box_wrappers pink_wrapper'>

                <div className='screen_box_header'>
                  {
                    ((isLive && activeMicControlTeam?.name === teams[1]?.name) || (activeMicControlTeam === "both" && isLive)) &&
                    <div className="mic_control_wrapper"> <TbMicrophone2 className={"team_mic_icon"} />
                    </div>
                  }
                  <div className='team_name teamTwo'> {teams[1]?.name}</div>
                </div>
                <div className="right_team">
                  {
                    isLive ? teams[1] && teams[1]?.members?.length > 0 ? teams[1]?.members?.map((member) => (
                      <DebatorView pink={true} activeSpeakers={activeSpeakers} debator={member} key={member._id} />
                    )) : <NoneJoined team={teams[1]} /> : ""
                  }
                  {
                    !isLive && <NotStartedView pink={true} team={activeDebate?.teams[1]?.members} />
                  }
                </div>
              </div>
            </>

            :
            <DebateScreenSkeleton />
        }





      </div>
    </>
  )
}

export default DebateScreenBox