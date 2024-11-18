import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Edit } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content"

const PLANT_API_URL = import.meta.env.VITE_API_URL_PLANT;
const MySwal = withReactContent(Swal);

export default function BudidayaTracker({ user }) {
  const [plants, setPlants] = useState([]);
  const [formState, setFormState] = useState({
    name: "",
    plantingDate: "",
    type: "",
    quantity: 0,
    wateringTime: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [notifiedPlants, setNotifiedPlants] = useState([]);
  const notificationSound = new Audio("/sound/notif.mp3");

  useEffect(() => {
    if (user) {
      fetchPlants();
    }
  }, [user]);

  useEffect(() => {
    const checkWateringTime = () => {
      const currentTime = new Date();

      plants.forEach((plant) => {
        if (!plant.wateringTime) return; // Lewati tanaman yang tidak memiliki waktu penyiraman

        const [hours, minutes] = plant.wateringTime.split(":");
        const wateringTime = new Date();
        wateringTime.setHours(hours, minutes, 0, 0);

        // Cek jika waktu saat ini mendekati waktu penyiraman (dalam rentang 1 menit)
        const timeDifference = Math.abs(currentTime - wateringTime) / 1000; // dalam detik

        if (timeDifference < 60 && !notifiedPlants.includes(plant.id)) {
          notificationSound.play();
          
          MySwal.fire({
            title: `Penyiraman Tanaman!`,
            text: `Waktu penyiraman untuk tanaman ${plant.name} telah tiba!`,
            icon: "info",
            confirmButtonText: "OK",
          });

          // menandai tanaman ini telah diberi notifikasi
          setNotifiedPlants((prev) => [...prev, plant.id]);
        }
      });
    };

    const interval = setInterval(checkWateringTime, 10000);
    return () => clearInterval(interval); // Cleanup saat unmount
  }, [plants, notifiedPlants]);

  const fetchPlants = async () => {
    try {
      const response = await axios.get(PLANT_API_URL);
      const userPlants = response.data.filter(
        (plant) => plant.userId === user.id
      );
      setPlants(userPlants);
    } catch (error) {
      console.error("Error fetching plants:", error);
      MySwal.fire({
        title: "Error",
        text: "Gagal menyimpan data tanaman!",
        icon: "error",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const plantData = { ...formState, userId: user.id };
      if (isEditing) {
        // Update data tanaman
        const response = await axios.put(
          `${PLANT_API_URL}/${editingId}`,
          plantData
        );
        MySwal.fire({
          title: "Berhasil!",
          text: "Data tanaman berhasil diperbarui!",
          icon: "success",
        });

        // Update langsung data tanaman di state
        setPlants((prev) =>
          prev.map((plant) =>
            plant.id === editingId ? { ...plant, ...formState } : plant
          )
        );
        setNotifiedPlants((prev) => prev.filter((id) => id !== editingId));
      } else {
        // Menambahkan tanaman baru
        const response = await axios.post(PLANT_API_URL, plantData);
        MySwal.fire({
          title: "Berhasil!",
          text: "Tanaman berhasil ditambahkan!",
          icon: "success",
        });

        // Menambahkan data tanaman baru ke state
        setPlants((prev) => [...prev, response.data]);
      }

      resetForm();
    } catch (error) {
      console.error("Error saving plant:", error);
      toast.error("Gagal menyimpan data tanaman!");
    }
  };

  const deletePlant = async (id) => {
    try {
      const result = await MySwal.fire({
        title: "Konfirmasi",
        text: "Apakah Anda yakin ingin menghapus tanaman ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Hapus",
      });

      if (result.isConfirmed) {
        await axios.delete(`${PLANT_API_URL}/${id}`);
        setPlants((prev) => prev.filter((plant) => plant.id !== id));
        MySwal.fire("Berhasil!", "Tanaman berhasil dihapus!", "success");
        fetchPlants();
      }
    } catch (error) {
      console.error("Error deleting plant:", error);
      MySwal.fire({
        title: "Error",
        text: "Gagal menghapus tanaman!",
        icon: "error",
      });
    }
  };

  const handleEdit = (plant) => {
    setFormState({
      name: plant.name,
      plantingDate: plant.plantingDate,
      type: plant.type,
      quantity: plant.quantity,
      wateringTime: plant.wateringTime,
    });
    setIsEditing(true);
    setEditingId(plant.id);
  };

  const resetForm = () => {
    setFormState({
      name: "",
      plantingDate: "",
      type: "",
      quantity: 0,
      wateringTime: "",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-[#142e38] mb-8">
        Budidaya Tracker
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#142e38]">
          {isEditing ? "Edit Tanaman" : "Tambah Tanaman Baru"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#142e38] mb-1"
              >
                Nama Tanaman
              </label>
              <input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                placeholder="Masukkan nama tanaman"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label
                htmlFor="plantingDate"
                className="block text-sm font-medium text-[#142e38] mb-1"
              >
                Tanggal Penanaman
              </label>
              <input
                id="plantingDate"
                name="plantingDate"
                type="date"
                value={formState.plantingDate}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-[#142e38] mb-1"
              >
                Jenis Tanaman
              </label>
              <select
                id="type"
                name="type"
                value={formState.type}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Pilih jenis tanaman</option>
                <option value="Herbal">Herbal</option>
                <option value="Sayuran">Sayuran</option>
                <option value="Buah">Buah</option>
                <option value="Bunga">Bunga</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-[#142e38] mb-1"
              >
                Jumlah Tanaman
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                value={formState.quantity}
                onChange={handleInputChange}
                min="1"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label
                htmlFor="wateringTime"
                className="block text-sm font-medium text-[#142e38] mb-1"
              >
                Jam Penyiraman
              </label>
              <input
                id="wateringTime"
                name="wateringTime"
                type="time"
                value={formState.wateringTime}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#318161] text-white px-4 py-2 rounded hover:bg-[#265a4a] transition-colors"
          >
            {isEditing ? "Update" : "Tambah"} Tanaman
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-[#142e38]">
          Daftar Tanaman
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Nama</th>
                <th className="p-2 text-left">Jenis</th>
                <th className="p-2 text-left">Tanggal Tanam</th>
                <th className="p-2 text-left">Jumlah</th>
                <th className="p-2 text-left">Jam Penyiraman</th>
                <th className="p-2 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {plants.map((plant) => (
                <tr key={plant.id} className="border-b">
                  <td className="p-2">{plant.name}</td>
                  <td className="p-2">{plant.type}</td>
                  <td className="p-2">{plant.plantingDate}</td>
                  <td className="p-2">{plant.quantity}</td>
                  <td className="p-2">
                    {plant.wateringTime || "Belum diatur"}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleEdit(plant)}
                      className="mr-2 p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deletePlant(plant.id)}
                      className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
