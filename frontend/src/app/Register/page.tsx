"use client";
import Image from "next/image";
import gti from "../assets/gti.jpeg";

const Page = () => {
  return (
    <div className="flex font-poppins items-center justify-center dark:bg-gray-900 min-w-screen min-h-screen">
      <div className="grid gap-8">
        <div
          id="back-div"
          className="bg-gradient-to-r from-red-800 to-gray-200 rounded-[26px] m-4"
        >
          <div className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
            <h1 className="pt-4 pb-4 font-bold text-3xl dark:text-gray-400 text-center cursor-default flex items-center justify-center space-x-3">
              <span>Service-moti</span>
              <Image
                className="h-8 w-8 rounded-full"
                src={gti}
                alt="gti"
                width={42}
                height={42}
              />
            </h1>

            <span className="pt-2 pb-2 font-bold text-2xl dark:text-gray-400 text-center cursor-default">
              Sign-up
            </span>
            <form action="#" method="post" className="space-y-4">
              <div>
                <label className="mb-2 dark:text-gray-400 text-lg">Name</label>
                <input
                  id="name"
                  className="border dark:bg-white/90 dark:text-gray-300 dark:border-gray-700 p-3 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="mb-2 dark:text-gray-400 text-lg">
                  Phone Number
                </label>
                <input
                  id="phoneno"
                  className="border dark:bg-white/90 dark:text-gray-300 dark:border-gray-700 p-3 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
                  type="number"
                  placeholder="Contact"
                  required
                />
              </div>

              <div>
                <label className="mb-2 dark:text-gray-400 text-lg">Email</label>
                <input
                  id="email"
                  className="border dark:bg-white/90 dark:text-gray-300 dark:border-gray-700 p-3 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
                  type="email"
                  placeholder="Email"
                  required
                />
              </div>

              <div>
                <label className="mb-2 dark:text-gray-400 text-lg">
                  Username
                </label>
                <input
                  id="username"
                  className="border dark:bg-white/90 dark:text-gray-300 dark:border-gray-700 p-3 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
                  type="text"
                  placeholder="John4"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 dark:text-gray-400 text-lg"
                >
                  Password
                </label>
                <input
                  id="password"
                  className="border dark:bg-white/90 dark:text-gray-300 dark:border-gray-700 p-3 mb-2 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                className="bg-gradient-to-r from-gray-500 to-gray-700 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-gray-500 hover:to-gray-700 transition duration-300 ease-in-out"
                type="submit"
              >
                SIGN UP
              </button>
            </form>
            <div className="flex flex-col mt-4 items-center justify-center text-sm">
              <h3>
                <span className="cursor-default dark:text-gray-300">
                  Have an account?
                </span>
                <a
                  className="group text-blue-400 transition-all duration-100 ease-in-out"
                  href="./login"
                >
                  <span className="bg-left-bottom ml-1 bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    Log In
                  </span>
                </a>
              </h3>
            </div>

            {/* Third Party Authentication Options */}
            <div
              id="third-party-auth"
              className="flex items-center justify-center mt-5 flex-wrap"
            >
              <button className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1">
                <img
                  className="max-w-[27px]"
                  src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                  alt="Google"
                />
              </button>
            </div>

            <div className="text-gray-500 flex text-center flex-col mt-4 items-center text-sm">
              <p className="cursor-default">
                By signing in, you agree to our{" "}
                <a
                  className="group text-blue-400 transition-all duration-100 ease-in-out"
                  href="#"
                >
                  <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    Terms
                  </span>
                </a>{" "}
                and{" "}
                <a
                  className="group text-blue-400 transition-all duration-100 ease-in-out"
                  href="#"
                >
                  <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    Privacy Policy
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
