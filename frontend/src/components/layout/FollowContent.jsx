import React from 'react'
import PostInput from '../ui/PostInput'

const FollowContent = () => {
	return (
		<div className='flex flex-col w-full'>
			<PostInput />
			<div className='flex flex-col items-center justify-center py-12 px-4'>
				{/* Placeholder for posts */}
				<div className='flex flex-col items-center justify-center text-center max-w-md py-16'>
					<p className='text-2xl font-bold mb-3'>Welcome to X!</p>
					<p className='text-gray-500 text-base mb-6'>
						This is the best place to see what's happening in your world. Find
						some people and topics to follow now.
					</p>
					<button className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-full transition duration-200'>
						Let's go
					</button>
				</div>
			</div>
		</div>
	)
}

export default FollowContent
