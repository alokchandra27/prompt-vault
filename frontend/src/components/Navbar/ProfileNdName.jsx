import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../api/AxiosConfig';

const ProfileNdName = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ FIX

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await API.get("/api/auth/me", { withCredentials: true });
        setUser(response.data.user || response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchUserProfile();
  }, []); // ✅ FIX

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 mt-8 animate-pulse">
        <div className="flex flex-col gap-2 items-center justify-center mb-5">
         <div className="rounded-full bg-gray-300 h-24 w-24"></div>
          <div className="flex flex-col items-center justify-center gap-2 mt-2">
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
            <div className="h-3 w-48 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="flex flex-col items-center justify-center gap-5 mt-8 cursor-pointer"
      onClick={() => navigate("/profile")}
    >   
      <div className="flex flex-col gap-2 items-center justify-center mb-5">
        <img 
          className="object-cover rounded-full bg-gray-100 h-24 w-24"  
          src={user?.profileImage || "https://i.pinimg.com/736x/23/57/24/235724d60503e6429c4a621f35a42fbe.jpg"} 
          alt="Profile" 
        />
        <div className="flex flex-col items-center justify-center">
          <h2 className='uppercase font-bold text-sm text-gray-500'>
            {user?.name || "No Name Found"}
          </h2>
          <p className="font-light text-xs text-gray-500">
            {user?.username || "No Username Found"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfileNdName;