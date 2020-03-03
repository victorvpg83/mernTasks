import axiosClient from './axiosConfig'

const authToken = token =>{
   token? axiosClient.defaults.headers.common['x-auth-token']= token : delete axiosClient.defaults.headers.common['x-auth-token']
}

export default authToken