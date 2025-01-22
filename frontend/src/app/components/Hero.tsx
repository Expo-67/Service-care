import Image from "next/image";
import Link from "next/link";
import background from "../assets/back2.jpg";

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-400 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Effortless car{" "}
              <span className="text-gray-400 hover:text-gray-500">
                maintenance
              </span>
              <br />
              Anytime, Anywhere
            </h1>
            <div className="mt-6 max-w-xl">
              <p className="text-xl text-gray-300">
                We provide an innovative web application that eliminates the
                need for traditional service cards. Simply log your car's
                service details, and let Service-moti handle the rest—giving you
                timely reminders for your next service, tracking parts changed,
                and offering valuable insights to improve your car's
                performance.
              </p>
            </div>
            <div className="mt-10">
              <a
                href="/Register"
                className="rounded-md bg-gray-900 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Get Started
              </a>
            </div>
          </div>
          <div className="mt-10 lg:mt-0 lg:w-1/2">
            <Image
              src={background}
              alt="Car maintenance illustration"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
