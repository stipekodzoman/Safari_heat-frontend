import { Outlet, useRoutes } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Safari from '../pages/Safari';
import {AuthContext} from '../context/AuthContext.jsx'
import { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../config/config.tsx';


// Routes
const LandingRoute = {
  path: '/',
  element: <LandingPage />,
};

const CommonRoutes = {
  path: '/',
  element: <Outlet />,
  children: [
    {
      path: 'safari',
      children: [
        {
          path: '',
          element: <Safari />,
        },
      ],
    },
  ],
};

 const ThemeRoutes=()=> {
  const [isValid,setIsValid]=useState(false)
  const {user, accessToken} = useContext(AuthContext)
  const verify=async()=>{
    try{
      const res=await fetch(`${BASE_URL}/auth/verify?username=${user}&token=${accessToken}`,{
        method:'post',
        headers:{
          "content-type":"application/json",
        },
      })
      const {success}=await res.json()
      setIsValid(success)
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
      verify()
  },[user,accessToken])
  return isValid?useRoutes([LandingRoute, CommonRoutes]):useRoutes([LandingRoute])
}
export default ThemeRoutes;