import React from 'react'
import { Routes, Route, Link, NavLink } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import CareerMap from './components/CareerMap'
import CollegeList from './components/CollegeList'
import AssessForm from './components/AssessForm'
import Alerts from './components/Alerts'

export default function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-white border-end min-vh-100">
          <div className="p-3">
            <h5 className="mb-3">NHETIS <span className="text-muted">Demo</span></h5>
            <ul className="nav nav-pills flex-column gap-1">
              <li className="nav-item"><NavLink className="nav-link" to="/">Dashboard</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/career-map">Career Map</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/colleges">Govt Colleges</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/assess">Aptitude & Interests</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/alerts">Admissions & Scholarships</NavLink></li>
            </ul>
          </div>
        </nav>
        <main className="col-md-10 ms-sm-auto px-4 py-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/career-map" element={<CareerMap />} />
            <Route path="/colleges" element={<CollegeList />} />
            <Route path="/assess" element={<AssessForm />} />
            <Route path="/alerts" element={<Alerts />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}