import React from "react";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white text-[#142e38]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pl-9">
          <div className="mb-8 md:mb-0">
            <div className="w-52">
              <a href="#">
                <img className="mb-3" src="./src/assets/images/Logo.svg" alt="logo" />
              </a>
            </div>
            <p className="text-sm mb-4">
              Membantu Anda merawat tanaman dengan mudah dan menyenangkan.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-[#142e38] hover:text-[#318161] transition-colors duration-300"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-[#142e38] hover:text-[#318161] transition-colors duration-300"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="text-[#142e38] hover:text-[#318161] transition-colors duration-300"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-[#142e38] hover:text-[#318161] transition-colors duration-300"
              >
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 font-['Poppins']">
              Tautan Cepat
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-[#318161] transition-colors duration-300"
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#318161] transition-colors duration-300"
                >
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#318161] transition-colors duration-300"
                >
                  Layanan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#318161] transition-colors duration-300"
                >
                  Kontak
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 font-['Poppins']">
              Tanaman Populer
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-[#318161] transition-colors duration-300"
                >
                  Cabai
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#318161] transition-colors duration-300"
                >
                  Mangga
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#318161] transition-colors duration-300"
                >
                  Bayam
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#318161] transition-colors duration-300"
                >
                  Kemangi
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 font-['Poppins']">
              Hubungi Kami
            </h4>
            <address className="not-italic">
              <p className="text-sm mb-2">Jl. Ahmad Yani</p>
              <p className="text-sm mb-2">Kota Semarang, 2312</p>
              <p className="text-sm mb-2">Indonesia</p>
            </address>
            <p className="text-sm mb-2">
              <a
                href="tel:+6281234567890"
                className="hover:text-[#318161] transition-colors duration-300"
              >
                +62 89237428346
              </a>
            </p>
            <p className="text-sm">
              <a
                href="mailto:info@plantcare.com"
                className="hover:text-[#318161] transition-colors duration-300"
              >
                ngopeniwit@gmail.com
              </a>
            </p>
          </div>
        </div>
        <div className="border-t border-[#142e38] mt-8 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} NgopeniWit. All Right Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
