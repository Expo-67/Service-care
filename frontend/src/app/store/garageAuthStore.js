//Import zustand
import { create } from "zustand";

//the backend url
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// create the store for the garageAuthStore
const garageAuthStore = create((set, get) => ({
  garage: null, // holding the garage data
  isAuthenticated: false, // Track authentication status
  loading: false, // track request status
  error: null, // hold any error that occurs
  //Load garage from the backend and update state
  loadGarage: async () => {
    try {
      const response = await fetch(`${backendUrl}/api/auth/verifygarage`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }); //we are making a get request to the backend to verify the garage

      if (response.ok) {
        const data = await response.json();
        set({ garage: data, isAuthenticated: true, loading: false });
        console.log(data);
      } else {
        set({ garage: null, isAuthenticated: false, loading: false });
      }
      //if there is an error, we will catch it and log it to the console
    } catch (error) {
      console.error("Error loading garage user", error);
      set({
        garage: null,
        isAuthenticated: false,
        loading: false,
        error: error.message,
      });
      localStorage.removeItem("garage");
    }
  },
  //login the garage user with the details
}));
