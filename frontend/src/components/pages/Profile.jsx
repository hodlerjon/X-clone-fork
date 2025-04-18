import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
	Link,
	NavLink,
	Route,
	Routes,
	useLocation,
	useNavigate,
	useParams,
} from 'react-router-dom'
import Post from '../ui/Post'

const fadeIn = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const tabContentVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.2 } },
}

const Profile = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const { user_id } = useParams()
	const [userData, setUserData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [activeTab, setActiveTab] = useState(0)

	const tabs = [
		{ name: 'Posts', path: '' },
		{ name: 'Replies', path: 'replies' },
		{ name: 'Media', path: 'media' },
		{ name: 'Likes', path: 'likes' },
	]

	useEffect(() => {
		if (location.pathname === '/profile') {
			navigate('/profile/')
		}

		// Set active tab based on current path
		const path = location.pathname.split('/').pop()
		const tabIndex = tabs.findIndex(
			tab =>
				(tab.path === '' && (path === 'profile' || path === '')) ||
				path === tab.path
		)
		if (tabIndex >= 0) setActiveTab(tabIndex)
	}, [location, navigate, tabs])

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const targetUserId =
					user_id || JSON.parse(localStorage.getItem('user'))?.user_id
				if (!targetUserId) throw new Error('No user ID available')

				const response = await fetch(
					`http://localhost:5000/api/profile/${targetUserId}`,
					{
						method: 'GET',
						credentials: 'include',
					}
				)

				if (!response.ok) throw new Error('Failed to fetch profile')

				const data = await response.json()
				if (data.status === 'success') {
					setUserData(data.user)
				} else {
					throw new Error(data.message || 'Failed to fetch profile')
				}
			} catch (err) {
				console.error('Profile fetch error:', err)
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		fetchProfile()
	}, [user_id])

	if (loading || error || !userData) {
		const message = error
			? error
			: !userData
			? 'Profile not found'
			: 'Loading profile...'
		const color = error ? 'text-red-500' : 'text-gray-500'

		return (
			<div className='min-h-screen flex items-center justify-center bg-black border-x border-gray-800 w-full max-w-2xl mx-auto'>
				<p className={`${color} text-lg`}>{message}</p>
			</div>
		)
	}

	return (
		<motion.div
			initial='hidden'
			animate='visible'
			variants={fadeIn}
			className='min-h-screen border-x border-gray-800 w-[600px] max-w-2xl mx-auto bg-black'
		>
			{/* Header */}
			<div className='sticky top-0 bg-black/80 backdrop-blur-md z-10 px-4 py-3 flex items-center border-b border-gray-800'>
				<Link to='/' className='p-2 hover:bg-gray-800 rounded-full mr-6'>
					<ArrowLeft className='w-5 h-5 text-white' />
				</Link>
				<div>
					<h2 className='font-bold text-xl text-white'>{userData.full_name}</h2>
					<p className='text-gray-500 text-sm'>
						{userData.post_count || 0} posts
					</p>
				</div>
			</div>

			{/* Banner */}
			<div className='h-32 bg-gradient-to-br from-gray-800 to-gray-700'></div>

			<div>
				{/* Avatar + Edit Button */}
				<div className='px-4 pb-3 flex justify-between items-start relative'>
					<div className='absolute -top-12'>
						<div className='w-24 h-24 rounded-full border-4 border-black bg-gray-700 overflow-hidden flex justify-center items-center'>
							{userData.profile_image_url ? (
								<img
									src={userData.profile_image_url}
									alt='Avatar'
									className='w-full h-full object-cover'
								/>
							) : (
								<span className='font-bold text-4xl text-gray-300'>
									{userData.full_name?.charAt(0).toUpperCase()}
								</span>
							)}
						</div>
					</div>
					<div className='ml-auto mt-2'>
						<button className='px-4 py-1.5 rounded-full border border-gray-600 font-semibold text-sm hover:bg-gray-900 transition'>
							Edit profile
						</button>
					</div>
				</div>

				{/* Info */}
				<div className='px-4 mt-6 mb-4 text-white'>
					<h2 className='font-bold text-xl text-left'>{userData.full_name}</h2>
					<p className='text-gray-500 text-left'>@{userData.username}</p>

					{userData.verified && (
						<div className='flex items-center gap-1 mt-2'>
							<span className='bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full'>
								✓ Verified
							</span>
						</div>
					)}

					{userData.bio && (
						<p className='mt-3 text-left text-gray-300'>{userData.bio}</p>
					)}

					<div className='flex gap-4 mt-3 text-sm text-gray-400'>
						<span className='hover:underline cursor-pointer'>
							<strong className='text-white'>
								{userData.following_count || 0}
							</strong>{' '}
							Following
						</span>
						<span className='hover:underline cursor-pointer'>
							<strong className='text-white'>
								{userData.follower_count || 0}
							</strong>{' '}
							Followers
						</span>
					</div>

					<p className='mt-3 text-gray-500 text-sm'>
						Joined {userData.join_date || 'December 2024'}
					</p>
				</div>

				{/* Tabs */}
				<div className='flex border-b border-gray-800 sticky top-14 bg-black/80 backdrop-blur-md z-10'>
					{tabs.map((tab, index) => (
						<NavLink
							key={tab.name}
							to={`/profile${tab.path ? `/${tab.path}` : ''}`}
							end={tab.path === ''}
							className={({ isActive }) => `
                flex-1 py-4 text-center font-medium text-[15px]
                cursor-pointer transition-colors hover:bg-gray-900/50
                border-b-4 ${
									isActive ? 'border-blue-500' : 'border-transparent'
								}
              `}
						>
							{tab.name}
						</NavLink>
					))}
				</div>

				{/* Tab Content */}
				<motion.div
					key={location.pathname}
					initial='hidden'
					animate='visible'
					variants={tabContentVariants}
				>
					<Routes>
						<Route index element={<Posts />} />
						<Route path='replies' element={<Replies />} />
						<Route path='media' element={<Media />} />
						<Route path='likes' element={<Likes />} />
					</Routes>
				</motion.div>
			</div>
		</motion.div>
	)
}

