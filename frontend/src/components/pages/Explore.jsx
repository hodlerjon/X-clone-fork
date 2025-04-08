import { Search, Settings } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
	NavLink,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from 'react-router-dom'

const Explore = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const location = useLocation()
	const navigate = useNavigate()

	// Update path for For you tab
	const tabs = [
		{ name: 'For you', path: 'for-you' }, // Changed from empty string
		{ name: 'News', path: 'news' },
		{ name: 'Trending', path: 'trending' },
		{ name: 'Sports', path: 'sports' },
		{ name: 'Entertainment', path: 'entertainment' },
	]

	// Navigate to 'for-you' by default
	useEffect(() => {
		if (location.pathname === '/explore') {
			navigate('/explore/for-you')
		}
	}, [location, navigate])

	const trends = [
		{
			id: 1,
			category: 'Technology · Trending',
			title: '#ReactJS',
			posts: '154K',
		},
		{
			id: 2,
			category: 'Business · Trending',
			title: '#Bitcoin',
			posts: '89K',
		},
		{
			id: 3,
			category: 'Sports · Trending',
			title: '#WorldCup2026',
			posts: '45K',
		},
		{
			id: 4,
			category: 'Entertainment · Trending',
			title: '#Gaming',
			posts: '34K',
		},
	]

	const news = [
		{
			id: 1,
			category: 'Technology',
			title: 'Latest developments in AI and Machine Learning',
			time: '2 hours ago',
			image: '/images/tech.jpg',
		},
		{
			id: 2,
			category: 'World News',
			title: 'Breaking: Major climate agreement signed',
			time: '4 hours ago',
			image: '/images/news.jpg',
		},
	]

	return (
		<div className='border-r border-gray-800 w-[600px] min-h-screen'>
			{/* Search Header */}
			<div className='sticky flex items-center justify-between top-0 bg-black/80 backdrop-blur-md px-4 py-2 z-10'>
				<div className='flex-1 max-w-[90%]'>
					<div className='flex items-center border border-gray-800  rounded-xl px-4 py-2'>
						<Search className='w-5 h-5 text-gray-500' />
						<input
							type='text'
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
							placeholder='Search'
							className='bg-transparent ml-2 outline-none w-full text-white'
						/>
					</div>
				</div>
				<div className='group flex items-center space-x-1 text-white  cursor-pointer transition-colors'>
					<div className='p-2 rounded-full group-hover:bg-blue-500/20 transition-colors'>
						<Settings />
					</div>
				</div>
			</div>

			<div className='flex border-b border-gray-800'>
				{tabs.map(tab => (
					<NavLink
						key={tab.name}
						to={`/explore/${tab.path}`}
						className={({ isActive }) => `
              flex-1 min-w-[120px] p-4 text-center font-bold text-[15px]
              cursor-pointer transition-colors hover:bg-gray-900/50
              ${isActive ? 'border-b-4 border-blue-500' : ''}
            `}
					>
						{tab.name}
					</NavLink>
				))}
			</div>

			<div className='p-4'>
				<Routes>
					<Route path='for-you' element={<ForYouTab trends={trends} />} />
					<Route path='news' element={<NewsTab news={news} />} />
					<Route path='trending' element={<TrendingTab trends={trends} />} />
					<Route path='sports' element={<SportsTab />} />
					<Route path='entertainment' element={<EntertainmentTab />} />
				</Routes>
			</div>
		</div>
	)
}

// Tab components
const ForYouTab = ({ trends }) => (
	<div>
		<h2 className='text-xl font-bold mb-4 text-left'>Today's News</h2>
		{trends.map(trend => (
			<div key={trend.id} className='p-4  cursor-pointer'>
				<div className='text-gray-500 text-sm text-left'>{trend.category}</div>
				<div className='font-bold text-left'>{trend.title}</div>
				<div className='text-gray-500 text-sm text-left'>
					{trend.posts} posts
				</div>
			</div>
		))}
	</div>
)

const NewsTab = ({ news }) => (
	<div>
		{news.map(item => (
			<div key={item.id} className='p-4 hover:bg-gray-900 cursor-pointer flex'>
				<div className='flex-1'>
					<div className='text-gray-500 text-sm'>{item.category}</div>
					<div className='font-bold'>{item.title}</div>
					<div className='text-gray-500 text-sm'>{item.time}</div>
				</div>
				{item.image && (
					<img
						src={item.image}
						alt=''
						className='w-16 h-16 rounded-xl object-cover ml-4'
					/>
				)}
			</div>
		))}
	</div>
)

const TrendingTab = ({ trends }) => (
	<div>
		{trends.map(trend => (
			<div key={trend.id} className='p-4 hover:bg-gray-900 cursor-pointer'>
				<div className='text-gray-500 text-sm'>{trend.category}</div>
				<div className='font-bold'>{trend.title}</div>
				<div className='text-gray-500 text-sm'>{trend.posts} posts</div>
			</div>
		))}
	</div>
)

const SportsTab = () => (
	<div className='p-4'>
		<div className='text-gray-500 text-sm'>Sports content coming soon...</div>
	</div>
)

const EntertainmentTab = () => (
	<div className='p-4'>
		<div className='text-gray-500 text-sm'>
			Entertainment content coming soon...
		</div>
	</div>
)

export default Explore
