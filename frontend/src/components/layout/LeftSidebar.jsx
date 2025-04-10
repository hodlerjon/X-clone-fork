import {
	Bell,
	Bookmark,
	CircleEllipsis,
	Home,
	Mail,
	MoreHorizontal,
	Search,
	User,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import MoreModal from '../ui/MoreModal'

const LeftSidebar = () => {
	const [isMoreModalOpen, setIsMoreModalOpen] = useState(false)
	const location = useLocation()

	return (
		<div className='w-64 p-4 border-r border-gray-800'>
			<Link to='/' className='mb-6 block'>
				<svg
					viewBox='0 0 24 24'
					className='h-8 w-8 text-white ml-4'
					fill='currentColor'
				>
					<g>
						<path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'></path>
					</g>
				</svg>
			</Link>

			<nav className='space-y-4'>
				<NavItem
					to='/'
					icon={<Home className='h-6 w-6' />}
					text='Home'
					active={location.pathname === '/'}
				/>
				<NavItem
					to='/explore'
					icon={<Search className='h-6 w-6' />}
					text='Explore'
					active={location.pathname === '/explore'}
				/>
				<NavItem
					to='/notifications'
					icon={<Bell className='h-6 w-6' />}
					text='Notifications'
					active={location.pathname === '/notifications'}
				/>
				<NavItem
					to='/messages'
					icon={<Mail className='h-6 w-6' />}
					text='Messages'
					active={location.pathname === '/messages'}
				/>
				<NavItem
					to='/bookmarks'
					icon={<Bookmark className='h-6 w-6' />}
					text='Bookmarks'
					active={location.pathname === '/bookmarks'}
				/>
				<NavItem
					to='/profile'
					icon={<User className='h-6 w-6' />}
					text='Profile'
					active={location.pathname === '/profile'}
				/>

				<NavItem
					icon={<CircleEllipsis className='h-6 w-6' />}
					text='More'
					onClick={() => setIsMoreModalOpen(true)}
				/>
			</nav>

			<div className='bg-white hover:bg-gray-300 transition-colors text-black font-bold py-3 cursor-pointer px-4 rounded-full w-full mt-6 mb-6'>
				Post
			</div>

			<MoreModal
				isOpen={isMoreModalOpen}
				onClose={() => setIsMoreModalOpen(false)}
			/>
			<div className=' mt-4 hover:bg-gray-900/50 rounded-full cursor-pointer transition-colors'>
				<div className=' flex items-center justify-between'>
					<div className='flex items-center space-x-3'>
						<div className='w-10 h-10 rounded-full bg-gray-700 flex justify-center items-center'>
							<span className='font-bold text-lg'>S</span>
						</div>
						<div className='flex-1'>
							<h2 className='font-bold text-[15px] leading-5'>
								Shukrullo Qurbonov
							</h2>
							<p className='text-gray-500 text-sm'>@ShukrulloQ36672</p>
						</div>
					</div>
					<div className='flex items-center'>
						<MoreHorizontal className='w-5 h-5' />
					</div>
				</div>
			</div>
		</div>
	)
}

const NavItem = ({ icon, text, active, to, onClick }) => {
	if (onClick) {
		return (
			<div
				onClick={onClick}
				className='flex items-center space-x-4 hover:bg-white/10 p-3 rounded-full w-full cursor-pointer'
			>
				{icon}
				<span className={`text-xl ${active ? 'font-bold' : ''}`}>{text}</span>
			</div>
		)
	}

	if (!to) {
		return (
			<div className='flex items-center space-x-4 hover:bg-white/10 p-3 rounded-full w-full cursor-pointer'>
				{icon}
				<span className={`text-xl ${active ? 'font-bold' : ''}`}>{text}</span>
			</div>
		)
	}

	return (
		<Link
			to={to}
			className='flex items-center space-x-4 hover:bg-white/10 p-3 rounded-full w-full cursor-pointer'
		>
			{icon}
			<span className={`text-xl ${active ? 'font-bold' : ''}`}>{text}</span>
		</Link>
	)
}

export default LeftSidebar
