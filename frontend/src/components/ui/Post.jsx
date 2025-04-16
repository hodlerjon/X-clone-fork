import React from 'react'
import Icons from '../layout/Icons'

const Post = ({ username, handle, time, content, media, avatar, id }) => {
	return (
		<div className='border-b border-gray-800 p-4 hover:bg-gray-900/5 transition-colors cursor-pointer'>
			<div className='flex space-x-4'>
				{/* Avatar section */}
				<div className='flex-shrink-0'>
					{avatar ? (
						<img
							src={avatar}
							alt={`${username}'s avatar`}
							className='w-12 h-12 rounded-full object-cover min-w-[3rem] min-h-[3rem]'
						/>
					) : (
						<div className='w-12 h-12 min-w-[3rem] min-h-[3rem] rounded-full bg-gray-700 flex justify-center items-center'>
							<span className='font-bold text-xl'>
								{username.charAt(0).toUpperCase()}
							</span>
						</div>
					)}
				</div>
	
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
					<div className="break-words whitespace-pre-wrap max-w-full overflow-hidden text-pretty">
						<p className='mt-2 text-left text-[15px] leading-normal'>{content}</p>
					</div>
	
					{/* Media */}
					{media && (
						<div className='mt-3'>
							<img
								src={media}
								alt='Post media'
								className='rounded-2xl max-h-[510px] object-cover w-full border border-gray-800'
								onError={e => {
									console.error('Image failed to load:', media)
									e.target.style.display = 'none'
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
