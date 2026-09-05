import { axiosInstance } from "../../../config/axiosInstance";
export const getProjectDataApi = async()=>{
    try{
        let res = await axiosInstance.get('/projects.php');

        return(res.data);
        
    }catch(e){
        console.log(e);
    }
}