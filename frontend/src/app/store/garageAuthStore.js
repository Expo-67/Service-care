//Import zustand
import { create } from "zustand";
import { persist } from "zustand/middleware";

//the backend url
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// create the store for the garageAuthStore
const garageAuthStore = create(
  persist(
    (set, get) => ({
      garage: null, // holding the garage data
      isAuthenticated: false, // Track authentication status
      loading: false, // track request status
      error: null, // hold any error that occurs
      //Load garage from the backend and update state
      loadGarage: async () => {
        try {
          const response = await fetch(
            `${backendUrl}/api/garage/verifygarage`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            }
          ); //we are making a get request to the backend to verify the garage

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
      login: async (garageData) => {
        try {
          //we are making a post request to the backend to login the garage
          const response = await fetch(`${backendUrl}/api/garage/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(garageData),
          });
          if (response.ok) {
            const data = await response.json();
            set({ garage: data, isAuthenticated: true, loading: false });
            console.log(data);
            return true;
          } else {
            set({ garage: null, isAuthenticated: false, loading: false });
            console.error("Invalid garage name or password");
            return false;
          }
        } catch (error) {
          console.error("Error logging in garage user", error);
          set({
            garage: null,
            isAuthenticated: false,
            loading: false,
            error: error.message,
          });
          localStorage.removeItem("garage");
          return false;
        }
      },
      //logout the garage user
      logout: () => {
        set({ garage: null, isAuthenticated: false, loading: false });
        localStorage.removeItem("garage");
      },
    }),
    {
      name: "garage-auth-store", // the name for local storage
      getStorage: () => localStorage,
    }
  )
);
export default garageAuthStore;
