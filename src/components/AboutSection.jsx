import React from 'react'
import { motion } from 'framer-motion'
import { Leaf, TrendingUp, MessageCircle } from 'lucide-react'

export default function AboutSection() {
  const features = [
    { 
      icon: Leaf, 
      title: 'Panduan Perawatan', 
      description: 'Dapatkan tips dan trik terbaik untuk merawat tanaman Anda dengan mudah dan efektif.' 
    },
    { 
      icon: TrendingUp, 
      title: 'Pelacakan Pertumbuhan', 
      description: 'Pantau perkembangan tanaman Anda dengan alat pelacakan yang intuitif dan informatif.' 
    },
    { 
      icon: MessageCircle, 
      title: 'Tanya AI', 
      description: 'Dapatkan jawaban cepat dan akurat untuk pertanyaan seputar perawatan tanaman Anda dari AI kami.' 
    },
  ]

  return (
    <section className="py-16 md:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#142e38] mb-4">
            About Us
          </h2>
          <p className="text-lg text-[#142e38] max-w-2xl mx-auto">
            NgopeniWit adalah platform inovatif yang didedikasikan untuk membantu Anda merawat tanaman dengan mudah dan menyenangkan. Kami percaya bahwa setiap orang dapat menjadi petani urban yang sukses dengan panduan yang tepat dan alat yang intuitif.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="bg-[#318161] p-3 rounded-full mb-4">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#142e38] mb-2">{feature.title}</h3>
              <p className="text-[#142e38]">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button 
            className="bg-[#318161] hover:bg-[#265a4a] text-white px-8 py-3 rounded-full transition-colors duration-300 text-lg font-semibold"
          >
            Mulai Sekarang
          </button>
        </motion.div>
      </div>
    </section>
  )
}