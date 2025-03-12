import { create } from "zustand";
import { persist } from "zustand/middleware";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const garageAuthStore = create(
  persist(
    (set, get) => ({
      // State variables
      garage: null,
      isAuthenticated: false,
      loading: false,
      error: null,

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

      // Upload profile picture
      uploadProfilePicture: async (file) => {
        set({ loading: true, error: null });

        try {
          const formData = new FormData();
          formData.append("profilePicture", file);

          const response = await fetch(
            `${backendUrl}/api/garage/profile-picture/${get().garage._id}`,
            {
              method: "POST",
              body: formData,
              credentials: "include",
            }
          );

          if (response.ok) {
            const updatedGarage = await response.json();
            set({ garage: updatedGarage, loading: false });
          } else {
            throw new Error("Failed to upload profile picture");
          }
        } catch (error) {
          console.error("Error uploading profile picture:", error);
          set({ loading: false, error: error.message });
        }
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
