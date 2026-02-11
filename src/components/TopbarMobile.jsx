import { useEffect, useRef, useState } from 'react'
import { DynamicIcon } from 'lucide-react/dynamic'

export default function TopBar() {
    const [menu,setMenu] = useState(false);
    const [selelcted,setSelected] = useState(1);
    const [lightTheme,setLightTheme] = useState(() => {
                                        if (typeof localStorage !== "undefined") {
                                            const theme = localStorage.getItem("theme")
                                            if (theme === "dark") return false
                                            if (theme === "light") return true
                                        }
                                        return true // fallback if nothing stored, optional
                                        })

    
    const menuRef = useRef(null);
    useEffect(()=>{
        if(!menu) return;

        else{

            function handleClickOutside(event){

                if(menuRef.current && !menuRef.current.contains(event.target))                  
                   setMenu(false);                      
                
            }

            document.addEventListener("touchstart",handleClickOutside);
            document.addEventListener("mousedown",handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
                document.removeEventListener("touchstart", handleClickOutside);
            };
        }
      

    },[menu])

    const handleTheme = () => {
        setLightTheme((prev)=> {                        
            return !prev;    
        });  

        
    } 



    useEffect(() => {

            if (lightTheme) {
                document.documentElement.classList.remove('dark')
                
            } else {
                document.documentElement.classList.add('dark')
            }
            
            if(typeof localStorage != "undefined"){
                if(lightTheme)
                    localStorage.setItem("theme","light")
                else
                    localStorage.setItem("theme","dark")
                
            }
  
     }, [lightTheme])

  

    useEffect(()=>{
        const delay = setTimeout(() => {
            setMenu(false)
        }, 200);

     
        return ()=> clearTimeout(delay);
    },[selelcted])



    return (
    <>
            <div className='w-full sticky h-[50px] shadow-md 
            dark:bg-dark1'>
                <div className='grid grid-cols-2 h-full'>
                    <section className='justify-self-start flex items-center pl-3'>
                        <img className='size-8' src="/assets/react.svg" alt="react logo" />
                    </section>
                    <section className='flex items-center justify-self-end pr-3 gap-2' >
                        <DynamicIcon className='p-2 box-content hover:bg-gray-200 rounded-md 
                        dark:hover:bg-dark3 dark:text-white' size={17} strokeWidth={1.5} name={`${lightTheme ? "moon-star" : "sun"}`}
                       onClick={handleTheme}/>
                        <DynamicIcon name='menu' className='p-2 rounded-md cursor-pointer bg-gray-200 box-content
                         dark:bg-dark3 dark:text-white' size={17} onClick={()=>setMenu(true)}/>
                    </section>
                </div>
            </div>

            {/* The toggle menu */}
            {<div className={`absolute w-full bottom-0 backdrop-blur-sm z-20
                ${menu ? "h-lvh" : "h-[0px] "} 
              `}>
                <div ref={menuRef} className={`absolute w-full bottom-0 transition-[height] duration-200 ease-linear rounded-t-xl bg-gray-50 overflow-hidden border-t border-gray-200
                 ${menu ? "h-[85svh] " : "h-0"}
                 dark:bg-dark1 dark:border-none`}>
                   <div className='mt-4 px-2'>
                        <ul className={` mt-5 text-sm`}>

                             <li className={`py-2 px-1 tracking-tight rounded-md 
                             ${selelcted==1 ? "bg-gray-200 text-black dark:text-white dark:bg-dark4" : "text-gray-500 dark:text-gray-300"}
                             `}
                             onClick={()=>setSelected(1)}>
                                 <a href={()=> this.preventDefault()} className='size-full flex items-center gap-1'>
                                    <DynamicIcon  name='users' size={20} strokeWidth={`${selelcted==1 ? 2 : 1.75}`}/>
                                
                                    <p>
                                        Users
                                    </p>
                                </a>
                            </li>

                            <li className={`py-2 px-1 tracking-tight rounded-md 
                            ${selelcted==2 ? "bg-gray-200 text-black dark:text-white dark:bg-dark4" : "text-gray-500 dark:text-gray-300"}`}
                            onClick={()=>setSelected(2)}>
                                 <a href={()=> this.preventDefault()} className='size-full flex items-center gap-1'>
                                    <DynamicIcon  name='layout-dashboard' size={20} strokeWidth={`${selelcted==2 ? 2 : 1.75}`}/>
                                
                                    <p>
                                        Dashborad
                                    </p>
                                </a>
                            </li>

                        </ul>
                   </div>
                </div>
            </div>}

    </>
    )
}
