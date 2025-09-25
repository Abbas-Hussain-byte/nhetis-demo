import React, { useState } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5050'

const ALL_INTERESTS = ['ai','analytics','finance','policy','agriculture','healthcare','management','software','web','data']
const ALL_APTITUDES = ['logical reasoning','numerical','communication','problem solving','attention to detail','writing','field work','pattern recognition','analysis','empathy']

export default function AssessForm() {
  const [interests, setInterests] = useState<string[]>(['ai','analytics'])
  const [aptitudes, setAptitudes] = useState<string[]>(['logical reasoning','numerical'])
  const [level, setLevel] = useState<string>('12')
  const [recs, setRecs] = useState<any[]>([])

  function toggle(list:string[], val:string, setter:(arr:string[])=>void) {
    if (list.includes(val)) setter(list.filter(x=>x!==val))
    else setter([...list, val])
  }

  async function submit() {
    const r = await axios.post(`${API}/api/assess`, { interests, aptitudes, level })
    setRecs(r.data.recommendations || [])
  }

  return (
    <div>
      <h3 className="mb-3">Aptitude & Interest Assessment</h3>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-body">
              <h5>Interests</h5>
              <div className="d-flex gap-2 flex-wrap">
                {ALL_INTERESTS.map(i => (
                  <button key={i} type="button" className={'btn btn-sm ' + (interests.includes(i)?'btn-primary':'btn-outline-primary')} onClick={()=>toggle(interests, i, setInterests)}>
                    {i}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body">
              <h5>Aptitudes</h5>
              <div className="d-flex gap-2 flex-wrap">
                {ALL_APTITUDES.map(i => (
                  <button key={i} type="button" className={'btn btn-sm ' + (aptitudes.includes(i)?'btn-success':'btn-outline-success')} onClick={()=>toggle(aptitudes, i, setAptitudes)}>
                    {i}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5>Level</h5>
              <select className="form-select" value={level} onChange={e=>setLevel(e.target.value)}>
                <option value="10">Class 10</option>
                <option value="12">Class 12</option>
                <option value="undergrad">Undergrad</option>
              </select>
              <button className="btn btn-dark mt-3" onClick={submit}>Get Recommendations</button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h5 className="mb-3">Top Recommendations</h5>
          {recs.length === 0 && <div className="text-muted">Select interests/aptitudes and click Get Recommendations.</div>}
          <div className="row g-3">
            {recs.map((r, idx) => (
              <div key={idx} className="col-md-12">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h5 className="mb-0">{r.career}</h5>
                        <small className="text-muted">{r.course} • {r.category}</small>
                      </div>
                      <span className="badge text-bg-secondary">Score: {r._score}</span>
                    </div>
                    <div className="mt-2">
                      <strong>Skills:</strong> {(r.skills||[]).join(', ')}
                    </div>
                    <div className="mt-2">
                      <strong>Growth Index:</strong> {r.growth_index} • <strong>Salary:</strong> {r.salary_range_in_lpa[0]}–{r.salary_range_in_lpa[1]} LPA
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}