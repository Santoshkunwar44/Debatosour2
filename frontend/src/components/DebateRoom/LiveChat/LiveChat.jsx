import { useEffect, useRef, useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import MessageInput from '../../ChatBox/MessageInput/MessageInput'
import MessageText from '../../ChatBox/MessageText'
import "./LiveChat.css"
import { createChatApi, findChatApi } from '../../../utils/Api';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {IoChatbubblesSharp} from "react-icons/io5"
import { actionCreators } from '../../../redux/store';
const LiveChat = () => {

  const dispatch = useDispatch()
  const [messageArr,setMessageArr] =useState([])
  const {data} = useSelector(state=>state.user)
  const {activeDebate} =useSelector(state=>state.debate)
  const {setMessageArrAction} =bindActionCreators(actionCreators,dispatch )
  
  const {rtmChannel} = useSelector(state=>state.other);

  const inputRef = useRef()
  const scrollRef = useRef()

  useEffect(()=>{
    if(!activeDebate?.current)return ;
    handleGetAllChats()
  },[activeDebate?.current])

  const handleGetAllChats = async()=>{
    const {_id} = activeDebate?.current
    try {
        const res = await findChatApi(_id);
        if(res.status===200){
          const {message} = res.data 
          setMessageArr(message)
        }else{
          throw Error(res.data?.message)
        }
    } catch (error) {
      console.log(error)
    }

  }
  const handleSendMessage=async(msgText,cb)=>{

    const newChat ={
      owner:data?._id,
      debate:activeDebate?.current?._id,
      text:msgText
    }
      try {

          const res = await createChatApi(newChat );
          const {message} = res?.data
          if(res.status===200){
            setMessageArr(prev=>([
              ...prev,message
            ]))
             await sendRtmChannelMessage(message)
             cb()
          }else{
            throw Error(message)
          }
      } catch (error) {
          console.log(error)
      }

  }

  useEffect(()=>{
    scrollRef.current.scrollTo(0,scrollRef.current.scrollHeight);
    // scrollRef.current?.scrollIntoView()
  },[messageArr])
  useEffect(()=>{
    setMessageArrAction(setMessageArr);
  },[])

  const sendRtmChannelMessage=async(data)=>{
    console.log("sending",rtmChannel)
    data.type="live_chat"
    if(rtmChannel?.current){
      await rtmChannel.current.sendMessage({ text: JSON.stringify(data) })
  }
  }

  return (
    <div className='LiveChatWrapper' >
      <div className="live_chat_header">
      <IoChatbubblesSharp/>
        <h2>LIVE CHATS</h2>
      </div>
      <div  ref={scrollRef} className='live_chat_message_list'>
      {
        messageArr &&
      messageArr.map((message)=>(
        <div  key={message?._id  }>

        <MessageText    message={message}  own={message?.owner?._id === data?._id}/>
        </div>
      ))
 
      }
      </div>
      <MessageInput  inputRef={inputRef} isLiveChat={true}  handleSendMessage={handleSendMessage}/>
    </div>
  )
}

export default LiveChat