import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from 'axios';

interface UserProfile {
    email: string;
    password: string;
    name: string;
    surname: string;
    role: string;
    examsTaken: string[]; // Array of Exam IDs (string format)
    progress: string[]; // Array of ProgressEntry IDs (string format)
    teachingClasses: string[]; // Array of Class IDs (string format)
    assignedClasses: string[]; // Array of Class IDs (string format)
    dateJoined: string; // Date in string format
    _id: string;
}

export const useProfile = () => {
  const { user } = useAuthContext(); 
  const [profile, setProfile] = useState<UserProfile | null>(null);
  //console.log('user1:', user) // ok
  //console.log('context:', useAuthContext()) // ok

  useEffect(() => {
    const fetchProfile = async () => {
      //console.log('user2:', user) // ok
      if (user) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile/${user._id}`);
          setProfile(response.data);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setProfile(null);
        }
      }
    };

    fetchProfile();
  }, [user]);
  //console.log('profile1:', profile) // ok

  return { profile };
};