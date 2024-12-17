"use client";

import React from "react";
import Image from "next/image";
import hero from "../assets/hero.jpg";
//import gt2 from "../assets/gt2.jpeg";
import logoo from "../assets/logoo.jpeg";
const Hero = () => {
  return (
    <div className="flex flex-wrap">
      <div className="w-full sm:w-8/12 mb-10">
        <div className="container mx-auto h-full sm:p-10">
          <nav className="flex px-4 justify-between items-center">
            <div className="text-4xl font-bold">
              Service-moti<span className="text-red-700">.</span>
            </div>
            <div>
              <Image src={logoo} alt="gt2" className="w-12" />
            </div>
          </nav>
          <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
            <div className="w-full">
              <h1 className="text-4xl lg:text-6xl font-bold">
                Effortless car <span className="text-red-700">maintenance</span>{" "}
                Anytime, Anywhere
              </h1>
              <div className="w-20 h-2 bg-red-700 my-4"></div>
              <p className="text-xl mb-10">
                We provide an innovative web application that eliminates the
                need for traditional service cards. Simply log your cars service
                details, and let Automotive-moti handle the rest—giving you
                timely reminders for your next service, tracking parts changed,
                and offering valuable insights to improve your cars performance.
                Stay ahead of the curve and keep your vehicle in peak condition
                with minimal effort.
              </p>
              <button className="bg-red-500 text-white text-2xl font-medium px-4 py-2 rounded shadow">
                Get Started
              </button>
            </div>
          </header>
        </div>
      </div>
      <Image
        src={hero}
        alt="hero"
        className="w-full h-48 object-cover sm:h-screen sm:w-4/12"
      />
    </div>
  );
};

export default Hero;
