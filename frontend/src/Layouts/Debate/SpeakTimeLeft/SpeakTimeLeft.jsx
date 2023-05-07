import "./speakTimeLeft.css"
import {RiTimerFlashFill} from "react-icons/ri"
import {TiGroup} from "react-icons/ti"
const SpeakTimeLeft = ({debateState,countDown ,startTeam}) => {

  
  return (
         <>
         {
   <div className='speak_time_left_box' >
      <div className="speak_time_info">
        <div className="speak_time_debate_state">
          {
         debateState?.isPaused ? "Paused" :   debateState?.isStarted ? "Ongoing":
         debateState?.hasFinished ? "Completed":"Not Started"  
          }
        </div>
        <table>
          <thead style={{display:"none"}}>
            <th>hell</th>
            <th>loo</th>
          </thead>

      <tbody>
            {
              (!debateState?.isStarted && !debateState?.hasFinished) &&      <tr className="speakTime_item">
              <td className="speakTime_title">
              <TiGroup/>
              <p className="speak_time_key">Debate Start Team </p>
              </td> 
              <td className="speak_time_value">{startTeam}</td>
            </tr>
            }
      {

(debateState?.isStarted || debateState?.isPaused) &&    <tr className="speakTime_item">
            <td className="speakTime_title">
            <TiGroup/>
            <p className="speak_time_key">Speech Team </p>
            </td> 
            <td className="speak_time_value">{debateState?.speakTeam}</td>
          </tr>
        } 
          {

          (debateState?.isStarted || debateState?.isPaused) &&  <tr className="speakTime_item" >
            <td className="speakTime_title">

            <RiTimerFlashFill/>
            <p className="speak_time_key">Time Left  </p>
            </td>
            
            <td className="speak_time_value">{countDown?.min} min &nbsp; {countDown?.sec} sec</td>
          </tr>
          }
      </tbody>
        </table>
          {/* <h1>
            {`Speech Time left ${countDown?.min !==null ? `${countDown?.min} min : ${countDown?.sec} sec`:""} for   ${debateState?.speakTeam} team`}
          </h1> */}
          </div>
    </div>
        
      }
        </>
  )
}

export default SpeakTimeLeft