import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CourseDetail from './pages/CourseDetail'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:courseName" element={<CourseDetail />} />
      </Routes>
    </div>
  )
}

export default App
