import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5050'

export default function CareerMap() {
  const [rows, setRows] = useState<any[]>([])
  const [interests, setInterests] = useState('ai,analytics')

  useEffect(() => { fetchRows() }, [])

  function fetchRows() {
    axios.get(`${API}/api/careers?interests=${encodeURIComponent(interests)}`)
      .then(r => setRows(r.data))
      .catch(console.error)
  }

  return (
    <div>
      <div className="d-flex align-items-end justify-content-between mb-3">
        <h3>Course → Skills → Career</h3>
        <div className="input-group" style={{maxWidth: 420}}>
          <input className="form-control" value={interests} onChange={e => setInterests(e.target.value)} placeholder="interests: ai, finance, policy, ..." />
          <button className="btn btn-primary" onClick={fetchRows}>Filter</button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Course</th><th>Career</th><th>Skills</th><th>Category</th><th>Growth</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx}>
                <td>{r.course}</td>
                <td>{r.career}</td>
                <td>{(r.skills||[]).join(', ')}</td>
                <td><span className="badge text-bg-secondary">{r.category||'Other'}</span></td>
                <td>{r.growth_index}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}