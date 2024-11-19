import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Pie, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import { useNavigate } from 'react-router-dom'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

const PLANT_API_URL = import.meta.env.VITE_API_URL_PLANT

export default function Statistics() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [plants, setPlants] = useState([])
  const [stats, setStats] = useState({
    totalPlants: 0,
    typeCounts: {},
    monthlyData: [],
    mostCommonType: '',
    totalQuantityPerType: {}
  })

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (storedUser) {
      setUser(storedUser)
    } else {
      navigate('/login')
    }
  }, [navigate])

  useEffect(() => {
    if (user) {
      fetchPlants()
    }
  }, [user])

  const fetchPlants = async () => {
    try {
      const response = await axios.get(PLANT_API_URL)
      const userPlants = response.data.filter(plant => plant.userId === user.id)
      setPlants(userPlants)
      calculateStatistics(userPlants)
    } catch (error) {
      console.error('Error fetching plants:', error)
    }
  }

  const calculateStatistics = (plants) => {
    const totalPlants = plants.reduce((acc, plant) => acc + parseInt(plant.quantity, 10), 0)
    const typeCounts = plants.reduce((acc, plant) => {
      acc[plant.type] = (acc[plant.type] || 0) + 1
      return acc
    }, {})
  
    const totalQuantityPerType = plants.reduce((acc, plant) => {
      acc[plant.type] = (acc[plant.type] || 0) + parseInt(plant.quantity, 10)
      return acc
    }, {})
  
    const mostCommonType = Object.keys(typeCounts).reduce((a, b) => typeCounts[a] > typeCounts[b] ? a : b, '')
  
    const monthlyData = calculateMonthlyData(plants)
  
    setStats({
      totalPlants,
      typeCounts,
      monthlyData,
      mostCommonType,
      totalQuantityPerType
    })
  }

  const calculateMonthlyData = (plants) => {
    const monthlyCount = {}
    plants.forEach((plant) => {
      const month = new Date(plant.plantingDate).toLocaleString('default', { month: 'short', year: 'numeric' })
      monthlyCount[month] = (monthlyCount[month] || 0) + 1
    })
    return Object.entries(monthlyCount).map(([month, count]) => ({ month, count }))
  }

  const pieData = {
    labels: Object.keys(stats.typeCounts),
    datasets: [
      {
        data: Object.values(stats.typeCounts),
        backgroundColor: ['#318161', '#50C878', '#8FBC8F', '#2E8B57'],
        hoverBackgroundColor: ['#265a4a', '#4CAF50', '#66CDAA', '#006400']
      }
    ]
  }

  const barData = {
    labels: stats.monthlyData.map(data => data.month),
    datasets: [
      {
        label: 'Jumlah Penanaman',
        data: stats.monthlyData.map(data => data.count),
        backgroundColor: '#4CAF50',
        borderColor: '#318161',
        borderWidth: 1
      }
    ]
  }

  if (!user) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl mt-4 text-center font-bold mb-6">Statistik Tanaman Anda</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Total Tanaman</h2>
          <p className="text-2xl font-bold">{stats.totalPlants}</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Jenis Tanaman Terbanyak</h2>
          <p className="text-2xl font-bold">{stats.mostCommonType}</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Jumlah Tanaman per Jenis</h2>
          <div className="text-lg">
            {Object.entries(stats.totalQuantityPerType).map(([type, count]) => (
              <div key={type} className="flex justify-between items-center">
                <span>{type}:</span>
                <span className="font-bold">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Distribusi Jenis Tanaman</h3>
          <Pie data={pieData} />
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Penanaman Tanaman per Bulan</h3>
          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Penanaman Tanaman per Bulan' }
              },
              scales: {
                x: { title: { display: true, text: 'Bulan' } },
                y: { title: { display: true, text: 'Jumlah Penanaman' } }
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}