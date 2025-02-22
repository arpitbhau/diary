// Jai Shree Ram

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSupabase } from "../../context/SupabaseContext";

function Memories() {
  // change the title
  document.title = "Memories | Diary.";

  const [memories, setmemories] = useState()


  const supabase = useSupabase();
  const navigate = useNavigate();

  const [user, setUser] = useState(null)

  const checkUser = async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        throw error;
      }

      if (session) {
        setUser(session.user);
        toast.success(`Welcome back!`);
      } else {
        setUser(null);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error checking session:", error.message);
      toast.error("Error checking authentication status");
      navigate("/login");
    }
  };

  useEffect(() => {
    checkUser();

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);


  // Fetching the memories
  useEffect(() => {
    const fetchMemories = async () => {
      return await supabase
        .from("diary_entries")
        .select("*")
        .order('created_at', { ascending: false });
    };

    toast.promise(
      fetchMemories(),
      {
        loading: 'Loading memories...',
        success: (response) => {
            let unpurifiedData = response.data;
            let purifiedData = [];
            
            unpurifiedData.forEach((data) => {
              // Replace \n with <br> and join all content together
              const contentWithBreaks = data.content.split('\n').join('<br>');
              
              purifiedData.push({
                id: data.id,
                content: contentWithBreaks,
                taarik: data.taarik,
                created_at: data.created_at,
                user_id: data.user_id
            });
          

            })
          setmemories(purifiedData)
          return 'Memories loaded successfully!';
        },
        error: 'Failed to load memories',
      }
    );
  }, []);



  return (
    <>
      <div className="main text-white w-full min-h-screen relative">
       
       <div className="p-10 gap-8 flex flex-wrap items-start justify-start relative">
         
       {memories ? (
          memories.map((memory) => {
            // Get first 30 words
            const words = memory.content.split('<br>').slice(0, 10).join(' ') + '...';
            
            return (
              <div onClick={() => navigate(`/memory/${memory.id}`)} key={memory.id} className="memory cursor-pointer hover:scale-[1.1] transition-all relative w-[23vw] h-[26vh] rounded-2xl p-5 bg-black/30 shadow-lg">
                <div className="date text-2xl font-bold tracking-tighter">{new Date(memory.created_at).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              }
              )
              }</div>
                <div className="content mt-4 text-lg tracking-tight" dangerouslySetInnerHTML={{ __html: words }}></div>
              </div>
            );
          })
        ) : (
          <p>No Memories Found.</p>
        )}

       </div>

      </div> 
        
        <div className="px-8 py-6">

        <div className="seacrh hidden flex justify-between absolute top-5 w-[90%] text-2xl h-[5vh] bg-white/30 rounded-xl">
          <input className="w-full h-full border-none outline-none bg-[transparent] text-white placeholder:text-white px-5" placeholder="Search" type="text" />
          <div className="absolute flex justify-end -right-[8%] items-center pr-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center">
              <span>Search</span>
            </button>
          </div>
        </div>

        </div>
    </>
  );
}

export default Memories;
