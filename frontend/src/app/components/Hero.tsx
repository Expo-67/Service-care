import Image from "next/image";
import background from "../assets/mech.jpg";

const Hero = () => {
  return (
    <div className="relative bg-[#FCE7C8] text-gray-900">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-20 py-16 md:py-24 flex flex-col lg:flex-row items-center">
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl leading-tight">
            Your <span className="text-[#F0A04B]">Trusted</span> Car Service
          </h1>
          <p className="mt-6 text-lg text-gray-800 max-w-xl">
            Experience the future of car maintenance with <b>Service-Moti</b>.
            Log your service details and let us handle the rest—providing timely
            reminders and tracking your service history.
          </p>
          <div className="mt-8 flex justify-center lg:justify-start space-x-4">
            <a
              href="/garageonboard"
              className="rounded-full bg-[#FADA7A] text-gray-900 px-6 py-3 text-lg font-semibold shadow-md hover:bg-[#e6c969] transition"
            >
              Get Started 🚀
            </a>
            <a
              href="/about"
              className="rounded-full border-2 border-[#F0A04B] px-6 py-3 text-lg font-semibold text-[#F0A04B] shadow-md hover:bg-[#F0A04B] hover:text-white transition"
            >
              Join Us 🤝
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="mt-10 lg:mt-0 lg:w-1/2 flex justify-center relative">
          <div className="absolute -z-10 w-72 h-72 bg-[#B1C29E]/20 rounded-full blur-2xl"></div>
          <Image
            src={background}
            alt="Car maintenance illustration"
            width={500}
            height={350}
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
