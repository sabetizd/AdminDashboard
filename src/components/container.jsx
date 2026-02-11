import { useEffect, useState } from 'react'
import SideBar from './sideBar'
import TopBar from './TopbarMobile'
import Users from './users'

export default function Container() {
  const [largeScreen,setlargScreen] = useState(()=> !window.matchMedia("(max-width : 1024px)").matches)

  useEffect(()=>{
    const mobile = window.matchMedia("(max-width : 1024px)");
    const listener = mobile.addEventListener("change",()=>{
      
      if(!mobile.matches){
        setlargScreen(true);
      }
      else{
        setlargScreen(false);

      }
      
    })  

    return ()=> {mobile.removeEventListener("change",listener)}
    
  },)

  


  return (
    <div className=''>

         {largeScreen ? (
          <div className='flex'>
            <SideBar/>
            <Users/>
          </div>
        ) : (
          <div className='flex flex-col'>
            <TopBar/>
            <Users />
          </div>
        ) } 

        

    </div>
  )
}
