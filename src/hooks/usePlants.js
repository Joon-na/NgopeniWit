import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function usePlants(PLANT_API_URL, user) {
  const [plants, setPlants] = useState([]);
  const [notifiedPlants, setNotifiedPlants] = useState([]);

  useEffect(() => {
    if (user) {
      fetchPlants();
    }
  }, [user]);

  useEffect(() => {
    const checkWateringTime = () => {
      const currentTime = new Date();

      plants.forEach((plant) => {
        if (!plant.wateringTime || !plant.reminderEnabled) return;

        const [hours, minutes] = plant.wateringTime.split(":");
        const wateringTime = new Date();
        wateringTime.setHours(hours, minutes, 0, 0);

        const timeDifference = Math.abs(currentTime - wateringTime) / 1000;

        if (timeDifference < 60 && !notifiedPlants.includes(plant.id)) {
          if ("Notification" in window) {
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                new Notification("Ayo siram tanamanmu!", {
                  body: `Waktu penyiraman untuk tanaman ${plant.name} telah tiba!`,
                });
              }
            });
          }

          setNotifiedPlants((prev) => [...prev, plant.id]);
        }
      });
    };

    const interval = setInterval(checkWateringTime, 10000);
    return () => clearInterval(interval);
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

  const addPlant = async (plantData) => {
    try {
      const response = await axios.post(PLANT_API_URL, plantData);
      MySwal.fire({
        title: "Berhasil!",
        text: "Tanaman berhasil ditambahkan!",
        icon: "success",
      });
      setPlants((prev) => [...prev, response.data]);
      fetchPlants();
    } catch (error) {
      console.error("Error adding plant:", error);
      MySwal.fire({
        title: "Error",
        text: "Gagal menambahkan tanaman!",
        icon: "error",
      });
    }
  };

  const updatePlant = async (id, plantData) => {
    try {
      await axios.put(`${PLANT_API_URL}/${id}`, plantData);
      MySwal.fire({
        title: "Berhasil!",
        text: "Data tanaman berhasil diperbarui!",
        icon: "success",
      });
      setPlants((prev) =>
        prev.map((plant) =>
          plant.id === id ? { ...plant, ...plantData } : plant
        )
      );
      setNotifiedPlants((prev) =>
        prev.filter((notifiedId) => notifiedId !== id)
      );
      fetchPlants();
    } catch (error) {
      console.error("Error updating plant:", error);
      MySwal.fire({
        title: "Error",
        text: "Gagal memperbarui data tanaman!",
        icon: "error",
      });
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

  return { plants, addPlant, updatePlant, deletePlant, fetchPlants };
}