import { useEffect, useState } from 'react'
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
	useNavigate,
} from 'react-router-dom'
import './App.css'
import LeftSidebar from './components/layout/LeftSidebar'
import RightSidebar from './components/layout/RightSidebar'
import Bookmarks from './components/pages/Bookmarks'
import Explore from './components/pages/Explore'

// import { Provider } from '@/components/ui/provider'
import Messages from './components/pages/Messages'
import Notifications from './components/pages/Notifications'
import Profile from './components/pages/Profile'
import Register from './components/pages/Register'
import XHomepage from './components/pages/Xhomepage'

function App() {
	return (
		<Router>
			<AppContent />
		</Router>
	)
}

function AppContent() {
	const navigate = useNavigate()
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	useEffect(() => {
		// Check if user is authenticated
		const user = localStorage.getItem('user')
		setIsAuthenticated(!!user)
	}, [])

	// Public routes that don't require authentication
	const publicRoutes = ['/register', '/login']
	const isPublicRoute = publicRoutes.includes(window.location.pathname)

	return (
		<>
			{isPublicRoute ? (
				<Routes>
					<Route path='/register' element={<Register />} />
					{/* <Route path='/login' element={<Login />} /> */}
				</Routes>
			) : (
				<div className='flex min-h-screen max-w-7xl mx-auto'>
					{isAuthenticated && <LeftSidebar />}
					<main className='flex-1'>
						<Routes>
							<Route
								path='/'
								element={
									isAuthenticated ? (
										<XHomepage />
									) : (
										<Navigate to='/register' replace />
									)
								}
							/>
							<Route
								path='/profile/*'
								element={
									isAuthenticated ? (
										<Profile />
									) : (
										<Navigate to='/register' replace />
									)
								}
							/>
							<Route
								path='/explore/*'
								element={
									isAuthenticated ? (
										<Explore />
									) : (
										<Navigate to='/register' replace />
									)
								}
							/>
							<Route
								path='/notifications/*'
								element={
									isAuthenticated ? (
										<Notifications />
									) : (
										<Navigate to='/register' replace />
									)
								}
							/>
							<Route
								path='/messages'
								element={
									isAuthenticated ? (
										<Messages />
									) : (
										<Navigate to='/register' replace />
									)
								}
							/>
							<Route
								path='/bookmarks'
								element={
									isAuthenticated ? (
										<Bookmarks />
									) : (
										<Navigate to='/register' replace />
									)
								}
							/>
						</Routes>
					</main>
					{isAuthenticated && <RightSidebar />}
				</div>
			)}
		</>
	)
}

export default App
