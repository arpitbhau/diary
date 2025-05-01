// Jai Shree Ram

import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import { useSupabase } from '../../context/SupabaseContext';


function Login() {

  const supabase = useSupabase()


  //change title
  document.title = "Login | Diary."




  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      

      if (data.session && data.user) {
        toast.success("Logged in successfully!" , {
          style: {
            background: '#000',
            color: '#fff'
          }
        })
        navigate('/');
      }
      

      else if (error) {
        toast.error(error.message , {
          style: {
            background: '#000' ,
            color: '#fff'
          }
        });

      };


    } catch (error) {
      toast.error("Some error occured!")
    } finally {
      setLoading(false);
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="w-screen flex justify-center items-center min-h-screen bg-[#111]">
      <div className="bg-[#0f0f0f] w-1/3 p-10">
        <h2 className="text-3xl mb-6 text-center text-white font-semibold glow-text">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-white">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border-2 border-transparent rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ease-in-out glow-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-white">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border-2 border-transparent rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ease-in-out glow-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md hover:from-indigo-600 hover:to-purple-600 disabled:bg-indigo-400 transition-all duration-200 ease-in-out glow-button"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
