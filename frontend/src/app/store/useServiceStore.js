import { create } from "zustand";

// store user services records
const useServiceStore = create((set) => ({
  services: [],
  isLoading: false,
  error: null,

  // Fetch services for a specific user by userId
  getServices: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/service/user/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch services");
      }

      const data = await response.json();
      set({ services: data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  // Create a new service record
  createService: async (serviceData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/service/log`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(serviceData),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create service");
      }

      const data = await response.json();
      set((state) => ({
        services: [...state.services, data.service], // Add new service to the state
      }));
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useServiceStore;
