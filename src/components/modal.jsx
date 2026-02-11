import React, { useState, useRef, useEffect } from "react";
import { DynamicIcon } from "lucide-react/dynamic";

export default function Modal({open,setOpen,user,newUser,setNew,deleteUser}) {
  
  const [showAnim, setShow] = useState(false); // controls animation
  const firstInputRef = useRef(null);

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  let oldName = user.name;
  let oldEmail = user.email;
  

  // handle focus and delayed mount animation
  useEffect(() => {
    if (open) {
      setShow(true);
      
      if(firstInputRef.current!=null)
            firstInputRef.current.focus();
    }
    if(user){

    }   
    else{
        setName(user.name)
        setEmail(user.email)
        
    }
  }, [open]);

  useEffect(()=>{  
    
    if(user){ // only set users value in edit mode
        setName(user.name)        
        setEmail(user.email)
    }   
  },[])


  const handleClose = () => {
        // start fade-out
        setShow(false);
        
        // unmount after animation ends (duration matches transition)
        setTimeout(() => setOpen(false), 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(newUser)
        addUser()  
    else
         Modify()
    
  };

  const addUser = () =>{
    let data = {
             name,
             email,             // *the field number is not same as here , but aboves are same as fields in database(ES6 feature)
             ip:'192.168.1.0',
             status:'offline'
         }
        fetch("https://vyrmpllinanjpmwqnlny.supabase.co/rest/v1/users",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                    "apikey":"sb_publishable_ubZT3HHb72nKkrY3KArg4Q_zg3N5itd"
                },
            body:JSON.stringify(data)     
         }) 
         .then((res)=>{
             return res;
         })
         .then(res=>{
             if(res.ok) {
                handleClose();                 
             }    
         }).catch(err => console.error("error:", err))

  }

  const Modify = () =>{

        let modifieduser = {
            name,
            email
        }

        fetch(`https://vyrmpllinanjpmwqnlny.supabase.co/rest/v1/users?id=eq.${user.id}`,{
            method:"PATCH",
            headers:{
                "Content-Type": "application/json",
                "apikey":"sb_publishable_ubZT3HHb72nKkrY3KArg4Q_zg3N5itd"            },
            body:JSON.stringify(modifieduser)
        }).then(async (res)=>{
            return await res;
        }).then(async res=>{
            if(await res.ok){
                handleClose()
            }
        })
  }

   const Delete = () =>{

        let modifieduser = {
            name,
            email
        }

        fetch(`https://vyrmpllinanjpmwqnlny.supabase.co/rest/v1/users?id=eq.${user.id}`,{
            method:"DELETE",
            headers:{
                "Content-Type": "application/json",
                "apikey":"sb_publishable_ubZT3HHb72nKkrY3KArg4Q_zg3N5itd"            },

        }).then((res)=>{
            return res;
        }).then(res=>{
            if(res.ok){
                handleClose()
            }
        })
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-500"
      >
        Open form
      </button> */}

      {open && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
            showAnim ? "opacity-100" : "opacity-0"
          }`}
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleClose}
          ></div>

          {/* Modal panel */}
          <div
            className={`relative z-10 w-full max-w-md bg-white rounded-xl shadow-xl ring-1 ring-black/5 overflow-hidden transform transition-all duration-300 ease-out ${
              showAnim ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <header className="px-6 py-4 border-b">
              <h2 className="text-lg font-Inter">
                {newUser && "Add User" || deleteUser && <p className="text-center">Are You Sure !?</p> ||  "Modify User" }
              </h2>
            </header>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {deleteUser ? (
                 <div className="flex justify-center gap-3 pt-2 ">
                    <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 cursor-pointer py-2 text-[15px] rounded-md bg-gray-200 hover:bg-gray-300"
                    >
                    No, Cancel
                    </button>
                    <button
                    type="submit"
                    className="px-4 cursor-pointer py-2 text-[15px] rounded-md bg-red-600 text-white hover:bg-red-500"
                    onClick={Delete}
                    >
                    Yes, Delete
                    </button>
                </div>
              ) : 
              (  
                <>
                <div className="relative w-full border flex rounded-md focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-400">
                    <label
                    htmlFor="first"
                    className="absolute -top-3 left-3 bg-white px-0.5 text-[13px] font-medium text-gray-700"
                    >
                    Name
                    </label>
                    <div className="flex items-center px-1.5">
                    <DynamicIcon name="user-round" className="text-gray-700" size={22} />
                    </div>
                    <input
                    ref={firstInputRef}
                    id="first"
                    name="first"
                    type="text"
                    defaultValue={newUser ? "" : (oldName)}
                    onChange={(e)=> setName(e.target.value.trim())}
                    className="w-full py-2 pl-2 rounded-md focus:outline-none"
                    />
                </div>

            
                <div className="relative w-full border flex rounded-md focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-400">
                    <label
                    htmlFor="email"
                    className="absolute -top-3 left-3 bg-white px-0.5 text-[13px] font-medium text-gray-700"
                    >
                    Email
                    </label>
                    <div className="flex items-center px-1.5">
                    <DynamicIcon name="mail" className="text-gray-700" size={22} />
                    </div>
                    <input
                    id="email"
                    name="email"
                    type="text"
                    defaultValue={newUser ?  "" : (oldEmail)}
                    onChange={(e)=> setEmail(e.target.value.trim())}
                    className="w-full py-2 pl-2 rounded-md focus:outline-none"
                    />
                </div>
                
                {newUser && ( <div className="relative w-full border flex rounded-md focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-400">
                    <label
                    htmlFor="email"
                    className="absolute -top-3 left-3 bg-white px-0.5 text-[13px] font-medium text-gray-700"
                    >
                    Password
                    </label>
                    <div className="flex items-center px-1.5">
                    <DynamicIcon name="lock" className="text-gray-700" size={22} />
                    </div>
                    <input
                    id="email"
                    name="email"
                    type="text"
                    onChange={(e)=> setPassword(e.target.value.trim())}
                    className="w-full py-2 pl-2 rounded-md focus:outline-none"
                    />
                </div>
                )}

                
                <div className="flex justify-end gap-3 pt-2">
                    <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                    >
                    Cancel
                    </button>
                    <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500"
                    >
                    {newUser ? "Add" : "Modify"}
                    </button>
                </div>

                </>
              )}
           
            
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
