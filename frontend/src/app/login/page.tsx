"use client";
import Image from "next/image";
import gti from "../assets/gti.jpeg";

const Page = () => {
  return (
    <div className="flex font-poppins items-center justify-center dark:bg-gray-900 min-w-screen min-h-screen">
      <div className="grid gap-8">
        <div
          id="back-div"
          className="bg-gradient-to-r from-red-900 to-gray-200 rounded-[26px] m-4"
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
              Log-in
            </span>
            <form action="#" method="post" className="space-y-4">
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
                <a
                  className="group text-blue-400 transition-all duration-100 ease-in-out"
                  href="./Dashboardcl"
                >
                  Login
                </a>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
