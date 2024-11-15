import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Trash2, Edit } from 'lucide-react'

const API_URL = "https://673219817aaf2a9aff1373f1.mockapi.io/plant-tracker"

export default function BudidayaTracker() {
  const [plants, setPlants] = useState([])
  const [newPlant, setNewPlant] = useState({
    name: '',
    plantingDate: '',
    type: '',
    quantity: 0
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState('')

  useEffect(() => {
    fetchPlants()
  }, [])

  const fetchPlants = async () => {
    try {
      const response = await axios.get(API_URL)
      setPlants(response.data)
    } catch (error) {
      console.error('Error fetching plants:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewPlant(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isEditing) {
      await updatePlant(editingId, newPlant)
    } else {
      await addPlant(newPlant)
    }
    setNewPlant({ name: '', plantingDate: '', type: '', quantity: 0 })
    setIsEditing(false)
    setEditingId('')
  }

  const addPlant = async (plant) => {
    try {
      await axios.post(API_URL, plant)
      fetchPlants()
    } catch (error) {
      console.error('Error adding plant:', error)
    }
  }

  const updatePlant = async (id, plant) => {
    try {
      await axios.put(`${API_URL}/${id}`, plant)
      fetchPlants()
    } catch (error) {
      console.error('Error updating plant:', error)
    }
  }

  const deletePlant = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      fetchPlants()
    } catch (error) {
      console.error('Error deleting plant:', error)
    }
  }

  const handleEdit = (plant) => {
    setIsEditing(true)
    setEditingId(plant.id)
    setNewPlant({
      name: plant.name,
      plantingDate: plant.plantingDate,
      type: plant.type,
      quantity: plant.quantity
    })
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-[#142e38] mb-8">Budidaya Tracker</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#142e38]">
          {isEditing ? 'Edit Tanaman' : 'Tambah Tanaman Baru'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#142e38] mb-1">Nama Tanaman</label>
              <input
                id="name"
                name="name"
                value={newPlant.name}
                onChange={handleInputChange}
                placeholder="Masukkan nama tanaman"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="plantingDate" className="block text-sm font-medium text-[#142e38] mb-1">Tanggal Penanaman</label>
              <input
                id="plantingDate"
                name="plantingDate"
                type="date"
                value={newPlant.plantingDate}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-[#142e38] mb-1">Jenis Tanaman</label>
              <select
                id="type"
                name="type"
                value={newPlant.type}
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
              <label htmlFor="quantity" className="block text-sm font-medium text-[#142e38] mb-1">Jumlah Tanaman</label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                value={newPlant.quantity}
                onChange={handleInputChange}
                min="1"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#318161] text-white px-4 py-2 rounded hover:bg-[#265a4a] transition-colors"
          >
            {isEditing ? 'Update' : 'Tambah'} Tanaman
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-[#142e38]">Daftar Tanaman</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Nama</th>
                <th className="p-2 text-left">Jenis</th>
                <th className="p-2 text-left">Tanggal Tanam</th>
                <th className="p-2 text-left">Jumlah</th>
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
  )
}