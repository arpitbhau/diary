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
          setmemories(response.data);
          return 'Memories loaded successfully!';
        },
        error: 'Failed to load memories',
      }
    );
  }, []);



  return (
    <>
      <div className="main text-white gap-8 px-10 py-10 flex flex-wrap items-start justify-start w-full min-h-screen relative">
      {memories ? (
        memories.map((memory) => (
          
          <div onClick={() => navigate(`/memory/${memory.id}`)} key={memory.id} className="memory cursor-pointer hover:scale-[1.1] transition-all relative w-[23vw] h-[26vh] rounded-2xl p-5 bg-black/30 shadow-lg">
            <div className="date text-2xl font-bold tracking-tighter">{new Date(memory.created_at).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          }
          )
          }</div>
            <div className="content mt-4 text-lg tracking-tight">{memory.content}</div>
          </div>
        ))
      ) : (
        <p>No Memories Found.</p>
      )}
    </div>


    
    
    </>
  );
}

export default Memories;
