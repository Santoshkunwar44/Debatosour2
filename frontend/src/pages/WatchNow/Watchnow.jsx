import React  ,{useEffect,useState} from 'react';
import {  useSearchParams } from "react-router-dom";
import {getSingleDebateApi } from "../../utils/Api"
import Navbar from "../../Layouts/Navbar/Navbar";
import {format} from "timeago.js";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux"
import moment from "moment"
import { MdOutlineViewInAr } from "react-icons/md"
import { AiOutlineUsergroupAdd } from "react-icons/ai"
import "./WatchNow.css";


const Watchnow = () => {
  const  [searchParams, setSearchParams] = useSearchParams();
  const [ debateData,setDebateData ] = useState(null) 
  const {data} =useSelector((state)=>state.user);
  const [ linkError,setLinkError] =useState(false)
  const [isLive,setIsLive] = useState(null)
  const [ isParticipant,setIsParticipant] =useState(false)

const debateId = searchParams.get("debateId");


  useEffect(() => {
    
    if(!debateId)return;
    fetchDebate();

  }, [debateId])
  useEffect(()=>{
    let now = new Date().getTime();
    if (now < debateData?.startTime) {
      setIsLive(false)
    } else {
      setIsLive(true  )
    }
  },[debateData])

  useEffect(()=>{
    
    if(!debateData)return;
    if(!data){
      return setIsParticipant(false)
    }
    let isParticipant = debateData?.teams.some(team => team.members.some(member => member._id === data?._id))
    setIsParticipant(isParticipant)
  },[data,debateData])


      const fetchDebate=async()=>{
  try {
    
    const res = await getSingleDebateApi(debateId);
    console.log("res",res.data)
    if(res.status === 200){
      if(Boolean(res.data.message?.isEnded)){
        setIsLive(false)
      }else{
        setDebateData(res.data.message?.debate)
        setIsLive(true)
      }
    }else if(res.status === 401){
      setLinkError(true)
    }


  } catch (error) {
    console.log(error.response?.status,"sf")
    if(error.response?.status === 401){
      setLinkError(true)
      console.log("inside ",error)
    }
  }
}
console.log(linkError)


    
  return (
<>
<Navbar/>

    
      <div className={"watchNow_container"}>
        <div className="watchNow_main_box">
          {
          linkError ? <h1>INVALID LINK</h1> :  (debateData && !linkError) ? <div className="watchNow_box">
              <div className="top_box">
<h1 className="watchNow_box_debate_topic">{debateData.topic}</h1>
<div className="watch_box_joined_participants_box">
  {

   debateData?.joinedParticipants?.length > 0 &&  <p className="watch_box_joined_participants_text">Joined participants</p>
  }
  <div className="joined_participants_list">
    {
      debateData ?   debateData.joinedParticipants.length >0 ? debateData.joinedParticipants.map((user)=>(
    <div  className="joined_participants" key={user?._id}>


      <img src={user.avatar} alt="participant_profile_img" />
      <p>{user.firstName}</p>

      </div>

      )) : isLive && <p className="watch_now_no_one_text">No one is in the room 🚫</p> : "loading"
    }
    {
     linkError ?  <h1>INVALID LINK</h1> :""
    }

  
    </div>

  </div>
  <div className="watch_now_time_box">
{
  isLive ?
  <>
    <p className="watch_box_started_time">Started {format(debateData.startTime)}</p> 
  <p className="watch_box_ending_time">Ends with {moment(debateData.endTime).fromNow()}</p>
  </>
  :<>
    <p className="watch_box_started_time">Starts at {moment(debateData.startTime).format("LLL")}</p>
    <p className="watch_box_ending_time">Ends at {moment(debateData.endTime).format("LLL")}</p>
  </>
}


</div>
</div>
<div>
  <div  className="watchNow_button_wrapper">
    {
        isLive ?
    <>
       <Link to={`/debate_room/${debateId}?audience=${true}`}>
    <button> <MdOutlineViewInAr /> <p>Watch </p>  </button>
    </Link>
  <Link     className={`    "watchNow_participateLink"  ${!isParticipant && "disable_participateBtn"}` } to={`/debate_room/${debateId}`}>
      <button disabled={!isParticipant}  className="watch_now_participate_button">
        <AiOutlineUsergroupAdd/> <p>Participate</p>
      </button>
      </Link>
  
    </>
    : <button className="disable_participateBtn">
  💢  DEBATE IS NOT STARTED YET 
    </button>
  }
    </div>
    
  </div>
            </div>:"loading"
          }
        </div>
        <div className={"watchNow_basic_instructions"}>
          Inorder to participate you must be loggedIn first and be the particpant of the debate.
        </div>

    </div>
</>
  )
}

export default Watchnow