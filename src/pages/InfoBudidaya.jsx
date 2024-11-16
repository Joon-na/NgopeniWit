import React from 'react';

const infoBudidaya = [
  {
    title: "Bayam",
    description: "Bayam adalah tumbuhan yang biasa ditanam untuk dikonsumsi daunnya sebagai sayuran hijau. Tumbuhan ini berasal dari Amerika tropik namun sekarang tersebar ke seluruh dunia. Tumbuhan ini dikenal sebagai sayuran sumber zat besi yang penting bagi tubuh",
    image: "./images/bayam.png",
  },
  {
    title: "Cabai",
    description: "Cabai adalah buah dan tumbuhan anggota genus Capsicum. Buahnya dapat digolongkan sebagai sayuran, rempah, atau bumbu, tergantung bagaimana pemanfaatannya. Buah cabai yang belum matang biasa bewarna hijau atau putih, dan disaat matang buah cabai dapat bewarna merah atau ungu",
    image: "./images/cabai.png",
  },
  {
    title: "Mangga",
    description: "Mangga, mempelam, atau pauh adalah nama sejenis buah, demikian pula nama pohonnya. Mangga termasuk ke dalam genus Mangifera, yang terdiri dari 35-40 anggota dari famili Anacardiaceae.",
    image: "./images/mangga.png",
  },
  {
    title: "Kemangi",
    description: "Kemangi adalah terna kecil yang daunnya biasa dimakan sebagai lalap. Aroma daunnya khas, kuat namun lembut dengan sentuhan aroma limau. Daun kemangi merupakan salah satu bumbu bagi pepes",
    image: "./images/kemangi.png",
  },
];

const truncateDescription = (text, maxLength = 70) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};

export default function InfoBudidaya() {
  return (
    <section className="bg-gradient-to-b from-white to-green-50 py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-[#142e38] text-center text-4xl font-bold mb-10 font-['Poppins']">
          Info Budidaya
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {infoBudidaya.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out text-center transform hover:-translate-y-2 group">
              <div className="overflow-hidden rounded-lg mb-4 w-full h-48 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
              </div>
              <h3 className="text-[#142e38] text-2xl font-semibold mb-3 font-['Poppins']">
                {item.title}
              </h3>
              <p className="text-[#142e38] text-base mb-6">
                {truncateDescription(item.description)}
              </p>
              <button className="px-6 py-2 bg-[#318161] text-white font-poppins rounded-full border-2 border-[#318161] hover:bg-transparent hover:text-[#318161] transition-all duration-300 ease-in-out transform hover:scale-105">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}