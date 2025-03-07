import Link from "next/link";
import Image from "next/image";
import brand2 from "../assets/brand2.png";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
  Home,
  BookOpen,
  Wrench,
  Phone,
  HelpCircle,
  Shield,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#FCE7C8] text-gray-900">
      {/* Newsletter Section */}
      <div className="bg-[#9DAC89] text-white py-10 px-6 rounded-t-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          {/* Left Side - Image */}
          <div className="hidden md:block w-1/3"></div>

          {/* Middle Section - Text */}
          <div className="flex-1 mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-semibold">
              Subscribe to our newsletter
            </h2>
            <p className="text-sm text-gray-200">
              Get updates on our new updates!
            </p>
          </div>

          {/* Right Side - Email Input */}
          <div className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-full md:w-64 text-gray-900 rounded-l-md focus:outline-none"
            />
            <button className="bg-[#F0A04B] px-4 py-2 rounded-r-md text-white hover:bg-[#d28f42]">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo & Socials */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={brand2}
              alt="Service-moti logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <span className="text-2xl font-bold">Service-moti</span>
          </Link>
          <p className="text-gray-700 text-sm">
            Revolutionizing car maintenance through digital innovation.
          </p>
          <div className="flex space-x-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-600 hover:text-[#F0A04B]"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Company Links with Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Service-moti</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link
                href="#"
                className="flex items-center space-x-2 hover:text-[#F0A04B] transition"
              >
                <Home size={18} /> <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center space-x-2 hover:text-[#F0A04B] transition"
              >
                <BookOpen size={18} /> <span>Guide</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center space-x-2 hover:text-[#F0A04B] transition"
              >
                <Wrench size={18} /> <span>Services</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center space-x-2 hover:text-[#F0A04B] transition"
              >
                <Phone size={18} /> <span>Contact</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Links with Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link
                href="#"
                className="flex items-center space-x-2 hover:text-[#F0A04B] transition"
              >
                <HelpCircle size={18} /> <span>Help Center</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center space-x-2 hover:text-[#F0A04B] transition"
              >
                <Phone size={18} /> <span>Contact Us</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center space-x-2 hover:text-[#F0A04B] transition"
              >
                <Shield size={18} /> <span>Privacy Policy</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-700">📞 +254757-244-034</p>
          <p className="text-gray-700">✉️ jblue5912@gmail.com</p>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-300 py-4 text-center text-gray-700">
        &copy; {new Date().getFullYear()} Service-moti. @redevops All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
