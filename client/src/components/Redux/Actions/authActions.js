import axios from "axios";

export const signin=(formData,history)=>async(dispatch)=>{
    try {
        const res=await axios.post('/user/signin',formData);
        dispatch({type:"AUTH",payload:{result:res.data.result,token:res.data.token}});
        history.push("/");
    } catch (error) {
        console.log(error)
    }
}
export const signup=(formData,history)=>async(dispatch)=>{
    try {
        const res=await axios.post('/user/signup',formData);
        dispatch({type:"AUTH",payload:{result:res.data.result,token:res.data.token}});
        history.push("/");
    } catch (error) {
        console.log(error)
    }
}