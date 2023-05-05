import "./speakTimeLeft.css"

const SpeakTimeLeft = ({debateState,countDown}) => {
  return (
    debateState?.isStarted && <>
    <div className='speak_time_left_box' >

          <h1>
            {`Speak Time left ${countDown.min !==null ? `${countDown.min} min : ${countDown.sec} sec`:""} for  team ${debateState.speakTeam}`}
          </h1>
    </div>
        
        </>
  )
}

export default SpeakTimeLeft