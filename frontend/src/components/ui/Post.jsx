import React from 'react'
import Icons from '../layout/Icons'

const Post = ({ username, handle, time, content, media, avatar, id }) => {
	return (
		<div className='border-b border-gray-800 p-4 hover:bg-gray-900/5 transition-colors cursor-pointer'>
			<div className='flex space-x-4'>
				{/* Avatar section */}
				{avatar ? (
					<div className='flex-shrink-0'>
						<img
							src={avatar}
							alt={`${username}'s avatar`}
							className='w-12 h-12 rounded-full object-cover'
						/>
					</div>
				) : (
					<div className='w-12 h-12 rounded-full bg-gray-700 flex justify-center items-center'>
						<span className='font-bold text-xl'>
							{username.charAt(0).toUpperCase()}
						</span>
					</div>
				)}

				{/* Content section */}
				<div className='flex-grow'>
					{/* Header */}
					<div className='flex items-center space-x-2'>
						<span className='font-bold hover:underline'>{username}</span>
						<span className='text-gray-500'>{handle}</span>
						<span className='text-gray-500'>·</span>
						<span className='text-gray-500 text-sm hover:underline'>
							{time}
						</span>
					</div>

					{/* Tweet content */}
					<p className='mt-2 text-left text-[15px] leading-normal'>{content}</p>

					{/* Media */}
					{media && (
						<div className='mt-3'>
							<img
								src={media}
								alt='Post media'
								className='rounded-2xl max-h-[510px] object-cover w-full border border-gray-800'
								onError={e => {
									console.error('Image failed to load:', media)
									// Add fallback image or hide the element
									e.target.style.display = 'none'
									// Optional: Show error message
									e.target.parentElement.innerHTML =
										'<p class="text-gray-500">Image failed to load</p>'
								}}
							/>
						</div>
					)}

					{/* Interaction icons */}
					<div className='mt-3'>
						<Icons tweetId={id} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Post
