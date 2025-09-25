import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { PieChart, Pie, Tooltip, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5050'

export default function Dashboard() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    axios.get(`${API}/api/stats?interests=ai,analytics,finance`)
      .then(r => setData(r.data))
      .catch(err => console.error(err))
  }, [])

  if (!data) return <div>Loading charts...</div>

  const pieData = Object.entries(data.careerCategories).map(([name, value]) => ({ name, value }))
  const barData = Object.entries(data.skillsCount).map(([name, value]) => ({ name, value }))

  return (
    <div>
      <h3 className="mb-4">Dashboard</h3>
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Career Categories</h5>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie dataKey="value" data={pieData} label />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Top Skills Demand</h5>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}