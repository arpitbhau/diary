// Jai Shree Ram

import React, { useEffect, useState } from "react";
import { useSupabase } from "../../context/SupabaseContext";
import toast from "react-hot-toast";
import { useParams } from "react-router";

function ExpandedMemory() {

  // changing title
  document.title = `Memory | Diary.`


  const supabase = useSupabase();

  const { id } = useParams();

  const [memory, setmemory] = useState();

  // fecthing
  useEffect(() => {
    const fetchData = async () => {
      await supabase
        .from("diary_entries")
        .select("*")
        .eq("id", id) // Make sure you're filtering by the correct user_id
        .single()
        .then((data) => {
          setmemory(data.data); // Set the fetched data to state
        });
    };

    // Start the fetching process and show toast loading state
    toast.promise(fetchData(), {
      loading: "Fetching memory...",
      success: "Memory fetched successfully",
      error: "Error fetching memory",
    });
  }, []);

  return (
    <div className="main text-white px-10 py-8 w-full min-h-screen relative">
      {memory && (
        <div className="memory relative w-full min-h-[100vh] rounded-2xl p-5 bg-black/30 shadow-lg">
          <div className="date text-4xl font-bold tracking-tighter">
            {new Date(memory.created_at).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}
          </div>
          <div className="content mt-4 text-xl tracking-tight">
            {memory.content}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpandedMemory;
