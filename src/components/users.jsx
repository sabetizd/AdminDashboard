import{ useEffect, useState } from 'react'
import {DynamicIcon} from 'lucide-react/dynamic'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import Modal from './modal';


export default function Users() {

  const [users,setUsers] = useState(); // where we hold users in mounting after edit and add.

  const [openModal,setOpenModal] = useState(false); // handel the modal showing for edit or add user

  // should modal opens for add or edit ?
  const [newUser,setNewUser] = useState(false); 
  const [deleteUser,setDeleteUser] = useState(false); 

  // where we hold choosen user to edit
  const [editUser,setEditUser] = useState("");



  function getUsers(){
  
    fetch("https://vyrmpllinanjpmwqnlny.supabase.co/rest/v1/users",{
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                    "apikey":"sb_publishable_ubZT3HHb72nKkrY3KArg4Q_zg3N5itd"
                },
            }).then(res=>{
                return res.json();
            }).then(data=>{

              setUsers(data)
              return data
          })
     
  }

  function AddUserHandle(){

     setOpenModal(true);
     setNewUser(true)
     setDeleteUser(false)
  }

  // editing user handle
  function EditUserHandler(user){
    setDeleteUser(false)
    setNewUser(false)
    setOpenModal(true)


    setEditUser(user)
  }

  function DeleteUserHandler(user){
    setOpenModal(true);
    
    setNewUser(false)
    setDeleteUser(true);
    setEditUser(user)
  }


    // get users when modal gets close or open
    useEffect(()=>{
     
          fetch("https://vyrmpllinanjpmwqnlny.supabase.co/rest/v1/users",{
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                    "apikey":"sb_publishable_ubZT3HHb72nKkrY3KArg4Q_zg3N5itd"
                },
            }).then(res=>{

                return res.json();
            }).then(data=>{

                //sorting based on id (copy)
                const sorted = [...data].sort((a,b)=>{
                    return a.id - b.id
                })

                setUsers(sorted);
                setLoading(true)
              })
              
    },[openModal])

  const [searchQuery,setSearchQuery] = useState();
  const [searchedUsers,setSearchedUsers] = useState([])
  const [notFound,setNotFound] = useState(false);
  const [isLoad,setLoading] = useState(false);
  const isDark = document.documentElement.classList.contains("dark");

  let usersArrTemp = [] ;
  
  function SearchUsersInfo(value){
   
    
    if(value.toLowerCase().startsWith(searchQuery.toLowerCase()))  //exact match from query start search
    {              
      return true;                                                       
    }
    else if(value.includes(searchQuery.toLowerCase())){ // values includes the query search
      
      return true;
    }

    return false;
  }

  function SearchUsersIP(value){
    const ipRegex = /^(?:\d{1,3}\.){3}\d{1,3}$/;

    if(value.match(ipRegex) && (value.includes(searchQuery) || value.startsWith(searchQuery))  ){
      return true;
    }

    return false;
  }

  function fakeLoading(){
    setLoading(false);
    setTimeout(()=>{     
      setLoading(true)
    },500)
  }

  useEffect(()=>{
   
    
    if(searchQuery){
    fakeLoading()
      
      usersArrTemp = [];

      users.forEach(user => {

        const {id,...rest} = user
        const noIdUser =  Object.values(rest); // extracting objects values only
        
        noIdUser.forEach(value=>{

          if(!usersArrTemp.some(obj=>obj.id == user.id)){ //avoiding duplicates(may name and email start with same letter)    
              if(SearchUsersInfo(value,user)){  
                usersArrTemp.push(user);                                                      
              }
              else if(SearchUsersIP(value)){     
                  usersArrTemp.push(user);                                                     
              }   
          }
         
        })

      });
      
      setSearchedUsers(usersArrTemp);
      setNotFound(false)

     
    }
    if(searchQuery && usersArrTemp.length==0 ){
      setNotFound(true);    
    }
    else if(searchQuery==""){
      setSearchedUsers([]);
      setNotFound(false)
    }
    
      
  },[searchQuery])




  const styles = {
    tableHeader : `pl-3 py-3 text-[15px] bg-neutral-200 border-b border-gray-400 text-gray-500 tracking-wider font-extralight
    max-md:text-sm
    dark:bg-dark5 dark:text-gray-400`,

    tableDetails : `pl-3 py-3 text-sm font-inter text-gray-700 whitespace-nowrap
    max-md:text-center max-md:text-xs
    dark:text-gray-400`,

    tableRows : `even:bg-gray-100 odd:bg-white
    dark:even:bg-dark5 dark:odd:bg-dark6`,

    editBtn :`inline-flex justify-center items-center gap-0.5 text-indigo-600 hover:text-indigo-900 cursor-pointer
    dark:text-indigo-500 dark:hover:text-indigo-700`,
    deleteBtn : `inline-flex justify-center items-center gap-0.5 text-red-500 hover:text-red-700 cursor-pointer
    dark:hover:text-red-600 `,

    offBadge : `inline-flex px-1.5 py-0.5 text-red-500 items-center gap-1 bg-red-200 rounded-md
    dark:bg-red-100`,
    onBadge: `inline-flex px-1.5 py-0.5 text-green-700 items-center gap-1 bg-green-200 rounded-md
    dark:green-100`,

    baseColSkel:`dark:bg-dark1`,
    highColSkel :`bg-dark2`
  }
  
  return (
    <>
    { openModal && (<Modal open={openModal} setOpen={setOpenModal} user={editUser} newUser={newUser} setNew={setNewUser} deleteUser={deleteUser} />) }
    <div className='w-full font-inter bg-[#fbfbfb]
    dark:bg-dark3'>
    
         <div className='max-w-7xl mt-20 mx-auto flex flex-col justify-center '>
            <div className='text-[30px] px-4 mb-5 font-inter tracking-tight dark:text-white
            max-sm:text-[20px]'>
              User Management        
            </div>

            <div className='px-6 py-2 font-inter grid grid-cols-2 
            max-md:grid-cols-1 max-md:gap-1.5 '>
              <div className=''>
                <div className='w-[230px] border-1 py-0.5 border-gray-300 flex justify-center items-center text-left rounded-md
                max-sm:w-auto
                focus-within:ring-1 focus-within:ring-sky-500  focus-within:border-sky-500'>
                  <DynamicIcon className='inline text-gray-800 
                  dark:text-dark4' size={16} name='search'/>
                  <input className='rounded-md placeholder:text-xs w-8/10 ml-1.5 focus:border-none focus:outline-none text-sm
                  dark:placeholder:text-gray-100 dark:text-gray-100'
                   type="search" name="search" id="search" placeholder='search user...' 
                  onChange={(e)=>setSearchQuery(e.target.value)}/>
                </div>
              </div>
              <div className=' text-right'>
                <button className='bg-sky-300 px-3 py-1 rounded-md text-sm text-gray-700 inline-flex items-center justify-center gap-2
                border-1 border-sky-500 cursor-pointer active:bg-sky-400
                max-sm:text-[12px]'
                onClick={()=>AddUserHandle()}> 
                  <DynamicIcon className='text-sky-800' size={15} name='plus'/>New User</button>
              </div>         
            </div>

            {/* Table area */}
            <div className='size-full  px-3 mt-3 overflow-hidden '>
             <div className={`rounded-md overflow-x-auto mb-7 drop-shadow-md
              ${notFound ? "dark:border-gray-900" : "border-none"}`}>
                 <table className='min-w-full'>      
                  <thead className='text-left max-md:text-center'>
                    <tr className=''>
                      <th className={styles.tableHeader}>USER NAME</th>
                      <th className={styles.tableHeader}>EMAIL</th>
                      <th className={styles.tableHeader}>IP</th>
                      <th className={styles.tableHeader}>STATUS</th>          
                      <th className={`${styles.tableHeader} relative`}>
                          <span className='sr-only'></span>
                      </th>

                    </tr>
                  </thead>
                   {!isLoad ? 
                   (
                     <tbody className='divide-y divide-gray-100'>
                         <tr>                     
                          <td colSpan={5} className='py-2'>
                             <SkeletonTheme  duration={0.7} 
                              baseColor={isDark ? "#1B1A55" : ""} 
                              highlightColor={isDark ? "#9290C3" : ""}>
                               <Skeleton className='my-2' width={"100%"} height={"50px"}/>
                               <Skeleton className='my-2' width={"100%"} height={"50px"}/>
                               <Skeleton className='my-2' width={"100%"} height={"50px"}/>
                             </SkeletonTheme>
                          </td>                   
                      </tr>
                     </tbody>
                     
                   ) 
                   : 
                   ( notFound ? (
                     <tbody className='divide-y divide-gray-100'>
                      <tr className='text-center '>
                          <td colSpan={4} className='py-3 text-xl text-gray-600
                          dark:text-white'>user not found !</td>
                      </tr>
                     </tbody>
                  ) : (
                    <tbody className='divide-y divide-gray-100 
                    dark:divide-none'>                 
                    {searchedUsers.length!=0 ? (
                      searchedUsers.map(user=>(
                           <tr key={user.id} className={styles.tableRows}>
                              <td className={`${styles.tableDetails} text-black! dark:text-gray-100!`}>{user.name}</td>
                              <td  className={styles.tableDetails}>{user.email}</td>
                              <td className={styles.tableDetails}>{user.ip}</td>
                              <td className={styles.tableDetails}>
                                {user.status == "offline" ? (
                                  <span className={styles.offBadge}>
                                      <DynamicIcon className='size-1.5 fill-red-500'  strokeWidth={0} name='circle'/>
                                      {user.status}
                                  </span>
                                ) : (
                                  <span className={styles.onBadge}>
                                      <DynamicIcon className='size-1.5 fill-green-500' strokeWidth={0} name='circle'/>
                                      {user.status}
                                  </span>
                                )}
                              </td>
                              <td className={`${styles.tableDetails} flex gap-2`}>
                                <a className={styles.editBtn}>                        
                                  <DynamicIcon className='inline' size={16} name='square-pen'/>Edit
                                </a>

                                <a className={styles.deleteBtn}>                           
                                  <DynamicIcon className='inline' size={16} name='trash-2'/>Delete
                                </a>
                              </td>
                          </tr>   
                      ))
                    ) : ( users &&
                        users.map(user=>(
                          <tr key={user.id} className={`${styles.tableRows} `}>
                              <td className={`${styles.tableDetails} text-black! dark:text-gray-100!`}>{user.name}</td>
                              <td className={styles.tableDetails}>{user.email}</td>
                              <td className={styles.tableDetails}>{user.ip}</td>
                              <td className={styles.tableDetails}>
                                {user.status == "offline" ? (
                                  <span className={styles.offBadge}>
                                      <DynamicIcon className='size-1.5 fill-red-500'  strokeWidth={0} name='circle'/>
                                      {user.status}
                                  </span>
                                ) : (
                                  <span className={styles.onBadge}>
                                      <DynamicIcon className='size-1.5 fill-green-500' strokeWidth={0} name='circle'/>
                                      {user.status}
                                  </span>
                                )}
                              </td>
                              <td className={`${styles.tableDetails} flex gap-5 pr-2 justify-center
                              max-md:gap-2`}>
                                <a className={styles.editBtn}
                                onClick={()=>EditUserHandler(user)}>                       
                                  <DynamicIcon className='inline' size={16} name='square-pen'/>Edit
                                </a>

                                <a className={styles.deleteBtn}
                                onClick={()=>DeleteUserHandler(user)}>                
                                  <DynamicIcon className='inline' size={16} name='trash-2'/>Delete
                                </a>
                              </td>
                          </tr>   
                       ))  
                    )}                           
                  </tbody>
                  ))}
                 
                  
              </table>
             </div>
            </div>
         </div>
    </div>
    </>
  )
}
