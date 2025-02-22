// Jai Shree Ram

import React, { useEffect, useState } from 'react'
import "./Home.css"
import {  toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useSupabase } from '../../context/SupabaseContext';


function Home() {

  const supabase = useSupabase()
  const [user, setUser] = useState(null)

  // change the title
  document.title = 'Home | Diary.'

  const navigate = useNavigate()

  const storeContent = async () => {
    let dateForMySake = document.querySelector(".sheet p").innerHTML
    const content = document.querySelector('.sheet').innerText.replace(dateForMySake , "")
    try {
      const { data, error } = await supabase
        .from('diary_entries')
        .insert([
          { 
            content: content,
            user_id: user.id,
            created_at: new Date() , 
            taarik: dateForMySake
          }
        ]);

      if (error) throw error;
      
      toast.success('memory saved successfully!');
      document.querySelector('.sheet').innerText = getCurrentDateTime(); // Clear content except datetime
    } catch (error) {
      console.error('Error saving memory:', error.message);
      toast.error('Failed to save memory');
    }
  }

  const checkUser = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        throw error
      }

      if (session) {
        setUser(session.user)
        toast.success(`Welcome back!`)
      } else {
        setUser(null)
        navigate("/login")
      }
    } catch (error) {
      console.error('Error checking session:', error.message)
      toast.error('Error checking authentication status')
      navigate("/login")
    }
  }

  useEffect(() => {
    checkUser()
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    async function logout() {
      
        const { error } = await supabase.auth.signOut()
    
    }

    toast.promise(
      logout(),
       {
         loading: 'Logging Out...',
         success: <b>Logged Out!</b>,
         error: <b>Error Logging out.</b>,
       }
     ).then(()=> {
      navigate("/login")
     })
  }

  const getCurrentDateTime = () => {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yy = String(now.getFullYear()).slice(-2);
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    return `${dd} - ${mm} - ${yy} ${hh} - ${min}`;
  };

  return (
    <div className="relative w-full">
      <div 
        className="sheet textarea outline-none bg-[url('/img/notebook.svg')] bg-repeat-y w-full min-w-[680px] self-center justify-self-center text-xl leading-[30px] min-h-screen px-[100px] pr-5 font-['trap'] break-words"
        role="textbox" 
        spellCheck="false" 
        contentEditable="true"
      >
        <p>{getCurrentDateTime()}</p>
      </div>
      <div onClick={() => storeContent()} className="submit cursor-pointer hover:scale-[1.1] transition-all p-3 absolute shadow-xl bottom-5 left-4 w-14 h-14 rounded-full bg-[#6dff3c]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000"><path d="M11.602 13.7599L13.014 15.1719L21.4795 6.7063L22.8938 8.12051L13.014 18.0003L6.65 11.6363L8.06421 10.2221L10.189 12.3469L11.6025 13.7594L11.602 13.7599ZM11.6037 10.9322L16.5563 5.97949L17.9666 7.38977L13.014 12.3424L11.6037 10.9322ZM8.77698 16.5873L7.36396 18.0003L1 11.6363L2.41421 10.2221L3.82723 11.6352L3.82604 11.6363L8.77698 16.5873Z"></path></svg>
      </div>
      <div onClick={() => handleLogout()} className="logout hover:scale-[1.1] transition-all cursor-pointer p-3 absolute shadow-xl bottom-5 right-4 w-14 h-14 rounded-full bg-[#fb3b3b]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.2713 2 18.1757 3.57078 20.0002 5.99923L17.2909 5.99931C15.8807 4.75499 14.0285 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.029 20 15.8816 19.2446 17.2919 17.9998L20.0009 17.9998C18.1765 20.4288 15.2717 22 12 22ZM19 16V13H11V11H19V8L24 12L19 16Z"></path></svg>
      </div>
      <div onClick={() => navigate("/memories")} className="memoriesLink hover:scale-[1.1] transition-all cursor-pointer p-3 absolute shadow-xl top-5 right-4 w-14 h-14 rounded-full bg-[#4fece1]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff"><path d="M12 2C15.866 2 19 5.13401 19 9C19 9.11351 18.9973 9.22639 18.992 9.33857C21.3265 10.16 23 12.3846 23 15C23 18.3137 20.3137 21 17 21H7C3.68629 21 1 18.3137 1 15C1 12.3846 2.67346 10.16 5.00804 9.33857C5.0027 9.22639 5 9.11351 5 9C5 5.13401 8.13401 2 12 2ZM12 4C9.23858 4 7 6.23858 7 9C7 9.08147 7.00193 9.16263 7.00578 9.24344L7.07662 10.7309L5.67183 11.2252C4.0844 11.7837 3 13.2889 3 15C3 17.2091 4.79086 19 7 19H17C19.2091 19 21 17.2091 21 15C21 12.79 19.21 11 17 11C15.233 11 13.7337 12.1457 13.2042 13.7347L11.3064 13.1021C12.1005 10.7185 14.35 9 17 9C17 6.23858 14.7614 4 12 4Z"></path></svg>
      </div>
    </div>
  )
}

export default Home