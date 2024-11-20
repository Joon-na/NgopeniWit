import React from "react";
import { motion } from "framer-motion";
import { Users, Heart, Sprout } from "lucide-react";

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-green-50 to-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div
              className="lg:w-1/2 mb-8 lg:mb-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-[#142e38] mb-6">
                About Us
              </h1>
              <p className="text-lg text-[#142e38] mb-8">
                NgopeniWit adalah platform inovatif yang didedikasikan untuk
                membantu Anda merawat tanaman dengan mudah dan menyenangkan.
                Kami percaya bahwa setiap orang dapat menjadi petani urban yang
                sukses dengan panduan yang tepat dan alat yang intuitif.
              </p>
              <button className="bg-[#318161] hover:bg-[#265a4a] text-white px-8 py-3 rounded-full transition-colors duration-300 text-lg font-semibold">
                Pelajari Lebih Lanjut
              </button>
            </motion.div>
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="/images/berkebun.jpg"
                alt="NgopeniWit Platform"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div
              className="lg:w-1/2 order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="/images/misi.jpg"
                alt="Our Mission"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
            <motion.div
              className="lg:w-1/2 mb-8 lg:mb-0 order-1 pl-4 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#142e38] mb-6">
                Misi Kami
              </h2>
              <p className="text-lg text-[#142e38] mb-6">
                Misi kami adalah memberdayakan setiap orang untuk menumbuhkan
                tanaman mereka sendiri, menciptakan ruang hijau di rumah, dan
                berkontribusi pada lingkungan yang lebih sehat.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Users, text: "Memberikan tips budidaya tanaman kepada setiap orang" },
                  { icon: Heart, text: "Menyebarkan cinta pada alam" },
                  { icon: Sprout, text: "Mendorong gaya hidup berkelanjutan" },
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <item.icon className="h-6 w-6 text-[#318161] mr-3" />
                    <span className="text-[#142e38]">{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-[#142e38] mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Apa Kata Mereka
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Dewi Lestari",
                text: "NgopeniWit telah membantu saya mengubah balkon kecil saya menjadi taman yang indah. Saya sangat merekomendasikan platform ini!",
              },
              {
                name: "Rudi Hartono",
                text: "Berkat panduan dari NgopeniWit, saya berhasil menumbuhkan sayuran organik sendiri. Terima kasih atas dukungannya!",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-green-50 p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <p className="text-[#142e38] mb-4 italic">
                  "{testimonial.text}"
                </p>
                <p className="text-[#318161] font-semibold">
                  {testimonial.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[#318161]">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Mulai Perjalanan Berkebun Anda
          </motion.h2>
          <motion.p
            className="text-xl text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Bergabunglah dengan komunitas kami dan mulailah menanam kebahagiaan
            di rumah Anda.
          </motion.p>
          <motion.button
            className="bg-white text-[#318161] px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Daftar Sekarang
          </motion.button>
        </div>
      </section>
    </div>
  );
}
