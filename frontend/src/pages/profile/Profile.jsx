import React, { useEffect, useState } from 'react';
import Navbar from '../../Layouts/Navbar/Navbar';
import ProfileCard from '../../components/profile/ProfileCard/ProfileCard';
import "./Profile.css";
// import MyDebateBox from './myDebateBox/MyDebateBox';
import MyDebates from './MyDebates/MyDebates';
import { useParams } from 'react-router-dom';
import { getFutureDebatesOfCurrentUserApi, getInvitationDebatesOfCurrentUserApi, getPastDebatesOfCurrentUserApi, searchUserByIdApi } from '../../utils/Api';
import { useSelector } from 'react-redux';

const Profile = () => {

    const { profileId } = useParams()
    const { data } = useSelector((state) => state.user)
    const [nextUserProfile, setNextUserProfile] = useState(null)
    const [pastDebates, setPastDebates] = useState([]);
    const [futureDebates, setFutureDebates] = useState([]);
    const [invitationDebates, setInvitationDebates] = useState([]);

    useEffect(() => {
        if (!profileId || !data) return;
        fetchNextUserProfile()
    }, [profileId, data])

    const fetchPastDebates = async () => {
        if(!data?._id) return;
        const res = await getPastDebatesOfCurrentUserApi({userId: data?._id, future: false});
        if (res.status !== 200) throw Error(res.data.message);
        setPastDebates(res.data.message)
    }
    
    const fetchFutureDebates = async () => {
        if(!data?._id) return;
        const res = await getFutureDebatesOfCurrentUserApi({userId: data?._id, future: true});
        if (res.status !== 200) throw Error(res.data.message);
        setFutureDebates(res.data.message)
    }

    const fetchInvitationDebates = async () => {
        if(!data?._id) return;
        const res = await getInvitationDebatesOfCurrentUserApi({userId: data?._id, invitation: true});
        if (res.status !== 200) throw Error(res.data.message);
        setInvitationDebates(res.data.message)
    }

    useEffect(() => {
        fetchPastDebates();
        fetchFutureDebates();
        fetchInvitationDebates();
    },[])

    const fetchNextUserProfile = async () => {

        if (profileId === data?._id) {
            setNextUserProfile(data);
            return;
        }

        try {
            const res = await searchUserByIdApi(profileId)
            if (res.status === 200) {
                setNextUserProfile(res.data.message[0])
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='profile_wrapper'>

            <Navbar />
            <div className='profile_container'>

                {
                    nextUserProfile && <ProfileCard userData={nextUserProfile} />
                }
                {/* <div className='profile_container_my_debate'>
                    <div className='profile_container_my_debate_heading'>
                        <h2 className='main_text'>{profileId === data?._id ? "MY" : nextUserProfile?.firstName?.toUpperCase()}  <h2 className='secondary_main_text'>DEBATES</h2></h2>
                        <div className='_profile_information_text'>
                            <p> <b>Note :</b> The Debate  which is already ended are deleted from our database.So it is not shown anymore. </p>
                        </div>
                    </div>
                    <MyDebateBox own={profileId === data?._id } />
                </div> */}
                {/* <div>
                {
                    profileId ===data?._id &&   <h2 className='main_text'> DEBATES IN WHICH I AM  INVITED   </h2>
                }
                </div> */}

                <MyDebates 
                    pastDebates={pastDebates}
                    futureDebates={futureDebates}
                    invitationDebates={invitationDebates} 
                />

            </div>

        </div>
    )
}

export default Profile