import axios from "axios";
import { useEffect } from "react";

const axiosSecure=axios.create({
    baseURL:"http://localhost:5000"
});

const useAxiosSecure=()=>
{
    useEffect(()=>
    {
        const reqInterceptor=axios.interceptors.request.use(config=> 
            {
    // Do something before request is sent
    return config;
  })
  const resInterceptor=axios.interceptors.response.use((response)=>
  {
    return response;

  }, (error)=>
  {
        const statusCode = error.status;
        if(statusCode === 401 || statusCode === 403)
        {
            // logOutUser()
    //          .then(()=>
    // {
    //   navigate("/")

    // })
        }
        return Promise.reject(error);
  });

      return ()=> {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
    },[])
    return axiosSecure;
}
export default useAxiosSecure;