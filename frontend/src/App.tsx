import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import FamilyTreePage from './pages/FamilyTreePage'
import TimelinePage from './pages/TimelinePage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'

console.log('App.tsx is loading...')

function App() {
  console.log('App component is rendering...')
  
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tree" element={<FamilyTreePage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
