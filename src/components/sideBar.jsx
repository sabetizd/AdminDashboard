import { useEffect, useRef, useState } from 'react'
import {DynamicIcon} from 'lucide-react/dynamic'

export default function SideBar() {
  const [sliderSetting,setSliderSetting] = useState(2);
  const [sliderMenu,setSliderMenu] = useState(false);
  const [lightTheme,setLightTheme] =  useState(() => {
                                          if (typeof localStorage !== "undefined") {
                                              const theme = localStorage.getItem("theme")
                                              if (theme === "dark") return false
                                              if (theme === "light") return true
                                          }
                                          return true // fallback if nothing stored, optional
                                          })

  const handelSliderMenu = () => setSliderMenu((prev) => !prev)

  const handelSliderOption = (settingId) =>{
    setSliderSetting(settingId);
    setTimeout(()=>{
        setSliderMenu(false);
    },100)
    
  }


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
         //console.log("lcaolstorage :",localStorage.getItem("theme"));
  
     }, [lightTheme])


  
  const sliderRef = useRef(null);
  useEffect(() => {
    if (!sliderMenu) return; // 4a - only attach when open

    function handleClickOutside(event) {                // 5
      // 6 - if click/tap target is outside the element referenced by sliderRef
      if (sliderRef.current && !sliderRef.current.contains(event.target)) {
        setSliderMenu(false);
      }
    }

    // 7 - listen for mouse and touch (mobile)
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    // 8 - cleanup: remove listeners when menu closes OR component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [sliderMenu]);


  const styles = {

    behindContainer: `w-[55px] h-lvh overflow-visible z-0 forced-colors:scheme-dark
      ${sliderSetting == 1 ? "w-[200px] flex-none" : ""}
      dark:bg-dark1`,
    innerContainer : `h-screen bg-white border-r border-gray-200 shadow-md px-2 box-border group fixed 
      transition-[width] duration-100 ease-linear grid grid-cols-1
      ${sliderSetting == 1 ? "w-[200px]" : "hover:w-[200px] w-[55px]"} 
      dark:bg-dark1 dark:border-none`,


    optionsContainer : `mt-2 cursor-pointer px-2 py-1.5 rounded-md group/container hover:bg-gray-200 overflow-hidden
                        group-hover:w-full justify-self-start
                        dark:hover:bg-dark3 dark:hover:text-white `,

    optionsIcon : `size-5.5  text-gray-500 group-hover/container:text-gray-950 shrink-0 
    dark:group-hover/container:text-white dark:text-gray-300`,

    optionTitle : `text-[14px] tracking-tight text-gray-500 group-hover/container:text-gray-950 
    ${sliderSetting === 3 ? "opacity-0 group-hover:opacity-100 transition-opacity duration-100 whitespace-nowrap" : ""}
    dark:group-hover/container:text-white dark:text-gray-300`,

    optionTitleCollapse : "absolute left-16 text-[14px] tracking-tight text-gray-500",


    //sideBar Control

    siderBarTitle : `text-[12px] px-4 py-2 border-b border-gray-300 inlien-flex text-gray-500
    dark:text-white`,
    sideOptionsContainer : `mx-1 my-1 py-0.5 flex flex-row hover:bg-gray-100 rounded-xs
    dark:text-white dark:hover:bg-dark4`,

    
}



  return (
    <div className={styles.behindContainer}> {/* is used to help adjust center the right panel of page */}

      <div className={styles.innerContainer}>
        <div className=' size-full overflow-y-scroll scrollbar-hidden'>

              <div className='mt-4 mb-4 h-10 cursor-pointer flex justify-center'>
                  <img className='size-9' src="/assets/react.svg" alt="react svg" />
              </div>

              <div className={styles.optionsContainer}>
                    <a href="" className='size-full flex gap-2'>
                      <DynamicIcon className={styles.optionsIcon} name='layout-dashboard' strokeWidth={1.75}/>

                      <p className={styles.optionTitle}>
                          Dashboard
                      </p>
                    </a>
              </div>
  
              <div className={styles.optionsContainer}>
                  <a href="" className='size-full flex gap-2'>
                      <DynamicIcon className={styles.optionsIcon} name="users" strokeWidth={1.75} />

                      <p className={styles.optionTitle}>
                          Users
                      </p>
                  </a>
              </div>

              

          </div>

          {/* SideBar control */}
          <div className='self-end justify-self-end w-full flex flex-col justify-start'>

                   {/* Theme control btn */}
                  <div className='h-10 cursor-pointer'> 
                      <DynamicIcon className='size-5 p-2 box-content hover:bg-gray-200 rounded-md
                      dark:hover:bg-dark3 dark:text-white' strokeWidth={1.5} name={`${lightTheme ? "moon-star" : "sun"}`}
                       onClick={handleTheme}/>
                  </div>

                  {/* SideBar control btn */}
                  <div className='h-10 cursor-pointer relative '>              
        
                      <DynamicIcon className='size-5 p-2 box-content hover:bg-gray-200 rounded-md
                      dark:hover:bg-dark3 dark:text-white' strokeWidth={1} name='panel-left-dashed'
                      onClick={handelSliderMenu}/>

                   


                      {/* Options */}
                      <div ref={sliderRef} className={`absolute w-[150px] bg-white shadow-sm bottom-11 rounded-md flex-col ${sliderMenu ? "flex" : "hidden"}
                      dark:bg-dark3 `}>

                          <div className={styles.siderBarTitle}>Sidebar Control</div>
                          
                          <div className={styles.sideOptionsContainer}
                          onClick={()=>handelSliderOption(1)}>
                              <div className='flex justify-center items-center px-2 '>
                                  <DynamicIcon name='circle' color='none' fill={`${lightTheme ? "gray" : "black"}`} className={`inline ${sliderSetting == 1 ? "opacity-100" : "opacity-0"}
                                  `} size={8}/>
                              </div>
                              <div className='text-xs px-2 py-1'>Expanded</div>
                          </div>


                          <div className={styles.sideOptionsContainer}
                          onClick={()=>handelSliderOption(2)}>
                              <div className='flex justify-center items-center px-2'>
                                  <DynamicIcon name='circle' color='none' fill={`${lightTheme ? "gray" : "black"}`} className={`inline ${sliderSetting == 2 ? "opacity-100" : "opacity-0"}`} size={8}/>
                              </div>
                              <div className='text-xs px-2 py-1'>Expand on Hover</div>
                          </div>

                      </div>

                  </div>
          </div>

      </div>

    </div>
  )


  
}

