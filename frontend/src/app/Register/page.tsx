"use client";
import { useState } from "react";
import Image from "next/image";
import Wel from "../assets/WEL.jpg";
import { useRouter } from "next/router";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  //form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Signup successful:", data);
        // Redirect to login page
        router.push("/login");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen flex box-border justify-center items-center">
      <section className="bg-[#dfa674] rounded-2xl flex max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8">
          <h2 className="font-bold text-3xl text-[#002D74]">Service-Moti</h2>
          <h3 className="text-2xl text-[#002D74] font-semibold mt-2">
            Sign-up!{" "}
          </h3>
          <p className="text-sm mt-4 text-[#002D74]">
            Start by creating an account to become a member.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              className="p-2 mt-8 rounded-xl border"
              type="text"
              name="name"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="p-2 mt-8 rounded-xl border"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className={`bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20 ${
                  showPassword ? "hidden" : ""
                }`}
                viewBox="0 0 16 16"
                onClick={() => setShowPassword(!showPassword)}
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.133 13.133 0 0 1 1.173 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={`bi bi-eye-slash absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer ${
                  showPassword ? "" : "hidden"
                }`}
                viewBox="0 0 16 16"
                onClick={() => setShowPassword(!showPassword)}
              >
                <path d="M13.359 11.238l1.336 1.336a.5.5 0 0 1-.708.708l-1.337-1.336a8.007 8.007 0 0 1-4.65 1.336c-3.042 0-5.8-1.72-7.168-4.292a.5.5 0 0 1 0-.708C2.2 6.72 4.958 5 8 5c1.2 0 2.34.264 3.359.738l1.336-1.336a.5.5 0 1 1 .708.708l-1.336 1.336A7.978 7.978 0 0 1 13.359 8c.058.087.122.183.195.288.335.48.83 1.12 1.465 1.755C14.879 11.332 13.119 12.5 11 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.133 13.133 0 0 1 1.173 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            </div>
            <button
              className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Signup"}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
          <div className="mt-6 items-center text-gray-100">
            <hr className="border-gray-300" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-300" />
          </div>
          <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#60a8bc4f] font-medium">
            <svg
              className="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="25px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            Sign-up with Google
          </button>
          <div className="mt-10 text-sm border-b border-gray-500 py-5 playfair tooltip">
            Forgot password?
          </div>
          <div className="mt-4 text-sm flex justify-between items-center container-mr">
            <p className="mr-3 md:mr-0">If you have an account..</p>
            <button className="hover:border register text-white bg-[#002D74] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300">
              Login
            </button>
          </div>
        </div>
        <div className="md:block hidden w-1/2">
          <Image
            src={Wel}
            alt="gti"
            className="rounded-2xl"
            width={540}
            height={960}
          />
        </div>
      </section>
    </main>
  );
}
