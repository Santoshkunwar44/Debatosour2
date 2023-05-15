import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom"
import { bindActionCreators } from "redux";
import Signup from "./pages/Auth/Signup/Signup";
import ChatBot from "./pages/chatbot/ChatBot";
import DebateRoom from "./pages/debateRoom/DebateRoom";
import Home from "./pages/home/Home";
import { actionCreators } from "./redux/store";
import { useEffect } from "react"
import { getLoggedInUserApi } from "./utils/Api";
import Login from "./pages/Auth/Login/Login";
import { Loader } from "./Layouts/Loader/Loader";
import CurrentDebates from "./pages/CurrentDebates/CurrentDebates";
import CreateDebate from "./pages/CreateDebate/CreateDebate";
import "./App.css"
import Profile from "./pages/profile/Profile";
import  Watchnow from "./pages/WatchNow/Watchnow";
import  Subscription from "./pages/Subscription/Subscription";

function App() {
  const { data } = useSelector((state) => state.user)
  const { isLoading, refresh } = useSelector((state) => state.other)
  const { roomLoading} = useSelector((state) => state.debate);


  const dispatch = useDispatch()

  const { AddLoggedInUser, setIsLoading } = bindActionCreators(actionCreators, dispatch)

  useEffect(() => {
    fetchCurrentUser()
  }, [refresh])

  const fetchCurrentUser = async () => {
    setIsLoading(true)
    try {
      const res = await getLoggedInUserApi()
      if (res.status === 200) {
        AddLoggedInUser(res.data.message)

        setIsLoading(false)
      } else {
        throw Error("You are not logged In")
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error?.message)
    }

  }
  console.log(data)



  return (
    <>
      <div className="App">


        {
          isLoading ? <Loader /> :""
        }
        {
          roomLoading ? <Loader/> :""
        }
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/live_debates" element={<CurrentDebates />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/create" element={<CreateDebate />} />
          <Route path="/profile/:profileId" element={!data ? <Navigate to={"/login"} /> : <Profile />} />
          <Route path="/login" element={data ? <Navigate to={"/"} /> : <Login />} />
          <Route path="/signup" element={data ? <Navigate to={"/"} /> : <Signup />} />
          <Route path="/debate_room/:debateId" element={<DebateRoom />} />
          <Route path="/watch" element={<Watchnow />} />
          <Route path="/subscription" element={<Subscription />} />

        </Routes>
      </div>

    </>
  );
}

export default App;
