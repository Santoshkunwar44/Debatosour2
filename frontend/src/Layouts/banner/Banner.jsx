import { MdOutlineAdd, MdModelTraining } from "react-icons/md";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import {useState ,useEffect} from "react";
import {useNavigate} from "react-router-dom"
import { useToast } from '@chakra-ui/react';
import "./Banner.css";
import { getLoggedInUserData } from "../../utils/services";
const Banner = () => {

 const [debateLink, setdebateLink] = useState("")
 const [ validLink,setValidLink] =useState(false  )
 const navigate = useNavigate()
 const toast = useToast()
 const currentUser = getLoggedInUserData();
  useEffect(() => {

   let id =   debateLink?.split("?")[1]?.split("=")[1]
  if(id){
    setValidLink(true)
  }else{
    setValidLink(false)
  }

  }, [debateLink])
  

const handleWatch =()=>{
if(!validLink){
  toast({
    title:"",
    description: "Invalid Debate Link",
    status: 'error',
    duration: 5000,
    position: "top",
    isClosable: true,
  })
  return ;
}
  if(debateLink){
   let debateId = debateLink.split("=")[1]
    navigate(`/watch?debateId=${debateId}`)
  }
}
  return (
    <div className="BannerWrapper">
      <div className="banner_bg_image">

        <img className="cartoon_speech" src="/images/cartoon_speech.png" alt="dinasourImg" />
 
        {/* <img className="hello_dinasour" src="/images/dinasour_hello.png" alt="debateImage" /> */}


      </div>
      <div className="banner_content" >
        <p className="top_site_info">Virtual Debate platform</p>
        <h1 className="main_text_banner">Online platform to organize</h1>
        <div className="bottom_text">
          <h1 className="main_text_banner">
            a virtual debate for all <img className="quodium" src="/images/qodium.png" alt="quodium" />      </h1>
          <p className="secondary_main_banner_text">Debatasour lets a users to create a online debate and manages the audience  to watch the debate & provide  feedback to the debators. </p>

        </div>
      </div>
      <div className="banne_bottom_option_box">


      {currentUser?.subStatus && <Link to={"/create"}>
          <button className="banner_bottom_button_option_button">
            <MdOutlineAdd />
            <p>
              Create Debate
            </p>
          </button>
        </Link>}

        <Link to="/chatbot">
          <button className="prepare_for_debate_btn">
            <MdModelTraining />
            <p>
              Prepare For Debate
            </p>
          </button>
        </Link>


      </div>
      <div className="debate_link_box">

        <input type="text" value={debateLink} onChange={(e)=>setdebateLink(e.target.value)} placeholder="Enter or paste link of debate"  />

          <button onClick={handleWatch} className={`watch_button ${!validLink && "disable_watch_button_banner" }`}>  <HiOutlineViewfinderCircle className="watch_icon" /> WATCH</button>


      </div>
    </div>
  )
}

export default Banner