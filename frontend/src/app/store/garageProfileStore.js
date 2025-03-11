import { create } from "zustand";
import { persist } from "zustand/middleware";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const garageAuthStore = create(
  persist(
    (set, get) => ({
      // State variables
      garage: null, // Holds the logged-in garage data
      isAuthenticated: false, // Tracks authentication status
      loading: false, // Tracks loading state
      error: null, // Holds any error messages

      // Load garage data from the backend
      loadGarage: async () => {
        set({ loading: true, error: null });

        try {
          const response = await fetch(
            `${backendUrl}/api/garage/verifygarage`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            }
          );

          if (response.ok) {
            const data = await response.json();
            set({ garage: data, isAuthenticated: true, loading: false });
          } else {
            set({ garage: null, isAuthenticated: false, loading: false });
          }
        } catch (error) {
          console.error("Error loading garage data:", error);
          set({
            garage: null,
            isAuthenticated: false,
            loading: false,
            error: error.message,
          });
        }
      },

      // Update the garage object
      setGarage: (updatedGarage) => {
        set({ garage: updatedGarage });
      },

      // Logout the garage
      logout: () => {
        set({ garage: null, isAuthenticated: false });
        localStorage.removeItem("garage-auth-store"); // Clear persisted data
      },
    }),
    {
      name: "garage-auth-store", // Name for localStorage
      getStorage: () => localStorage,
    }
  )
);

export default garageAuthStore;
