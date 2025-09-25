import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5050'

export default function CollegeList() {
  const [rows, setRows] = useState<any[]>([])
  const [state, setState] = useState('Telangana')
  const [program, setProgram] = useState('')

  useEffect(() => { fetchRows() }, [])

  function fetchRows() {
    const params = new URLSearchParams()
    if (state) params.set('state', state)
    if (program) params.set('program', program)
    axios.get(`${API}/api/colleges?${params.toString()}`)
      .then(r => setRows(r.data))
      .catch(console.error)
  }

  return (
    <div>
      <h3 className="mb-3">Government College Programs (location-based)</h3>
      <div className="row g-2 mb-3">
        <div className="col-md-4">
          <input className="form-control" value={state} onChange={e=>setState(e.target.value)} placeholder="State" />
        </div>
        <div className="col-md-4">
          <input className="form-control" value={program} onChange={e=>setProgram(e.target.value)} placeholder="Program (e.g., Computer, B.Com)" />
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary w-100" onClick={fetchRows}>Search</button>
        </div>
      </div>

      <div className="row g-3">
        {rows.map((c, i) => (
          <div key={i} className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{c.college_name}</h5>
                <p className="mb-1"><strong>Program:</strong> {c.program}</p>
                <p className="mb-1"><strong>Eligibility:</strong> {c.eligibility}</p>
                <p className="mb-1"><strong>State / District:</strong> {c.state} / {c.district}</p>
                <div className="mt-2 d-flex gap-2 flex-wrap">
                  {(c.facilities||[]).map((f:string, idx:number) => <span key={idx} className="badge text-bg-success">{f}</span>)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}