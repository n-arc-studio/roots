import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useStore } from './hooks/useStore'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoginPage } from './pages/LoginPage'
import HomePage from './pages/HomePage'
import FamilyTreePage from './pages/FamilyTreePage'
import TimelinePage from './pages/TimelinePage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'

console.log('App.tsx is loading...')

function App() {
  console.log('App component is rendering...')
  const isAuthenticated = useStore((state) => state.isAuthenticated)
  
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/family-tree" replace /> : <LoginPage />} 
          />
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/family-tree" replace /> : <HomePage />} 
          />
          <Route 
            path="/family-tree" 
            element={
              <ProtectedRoute>
                <FamilyTreePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tree" 
            element={
              <ProtectedRoute>
                <FamilyTreePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/timeline" 
            element={
              <ProtectedRoute>
                <TimelinePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile/:id" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