const EmptyState = ({ message }) => (
	<div className='flex flex-col items-center justify-center py-16 text-gray-500'>
		<p className='text-xl font-medium'>{message}</p>
		<p className='text-sm mt-1'>When they post, you'll see them here</p>
	</div>
)

const Posts = () => {
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const user_id = JSON.parse(localStorage.getItem('user'))?.user_id

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				if (!user_id) throw new Error('No user ID available')

				const resp = await fetch(
					`http://localhost:5000/api/tweets/${user_id}`,
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Accept: 'application/json',
						},
						credentials: 'include',
					}
				)
				if (!resp.ok) {
					throw new Error('Failed to fetch posts')
				}
				const data = await resp.json()
				if (data.status === 'success') {
					setPosts(data.tweets)
				} else {
					throw new Error(data.message || 'Failed to fetch posts')
				}
			} catch (err) {
				console.error(err)
				setError('Failed to fetch posts')
			} finally {
				setLoading(false)
			}
		}

		fetchPosts()
	}, [user_id])

	return (
		<div className='px-4 py-3'>
			{loading && <p className='text-gray-500'>Loading posts...</p>}
			{error && <p className='text-red-500'>{error}</p>}
			{!loading && !error && posts.length === 0 && (
				<EmptyState message='No posts yet' />
			)}
			{!loading && !error && posts.length > 0 && (
				<div>
					{posts.map(post => (
						<Post
							key={post.id}
							username={post.user.username}
							content={post.text_content}
							time={post.created_at}
							handle={post.user.username}
							avatar={post.user.profile_image_url}
							media={post.media_content}
							id={post.id}
						/>
					))}
				</div>
			)}
		</div>
	)
}

const Replies = () => <EmptyState message='No replies yet' />

const Media = () => <EmptyState message='No media yet' />

const Likes = () => {
	const [likes, setLikes] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const user_id = JSON.parse(localStorage.getItem('user'))?.user_id

	useEffect(() => {
		const fetchLikes = async () => {
			try {
				const resp = await fetch(`http://localhost:5000/api/likes/${user_id}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					credentials: 'include',
				})

				if (!resp.ok) {
					throw new Error('Failed to fetch likes')
				}

				const data = await resp.json()
				if (data.status === 'success') {
					setLikes(data.liked_tweets || [])
				} else {
					throw new Error(data.message || 'Failed to fetch likes')
				}
			} catch (err) {
				console.error('Error fetching likes:', err)
				setError('Failed to fetch likes')
			} finally {
				setLoading(false)
			}
		}

		if (user_id) {
			fetchLikes()
		} else {
			setLoading(false)
		}
	}, [user_id])

	return (
		<div className='px-4 py-3'>
			{loading && <p className='text-gray-500'>Loading likes...</p>}
			{error && <p className='text-red-500'>{error}</p>}
			{!loading && !error && likes.length === 0 && (
				<EmptyState message='No likes yet' />
			)}
			{!loading && !error && likes.length > 0 && (
				<div className='space-y-4'>
					{likes.map(like => (
						<Post
							key={like.id}
							username={like.user.username}
							content={like.text_content}
							time={like.created_at}
							handle={like.user.username}
							avatar={like.user.profile_image_url}
							media={like.media_content}
							id={like.id}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default Profile
