import Link from "next/link";
import Image from "next/image";
import brand2 from "../assets/brand2.png";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <a href="/" className="text-2xl font-bold">
              Service-moti
              <Image
                src={brand2}
                alt="Service-moti logo"
                width={72}
                height={52}
                className="rounded-full"
              />
            </a>
            <p className="text-gray-400 text-sm">
              Revolutionizing car maintenance through digital innovation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div></div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Service-moti. @redevops All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
