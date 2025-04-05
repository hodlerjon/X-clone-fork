import { ArrowLeft, CalendarDays, Link as LinkIcon, MapPin } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import {
	Link,
	NavLink,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from 'react-router-dom'

const Profile = () => {
	const location = useLocation()
	const navigate = useNavigate()

	const userProfile = {
		name: 'Shukrullo Qurbonov',
		handle: '@ShukrulloQ36672',
		bio: 'Frontend Developer | React & Next.js',
		location: 'Uzbekistan',
		website: 'github.com/shukrullo',
		joinDate: 'Joined March 2024',
		following: 234,
		followers: 123,
		coverImage: '',
		avatar: '',
	}

	const tabs = [
		{ name: 'Posts', path: 'posts' },
		{ name: 'Replies', path: 'replies' },
		{ name: 'Highlights', path: 'highlights' },
		{ name: 'Articles', path: 'articles' },
		{ name: 'Media', path: 'media' },
		{ name: 'Likes', path: 'likes' },
	]

	// Navigate to posts by default
	useEffect(() => {
		if (location.pathname === '/profile') {
			navigate('/profile/posts')
		}
	}, [location, navigate])

	return (
		<div className='min-h-screen border-x border-gray-800 w-[600px]'>
			{/* Header */}
			<div className='sticky top-0 bg-black/80 backdrop-blur-md z-10 px-4 py-2 flex items-center gap-6'>
				<Link to='/' className='p-2 hover:bg-gray-900 rounded-full'>
					<ArrowLeft className='w-5 h-5' />
				</Link>
				<div>
					<h2 className='font-bold text-xl'>{userProfile.name}</h2>
					<p className='text-gray-500 text-sm text-left'>0 posts</p>
				</div>
			</div>

			{/* Profile Info */}
			<div>
				{/* Cover Image */}
				<div className='h-48 bg-gray-800'>
					{userProfile.coverImage && (
						<img
							src={userProfile.coverImage}
							alt='Cover'
							className='w-full h-full object-cover'
						/>
					)}
				</div>

				{/* Avatar and Edit Button */}
				<div className='px-4 pb-4 flex justify-between items-start'>
					<div className='mt-[-48px]'>
						<div className='w-24 h-24 rounded-full border-4 border-black bg-gray-800 overflow-hidden  flex justify-center items-center'>
							{userProfile.avatar ? (
								<img
									src={userProfile.avatar}
									alt='Avatar'
									className='w-full h-full object-cover'
								/>
							) : (
								<span className='font-bold text-[34px]'>S</span>
							)}
						</div>
					</div>
					<button className='mt-4 px-4 py-1.5 rounded-xl border border-gray-500 font-bold hover:bg-gray-600/20'>
						Edit profile
					</button>
				</div>

				{/* Profile Details */}
				<div className='px-4 mb-4'>
					<h2 className='font-bold text-xl text-left'>{userProfile.name}</h2>
					<p className='text-gray-500 text-left'>{userProfile.handle}</p>

					<p className='mt-3 text-left'>{userProfile.bio}</p>

					<div className='mt-3 space-y-2'>
						<div className='flex gap-6'>
							{userProfile.location && (
								<span className='flex items-center gap-1 text-gray-500'>
									<MapPin className='w-4 h-4' />
									{userProfile.location}
								</span>
							)}
							{userProfile.website && (
								<span className='flex items-center gap-1 text-blue-500'>
									<LinkIcon className='w-4 h-4' />
									{userProfile.website}
								</span>
							)}
						</div>
						<div className='flex items-center gap-1 text-gray-500'>
							<CalendarDays className='w-4 h-4' />

							{userProfile.joinDate}
						</div>
					</div>

					<div className='flex gap-4 mt-3'>
						<span className='hover:underline cursor-pointer'>
							<strong>{userProfile.following}</strong>
							<span className='text-gray-500'> Following</span>
						</span>
						<span className='hover:underline cursor-pointer'>
							<strong>{userProfile.followers}</strong>
							<span className='text-gray-500'> Followers</span>
						</span>
					</div>
					<div className='flex border-b border-gray-800'>
						{tabs.map(tab => (
							<NavLink
								key={tab.name}
								to={`/profile/${tab.path}`}
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
							<Route path='posts' element={<Posts />} />
							<Route path='articles' element={<Articles />} />
							<Route path='replies' element={<Replies />} />
							<Route path='likes' element={<Likes />} />
							<Route path='media' element={<Media />} />
							<Route path='highlights' element={<Highlights />} />
						</Routes>
					</div>
				</div>
			</div>
		</div>
	)
}

// Move tab components to separate files later
const Posts = () => (
	<div className='space-y-4'>
		<p className='text-xl font-bold'>Posts</p>
		{/* Add your posts content here */}
	</div>
)

const Articles = () => (
	<div className='space-y-4'>
		<p className='text-xl font-bold'>Articles</p>
		{/* Add your articles content here */}
	</div>
)

const Likes = () => {
	return <p>Coming soon</p>
}
const Media = () => {
	return <p>Coming soon</p>
}
const Replies = () => {
	return <p>Coming soon</p>
}
const Highlights = () => {
	return <p>Coming soon</p>
}

export default Profile
