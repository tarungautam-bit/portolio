import { axiosInstance } from "../../../config/axiosInstance";
export const getHomeDataApi = async()=>{
    try{
        let res = await axiosInstance.get('/home.php');

        return(res.data);
        
    }catch(e){
        console.log(e);
    }
}