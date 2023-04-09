import { axiosInstance } from "./axios";



export const RegisterUserApi = (data) => axiosInstance.post("/auth/register", data)
export const LoginUserApi = (data) => axiosInstance.post("/auth/login", data)
export const getLoggedInUserApi = () => axiosInstance.get("/user/getLoggedInUser")
export const logoutApi = () => axiosInstance.post("/auth/logout");
export const searchUserByNames = (username) => axiosInstance.get(`/user/search?search_query=${username}`)




// DEBATE API ENDPOINTS

export const createDebateApi = (data) => axiosInstance.post("/debate", data)
export const getDebateByIdApi = (debateId) => axiosInstance.get(`/debate?_id=${debateId}`)
export const getCurrentDebateApi = () => axiosInstance.get(`/debate?live=${true}`)
export const getAllDebateApi = () => axiosInstance.get(`/debate?upcoming=${true}`)

export const getAgoraTokenApi = ({ channelName, role, tokentype, uid, expiry }) => axiosInstance.get(`/auth/rte/${channelName}/${role}/${tokentype}/${uid}/?expiry=${expiry}`)
