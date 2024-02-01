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
}


export const useProfile = () => {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  console.log(user)

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          // Replace 'YOUR_BACKEND_URL' with the actual URL of your backend route.
          const response = await axios.get(`http://localhost:5000/user/profile/${user._id}`);
          setProfile(response.data);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setProfile(null);
        }
      }
    };

    fetchProfile();
  }, [user]);

  return { profile };
};