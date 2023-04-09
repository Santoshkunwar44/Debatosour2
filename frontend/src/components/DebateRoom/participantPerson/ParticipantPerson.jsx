import "./ParticipationPerson.css"

const ParticipantPerson = ({ person }) => {
  return (
    <div className='ParticipantsPersonWrapper'>
      <img className='participation_person_img' src={person.avatar} alt='userImg' />
      <p>
        {person.firstName}
      </p>
    </div>
  )
}

export default ParticipantPerson