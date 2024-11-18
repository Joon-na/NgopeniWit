import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Pie, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

const API_URL = "https://673219817aaf2a9aff1373f1.mockapi.io/plant-tracker"

export default function PlantStatistics({user}) {
  const [plants, setPlants] = useState([])
  const [stats, setStats] = useState({
    totalPlants: 0,
    typeCounts: {},
    monthlyData: [],
    mostCommonType: '',
    totalQuantityPerType: {}
  })

  useEffect(() => {
    if (user){
    fetchPlants()
  }
  }, [user])

  const fetchPlants = async () => {
    try {
      const response = await axios.get(API_URL)
      const userPlants = response.data.filter(plant => plant.userId === user.id)
      setPlants(userPlants)
      calculateStatistics(userPlants)
    } catch (error) {
      console.error('Error fetching plants:', error)
    }
  }
  const calculateStatistics = (plants) => {
    const totalPlants = plants.reduce((acc, plant) => acc + parseInt(plant.quantity, 10), 0) // Total quantity of plants
    const typeCounts = plants.reduce((acc, plant) => {
      acc[plant.type] = (acc[plant.type] || 0) + 1
      return acc
    }, {})
  
    const totalQuantityPerType = plants.reduce((acc, plant) => {
      acc[plant.type] = (acc[plant.type] || 0) + parseInt(plant.quantity, 10) // Ensure quantity is an integer
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

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">Statistik Budidaya Tanaman</h1>
      
      {/* Statistic Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Total Tanaman</h2>
          <p className="text-2xl font-bold">{stats.totalPlants}</p> {/* Total quantity of plants */}
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Jenis Tanaman Terbanyak</h2>
          <p className="text-2xl font-bold">{stats.mostCommonType}</p> {/* Most common plant type */}
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Jumlah Tanaman per Jenis</h2>
          <div className="text-2xl font-bold">
            {Object.keys(stats.totalQuantityPerType).map((type, idx) => (
              <div key={idx} className="my-2">
                <span>{type}: </span>
                <span>{stats.totalQuantityPerType[type]}</span>
              </div>
            ))}
          </div> {/* Total quantity per type */}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Pie Chart */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Distribusi Jenis Tanaman</h3>
          <Pie data={pieData} />
        </div>

        {/* Bar Chart */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Penanaman Tanaman per Bulan</h3>
          <Bar data={barData} options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Penanaman Tanaman per Bulan' }
            },
            scales: {
              x: { title: { display: true, text: 'Bulan' } },
              y: { title: { display: true, text: 'Jumlah Penanaman' } }
            }
          }} />
        </div>
      </div>
    </div>
  )
}
