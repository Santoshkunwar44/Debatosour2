import "./NotStartedView.css"
const NotStartedView = ({ team, pink }) => {
    return (
        <div className={`NotStartedViewWrapper  ${pink && "pink"}`}>

            {

                team?.map((mem) => (

                    <div className='team_member'>

                        <img src={mem?.avatar} referrerPolicy="no-referrer" alt="dino" />
                        <p>{mem.firstName} {mem.lastName}</p>
                    </div>
                ))
            }


        </div>
    )
}

export default NotStartedView