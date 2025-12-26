import React from "react";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FiPhoneCall } from "react-icons/fi";
import {
  FaCreditCard,
  FaPaypal,
  FaCcVisa,
  FaCcMastercard,
} from "react-icons/fa";
import { Label } from "recharts";
import { shoppingViewHeaderMenuItems } from "@/config";

const Footer = () => {
  return (
    <footer className="border-t py-12 bg-gray-900 text-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        {/* Customer rating */}
        <div>
          <h3 className="text-lg text-white mb-4">Accepted Payment Methods</h3>
          <div className="flex space-x-4">
            {/* Use React Icons for payment methods */}
            <FaCreditCard className="w-8 h-8 text-white" />
            <FaCcVisa className="w-8 h-8 text-white" />
            <FaCcMastercard className="w-8 h-8 text-white" />
            <FaPaypal className="w-8 h-8 text-white" />
          </div>
          <div className="mt-6">
            <h3 className="text-lg text-white mb-4">Customer Ratings</h3>
            <div className="flex space-x-2">
              <span className="text-yellow-400">★★★★☆</span>
              <span className="text-gray-500">
                (4.5/5 based on 120 reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg mb-4">Shop</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/shop/listing?category=men"
                className="hover:text-gray-500 transition-colors"
              >
                Men's Wear
              </Link>
            </li>
            <li>
              <Link
                to="/shop/listing?category=women"
                className="hover:text-gray-500 transition-colors"
              >
                Women's Wear
              </Link>
            </li>
            <li>
              <Link
                to="/shop/listing?category=kids"
                className="hover:text-gray-500 transition-colors"
              >
                Kid's Wear
              </Link>
            </li>
            <li>
              <Link
                to="/shop/listing?category=footwear"
                className="hover:text-gray-500 transition-colors"
              >
                FootWear
              </Link>
            </li>
            <li>
              <Link
                to="/shop/listing?category=accessories"
                className="hover:text-gray-500 transition-colors"
              >
                Accessories
              </Link>
            </li>
          </ul>
        </div>

        {/* Supports Link */}
        <div>
          <h3 className="text-lg mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/contact"
                className="hover:text-gray-500 transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-gray-500 transition-colors"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg mb-4">Follow Us</h3>
          <div className="flex items-center space-x-4 mb-6">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
            >
              <TbBrandMeta className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
            >
              <IoLogoInstagram className="h-6 w-6" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
            >
              <RiTwitterXLine className="h-5 w-5" />
            </a>
          </div>
          <p className="text-gray-500">Call Us</p>
          <p className="text-white">
            <FiPhoneCall className="inline-block mr-2" />
            +91 955 832 5211
          </p>
        </div>
      </div>

      {/* footer bottom */}
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
        <p className="text-gray-600 text-sm tracking-tighter text-center">
          {" "}
          © 2025, Ssphere. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
