import React, { useEffect, useState } from 'react';
import Navbar from '../../Layouts/Navbar/Navbar';
import ProfileCard from '../../components/profile/ProfileCard/ProfileCard';
import "./Profile.css";
import MyDebateBox from './myDebateBox/MyDebateBox';
import { useParams } from 'react-router-dom';
import { searchUserByIdApi } from '../../utils/Api';
import { useSelector } from 'react-redux';
const Profile = () => {

    const { profileId } = useParams()
    const { data } = useSelector((state) => state.user)
    const [nextUserProfile, setNextUserProfile] = useState(null)

    useEffect(() => {
        if (!profileId || !data) return;
        fetchNextUserProfile()
    }, [profileId, data])

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
                <div className='profile_container_my_debate'>
                    <div className='profile_container_my_debate_heading'>
                        <h2 className='main_text'>{profileId === data?._id ? "MY" : nextUserProfile?.firstName?.toUpperCase()}  <h2 className='secondary_main_text'>DEBATES</h2></h2>
                        <div className='_profile_information_text'>
                            <p> <b>Note :</b> The Debate  which is already ended are deleted from our database.So it is not shown anymore. </p>
                        </div>
                    </div>
                    <MyDebateBox />
                </div>


            </div>

        </div>
    )
}

export default Profile