const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const dataPath = path.join(__dirname, 'data');
const careers = JSON.parse(fs.readFileSync(path.join(dataPath, 'careers.json'), 'utf-8'));
const colleges = JSON.parse(fs.readFileSync(path.join(dataPath, 'colleges.json'), 'utf-8'));
const alerts = JSON.parse(fs.readFileSync(path.join(dataPath, 'alerts.json'), 'utf-8'));

// Utility: filter by interests (array of strings)
function filterByInterests(items, interests) {
  if (!interests || interests.length === 0) return items;
  const set = new Set(interests.map(s => s.trim().toLowerCase()));
  return items.filter(item => {
    const tags = (item.tags || []).map(t => t.toLowerCase());
    const has = [...set].some(t => tags.includes(t));
    return has;
  });
}

// GET /api/careers?interests=AI,Finance&course=BSc CS (optional)
app.get('/api/careers', (req, res) => {
  const { interests, course, career } = req.query;
  let result = careers;

  if (interests) {
    const arr = interests.split(',').map(s => s.trim());
    result = filterByInterests(result, arr);
  }
  if (course) {
    result = result.filter(x => x.course.toLowerCase().includes(String(course).toLowerCase()));
  }
  if (career) {
    result = result.filter(x => x.career.toLowerCase().includes(String(career).toLowerCase()));
  }
  res.json(result);
});

// GET /api/colleges?state=Telangana&program=Computer
app.get('/api/colleges', (req, res) => {
  const { state, program } = req.query;
  let result = colleges;
  if (state) {
    result = result.filter(x => x.state.toLowerCase().includes(String(state).toLowerCase()));
  }
  if (program) {
    result = result.filter(x => x.program.toLowerCase().includes(String(program).toLowerCase()));
  }
  res.json(result);
});

// GET /api/alerts
app.get('/api/alerts', (req, res) => {
  res.json(alerts);
});

// GET /api/stats?interests=AI,Finance
// Returns aggregated data for charts: careerCategories, skillsCount, coursesCount
app.get('/api/stats', (req, res) => {
  const { interests } = req.query;
  let result = careers;
  if (interests) {
    const arr = interests.split(',').map(s => s.trim());
    result = filterByInterests(result, arr);
  }

  const careerCategories = {};
  const skillsCount = {};
  const coursesCount = {};

  for (const row of result) {
    const cat = row.category || 'Other';
    careerCategories[cat] = (careerCategories[cat] || 0) + 1;
    coursesCount[row.course] = (coursesCount[row.course] || 0) + 1;
    for (const s of (row.skills||[])) {
      skillsCount[s] = (skillsCount[s] || 0) + 1;
    }
  }

  res.json({ careerCategories, skillsCount, coursesCount });
});

// POST /api/assess
// body: { interests: string[], aptitudes: string[], level: "10"|"12"|"undergrad" }
// Returns: top recommended courses/careers based on simple scoring
app.post('/api/assess', (req, res) => {
  const { interests = [], aptitudes = [], level = "" } = req.body || {};
  const interestSet = new Set(interests.map(s => s.trim().toLowerCase()));
  const aptSet = new Set(aptitudes.map(s => s.trim().toLowerCase()));

  function score(row) {
    let sc = 0;
    for (const t of (row.tags||[])) if (interestSet.has(t.toLowerCase())) sc += 2;
    for (const a of (row.aptitude||[])) if (aptSet.has(a.toLowerCase())) sc += 3;
    if (!level || (row.levels||[]).map(x=>x.toLowerCase()).includes(String(level).toLowerCase())) sc += 1;
    // bonus if local govt college program exists
    const hasProgram = colleges.some(c => c.program.toLowerCase().includes(row.course.toLowerCase()));
    if (hasProgram) sc += 1;
    return sc;
  }

  const scored = careers.map(r => ({...r, _score: score(r)}));
  scored.sort((a,b)=>b._score - a._score);
  res.json({ recommendations: scored.slice(0, 8) });
});

// Health check
app.get('/health', (_, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`NHETIS demo backend listening on http://localhost:${PORT}`);
});