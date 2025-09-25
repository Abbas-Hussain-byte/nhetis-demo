import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5050'

export default function Alerts() {
  const [rows, setRows] = useState<any[]>([])

  useEffect(() => {
    axios.get(`${API}/api/alerts`).then(r => setRows(r.data))
  }, [])

  return (
    <div>
      <h3 className="mb-3">Admissions, Scholarships & Exams</h3>
      <div className="list-group">
        {rows.map((r, i) => (
          <a key={i} className="list-group-item list-group-item-action" href={r.link} target="_blank">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{r.title}</h5>
              <small className="text-muted">Deadline: {r.deadline}</small>
            </div>
            <small className="text-uppercase">{r.type}</small>
          </a>
        ))}
      </div>
    </div>
  )
}