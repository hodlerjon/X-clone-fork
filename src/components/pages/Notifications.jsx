import { Settings } from 'lucide-react'
import React, { useEffect } from 'react'
import {
	NavLink,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from 'react-router-dom'

const Notifications = () => {
	const location = useLocation()
	const navigate = useNavigate()

	const tabs = [
		{ name: 'All', path: 'all' },
		{ name: 'Verified', path: 'verified' },
		{ name: 'Mentions', path: 'mentions' },
	]

	useEffect(() => {
		if (location.pathname === '/notifications') {
			navigate('/notifications/all')
		}
	}, [location, navigate])

	const notifications = [
		{
			id: 1,
			message:
				'There was a login to your account @ShukrulloQ36672 from a new device on Mar 26, 2025. Review it now.',
			img_url: '/src/twitter.3.ico',
		},
		{
			id: 2,
			message:
				'There was a login to your account @ShukrulloQ36672 from a new device on Mar 26, 2025. Review it now.',
			img_url: '/src/twitter.3.ico',
		},
	]

	return (
		<div className='border-r border-gray-800 w-[600px] min-h-screen'>
			{/* Header section */}
			<div className='sticky flex items-center justify-between top-0 bg-black/80 backdrop-blur-md px-4 py-2 z-10'>
				<div className='w-xl text-left'>
					<h2 className='text-xl font-bold'>
						<span>Notifications</span>
					</h2>
				</div>
				<div className='group flex items-center space-x-1 text-white cursor-pointer transition-colors'>
					<div className='p-2 rounded-full group-hover:bg-blue-500/20 transition-colors'>
						<Settings />
					</div>
				</div>
			</div>

			{/* Tabs navigation */}
			<div className='flex border-b border-gray-800'>
				{tabs.map(tab => (
					<NavLink
						key={tab.name}
						to={`/notifications/${tab.path}`}
						className={({ isActive }) => `
              flex-1 min-w-[120px] p-4 text-center font-bold text-[15px]
              cursor-pointer transition-colors hover:bg-gray-900/50
              ${
								isActive
									? 'border-b-4 border-blue-500'
									: 'border-b border-transparent'
							}
            `}
					>
						{tab.name}
					</NavLink>
				))}
			</div>

			{/* Routes */}
			<div className='p-4'>
				<Routes>
					<Route
						path='all'
						element={<AllNotifications notifications={notifications} />}
					/>
					<Route path='verified' element={<Verified />} />
					<Route path='mentions' element={<Mentions />} />
				</Routes>
			</div>
		</div>
	)
}

const AllNotifications = ({ notifications }) => {
	return (
		<div>
			{notifications.map(notification => (
				<div
					key={notification.id}
					className='p-4 hover:bg-gray-900 cursor-pointer'
				>
					<div className='text-gray-500 text-sm'>
						<img src={notification.img_url} alt='Twitter' />
					</div>
					<div className='font-bold'>{notification.message}</div>
				</div>
			))}
		</div>
	)
}

const Verified = () => {
	return <p>Nothing to see here — yet</p>
}

const Mentions = () => {
	return (
		<>
			<h1>Nothing to see here — yet</h1>
			<p>When someone mentions you, you’ll find it here.</p>
		</>
	)
}

export default Notifications
