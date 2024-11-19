import React, { useState } from "react";
import { Trash2, Edit } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import usePlants from "../hooks/usePlants";
import { useFormik } from "formik";
import * as Yup from "yup";

const PLANT_API_URL = import.meta.env.VITE_API_URL_PLANT;
const MySwal = withReactContent(Swal);

const validationSchema = Yup.object({
  name: Yup.string().required("Nama tanaman wajib diisi"),
  plantingDate: Yup.date().required("Tanggal penanaman wajib diisi"),
  type: Yup.string().required("Jenis tanaman wajib dipilih"),
  quantity: Yup.number()
    .min(1, "Jumlah tanaman minimal 1")
    .required("Jumlah tanaman wajib diisi"),
  wateringTime: Yup.string().required("Jam penyiraman wajib diisi"),
  reminderEnabled: Yup.boolean(),
});

export default function BudidayaTracker({ user }) {
  const navigate = useNavigate();
  const { plants, addPlant, updatePlant, deletePlant } = usePlants(
    PLANT_API_URL,
    user
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      plantingDate: "",
      type: "",
      quantity: 0,
      wateringTime: "",
      reminderEnabled: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const plantData = { ...values, userId: user.id };
        if (isEditing) {
          await updatePlant(editingId, plantData);
        } else {
          await addPlant(plantData);
        }
        resetForm(); // Reset form after successful submission
      } catch (error) {
        console.error("Error saving plant:", error);
        MySwal.fire({
          title: "Gagal!",
          text: "Terjadi kesalahan saat menyimpan data tanaman!",
          icon: "error",
        });
      }
    },
  });

  // Handling edit operation
  const handleEdit = (plant) => {
    formik.setValues({
      name: plant.name,
      plantingDate: plant.plantingDate,
      type: plant.type,
      quantity: plant.quantity,
      wateringTime: plant.wateringTime,
      reminderEnabled: plant.reminderEnabled || false,
    });
    setIsEditing(true);
    setEditingId(plant.id);
  };

  // Resetting the form to its initial state
  const resetForm = () => {
    formik.resetForm();
    setIsEditing(false);
    setEditingId(null);
  };

  // Handling delete operation
  const handleDelete = async (id) => {
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
      await deletePlant(id); // Calling delete function
      MySwal.fire("Berhasil!", "Tanaman berhasil dihapus!", "success");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleToStatistics = () => {
    navigate("/statistics")
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between">
      <button
        onClick={handleBack}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
      >
        Kembali
      </button>
      <button
        onClick={handleToStatistics}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
      >
        Statistics
      </button>
      </div>
      <h1 className="text-4xl text-center font-bold text-[#142e38] mb-8">
        Budidaya Tracker
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text- 2xl font-semibold mb-4 text-[#142e38]">
          {isEditing ? "Edit Tanaman" : "Tambah Tanaman Baru"}
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
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
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Masukkan nama tanaman"
                required
                className={`w-full p-2 border rounded ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              ) : null}
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
                value={formik.values.plantingDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className={`w-full p-2 border rounded ${
                  formik.touched.plantingDate && formik.errors.plantingDate
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.plantingDate && formik.errors.plantingDate ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.plantingDate}
                </div>
              ) : null}
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
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className={`w-full p-2 border rounded ${
                  formik.touched.type && formik.errors.type
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <option value="">Pilih jenis tanaman</option>
                <option value="Herbal">Herbal</option>
                <option value="Sayuran">Sayuran</option>
                <option value="Buah">Buah</option>
                <option value="Bunga">Bunga</option>
              </select>
              {formik.touched.type && formik.errors.type ? (
                <div className="text-red-500 text-sm">{formik.errors.type}</div>
              ) : null}
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
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                min="1"
                required
                className={`w-full p-2 border rounded ${
                  formik.touched.quantity && formik.errors.quantity
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.quantity && formik.errors.quantity ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.quantity}
                </div>
              ) : null}
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
                value={formik.values.wateringTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className={`w-full p-2 border rounded ${
                  formik.touched.wateringTime && formik.errors.wateringTime
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.wateringTime && formik.errors.wateringTime ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.wateringTime}
                </div>
              ) : null}
            </div>
            <div className="flex items-center">
              <input
                id="reminderEnabled"
                name="reminderEnabled"
                type="checkbox"
                checked={formik.values.reminderEnabled}
                onChange={(e) =>
                  formik.setFieldValue("reminderEnabled", e.target.checked)
                }
                className="h-4 w-4 text-[#318161] focus:ring-[#318161] border-gray-300 rounded"
              />
              <label
                htmlFor="reminderEnabled"
                className="ml-2 block text-sm text-gray-900"
              >
                Ingatkan jam penyiraman
              </label>
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
                <th className="p-2 text-left">Pengingat</th>
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
                    {plant.reminderEnabled ? "Aktif" : "Nonaktif"}
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
