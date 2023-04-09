import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { format } from "timeago.js"
import DebateTeam from '../Team/DebateTeam'
import moment from 'moment'
import "./DebateInfo.css"
import { useNavigate } from 'react-router-dom'
import { useSyncExternalStore } from 'react'


const DebateInfo = () => {
    const { activeDebate } = useSelector((state) => state.debate)

    const [isLive, setIsLive] = useSyncExternalStore(null)
    const [debateInfoState, setDebateInfoState] = useState({
        timeCountDown: {
            hour: "",
            minute: "",
            second: "",
        },
        duration: {
            hour: "",
            minute: ""
        }
    })
    const navigate = useNavigate()

    useEffect(() => {
        let intervalId;
        if (isLive) {
            intervalId = setInterval(handleTimeLeftCountDown, 1000)
        }
        return () => {

            clearInterval(intervalId)
        }
    }, [activeDebate, isLive])

    useEffect(() => {
        if (!activeDebate) return




        let now = new Date().getTime()
        console.log(activeDebate.duration)

        let hour = Math.floor(activeDebate.duration / (1000 * 60 * 60))
        // let    minute = Math.floor((activeDebate.duration  / (1000 * 60)) )
        let minute = Math.floor((activeDebate.duration % (1000 * 60)) / 1000);

        setDebateInfoState(prev => ({
            ...prev, duration: {
                hour: hour.toString(),
                minute: minute.toString()
            }
        }))
        if (now > activeDebate.startTime) {
            setIsLive(true)

        } else {
            setIsLive(false)
        }

    }, [activeDebate])


    const handleTimeLeftCountDown = () => {


        if (!activeDebate) return;

        let now = new Date().getTime()
        let remaining = 0;
        if (true) {
            remaining = activeDebate.endTime - now;
        }
        if (remaining <= 0) {
            navigate("/live_debates ")
        }
        let hour = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString();
        let minute = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60)).toString();
        let second = Math.floor((remaining % (1000 * 60)) / 1000).toString();
        setDebateInfoState(prev => ({
            ...prev, timeCountDown: {
                hour,
                minute,
                second
            }
        }))
    }



    return (
        <div className='DebateInfoWrapper'>
            <div className="debate_info_header">
                <h1>{activeDebate?.topic}</h1>
                <div className='time_started_ago'>
                    {
                        !isLive ? `Start Time :  ${activeDebate?.startTime ? moment(activeDebate.startTime).format('LLL') : ""}` : `Started  ${activeDebate?.startTime ? format(activeDebate.startTime) : ""} `
                    }
                </div>
            </div>
            <div className='debate_more_info'>
                <div className="details_info_left">

                    <div className='info_key_list'>


                        <div className="info_key">
                            <p>Debate Type </p>
                            <p>British Parliamentary</p>
                        </div>
                        <div className="info_key">
                            <p>No of participants </p>
                            <p>{activeDebate?.participantsCount}</p>
                        </div>
                        <div className="info_key">
                            <p>No of Rounds </p>
                            <p>{activeDebate?.noOfRounds}</p>
                        </div>
                        <div className="info_key">
                            <p>Debate Duration </p>
                            <p>{`${debateInfoState.duration.hour?.toString().padStart(2, "0")} : ${debateInfoState.duration.minute?.toString().padStart(2, "0")} `}</p>
                        </div>



                    </div>

                </div>
                <div className="debate_info_right">
                    {/* <div className="admin_box_wrapper">
            <p className=''>Debate Admin </p>
            <div className='admin_box'>

            <img src={activeDebate?.admin?.avatar} referrerPolicy="no-referrer" width="20px" alt="" />
            <div className='admin_details_info'>   

            <p className='admin_username'>{activeDebate?.admin?.firstName} {activeDebate?.admin?.lastName}</p>
            <p className='admin_email'>{activeDebate?.admin?.email}</p>
            </div>
            </div>
            </div> */}
                    {/* <p className='admin_team_name'>Team Redbull</p> */}
                    <div className='duration_left_box'>
                        <p className='remaining_text'>  {isLive == null ? "" : isLive ? "Remaining Time" : ""}  </p>
                        {

                            isLive ? <h1 className='remaining_time_count'>{`  ${debateInfoState.timeCountDown.hour ? debateInfoState.timeCountDown.hour.toString().padStart(2, "0") : ""}:${debateInfoState.timeCountDown.minute ? debateInfoState.timeCountDown.minute.toString().padStart(2, "0") : ""}:${debateInfoState.timeCountDown.second ? debateInfoState.timeCountDown.second.toString().padStart(2, "0") : ""}`}</h1> : ""
                        }
                    </div>
                </div>
            </div>
            <div className='debates_team_box'>
                {
                    activeDebate?.teams.map((team, index) => (
                        <DebateTeam isLive={isLive} team={team} index={index} />
                    ))
                }



            </div>
        </div>
    )
}

export default DebateInfo