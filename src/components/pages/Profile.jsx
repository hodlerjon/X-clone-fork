import React from 'react'
import { ArrowLeft, Calendar, Link as LinkIcon, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

const Profile = () => {
	const userProfile = {
		name: 'Shukrullo',
		handle: '@ShukrulloQ36672',
		bio: 'Frontend Developer | React & Next.js',
		location: 'Uzbekistan',
		website: 'github.com/shukrullo',
		joinDate: 'Joined March 2024',
		following: 234,
		followers: 123,
		coverImage: '/images/cover.jpg',
		avatar: '/images/avatar.jpg',
	}

	return (
		<div className='min-h-screen border-x border-gray-800 w-[600px]'>
			{/* Header */}
			<div className='sticky top-0 bg-black/80 backdrop-blur-md z-10 px-4 py-2 flex items-center gap-6'>
				<Link to='/' className='p-2 hover:bg-gray-900 rounded-full'>
					<ArrowLeft className='w-5 h-5' />
				</Link>
				<div>
					<h2 className='font-bold text-xl'>{userProfile.name}</h2>
					<p className='text-gray-500 text-sm'>0 posts</p>
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
						<div className='w-24 h-24 rounded-full border-4 border-black bg-gray-800 overflow-hidden'>
							{userProfile.avatar && (
								<img
									src={userProfile.avatar}
									alt='Avatar'
									className='w-full h-full object-cover'
								/>
							)}
						</div>
					</div>
					<button className='mt-4 px-4 py-1.5 rounded-full border border-gray-600 font-bold hover:bg-gray-900'>
						Edit profile
					</button>
				</div>

				{/* Profile Details */}
				<div className='px-4 mb-4'>
					<h2 className='font-bold text-xl'>{userProfile.name}</h2>
					<p className='text-gray-500'>{userProfile.handle}</p>

					<p className='mt-3'>{userProfile.bio}</p>

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
							<Calendar className='w-4 h-4' />
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
				</div>
			</div>
		</div>
	)
}

export default Profile
