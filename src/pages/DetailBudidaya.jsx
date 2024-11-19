import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function DetailBudidaya() {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [activeTab, setActiveTab] = useState("preparation");

  useEffect(() => {
    const plantAPIURL = import.meta.env.VITE_API_URL_PLANT_DETAIL;
    axios
      .get(`${plantAPIURL}/${id}`)
      .then((response) => setPlant(response.data))
      .catch((error) => console.error("Error fetching plant details:", error));
  }, [id]);

  if (!plant) {
    return <p className="text-center py-16">Loading...</p>;
  }

  const tabContent = {
    preparation: {
      title: "Persiapan Lahan",
      content: plant.cultivation.preparation,
      image: plant.cultivation.preparationImage,
    },
    planting: {
      title: "Proses Penanaman",
      content: plant.cultivation.planting,
      image: plant.cultivation.plantingImage,
    },
    maintenance: {
      title: "Perawatan Tanaman",
      content: plant.cultivation.maintenance,
      image: plant.cultivation.maintenanceImage,
    },
    harvesting: {
      title: "Proses Panen",
      content: plant.cultivation.harvesting,
      image: plant.cultivation.harvestingImage,
    },
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-16">
      <h1 className="text-4xl font-bold text-[#142e38] text-center mb-6">
        {plant.title}
      </h1>
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-1/2">
          <img
            src={plant.image}
            alt={plant.title}
            className="w-full rounded-lg object-cover"
          />
        </div>
        <div className="md:w-1/2">
          <p className="text-lg text-[#142e38] mb-4">{plant.description}</p>
          <h2 className="text-2xl font-bold text-[#318161] mb-3">Informasi Umum</h2>
          <ul className="list-disc list-inside text-[#142e38]">
            <li>Nama Ilmiah: {plant.scientificName}</li>
            <li>Famili: {plant.family}</li>
            <li>Musim Tanam: {plant.plantingSeason}</li>
            <li>Durasi Panen: {plant.harvestDuration}</li>
          </ul>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex border-b border-gray-200">
          {Object.keys(tabContent).map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-2 px-4 text-center ${
                activeTab === tab
                  ? "border-b-2 border-[#318161] text-[#318161]"
                  : "text-gray-500 hover:text-[#318161]"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tabContent[tab].title}
            </button>
          ))}
        </div>
        <div className="mt-4 p-4 border rounded-lg">
          <h3 className="text-xl font-semibold mb-4">{tabContent[activeTab].title}</h3>
          <p className="mb-4">{tabContent[activeTab].content}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-[#318161] mb-4">Video Tutorial</h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={`https://www.youtube.com/embed/${plant.videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-[400px]"
          ></iframe>
        </div>
      </div>
    </div>
  );
}