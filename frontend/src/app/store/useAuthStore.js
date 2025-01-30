import { create } from "zustand";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const useAuthStore = create((set, get) => ({
  reminders: [], // Store reminders in the state

  // Load user from the backend and update state
  loadUser: async () => {
    try {
      const response = await fetch(`${backendUrl}/api/auth/verify`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        set({ user: data, isAuthenticated: true });
        console.log(data);
      } else {
        set({ user: null, isAuthenticated: false });
      }
    } catch (error) {
      console.log("Error loading user:", error);
      set({ user: null, isAuthenticated: false });
      localStorage.removeItem("user");
    }
  },

  // Log in user with provided credentials
  login: async (userData) => {
    try {
      const response = await fetch(`${backendUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        set({ user: data, isAuthenticated: true });
        console.log(data);
        return true;
      } else {
        set({ user: null, isAuthenticated: false });
        // localStorage.removeItem("user");
        console.error("Invalid email or password.");
        return false;
      }
    } catch (error) {
      console.error("Error logging in:", error);
      set({ user: null, isAuthenticated: false });
      localStorage.removeItem("user");
      return false;
    }
  },

  // Log out user and clear state
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  getReminders: async (userId) => {
    set({ isAuthenticated: true });

    // Fetch reminders from the backend
    try {
      const response = await fetch(
        `http://localhost:5005/api/reminder/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      console.log("Reminders fetched successfully:", data);

      set({ reminders: data });
    } catch (error) {
      console.log("Error fetching reminders:", error.message);
      set({ reminders: [] });
    }
  },
  createReminder: async (service, date, userId) => {
    // Create a new reminder on the backend
    try {
      const response = await fetch(`http://localhost:5005/api/reminder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ service, date, userId }),
      });
      const data = await response.json();

      console.log({ reminderAdd: data });

      set((state) => ({
        reminders: [...state.reminders, data],
      }));

      if (!response.ok) {
        console.log("Error creating reminder:", data.message);
        throw new Error(data.message);
      }
    } catch (error) {
      console.log("Error creating reminder:", error.message);
    }
  },
  // delete reminder
  deleteReminder: async (reminderId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reminder/${reminderId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log("Error deleting reminder", data.message);
        throw new Error(data.message);
      }

      set((state) => {
        const filteredReminders = state.reminders.filter(
          (rem) => rem._id !== reminderId
        );

        return { reminders: filteredReminders };
      });
    } catch (error) {
      console.log("Error deleting reminder", error.message);
    }
  },
}));

export default useAuthStore;
