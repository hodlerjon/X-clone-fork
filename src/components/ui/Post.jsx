import React, { useState } from 'react'
import { Icon } from '../layout/Icons'

const Post = ({ username, handle, time, content, avatarUrl }) => {
	return (
		<div className='p-4 border-b border-gray-800 '>
			<div className='flex space-x-4'>
				<div className='w-12 h-12 rounded-full overflow-hidden'>
					<img
						src={avatarUrl || '/src/avatar.jpg'}
						alt={`${username}'s avatar`}
						className='w-full h-full object-cover'
					/>
				</div>
				<div className='flex-1'>
					<div className='flex items-center space-x-1'>
						<span className='font-bold'>{username || 'User Name'}</span>
						<span className='text-gray-500'>
							{handle || '@username'} · {time || '2h'}
						</span>
					</div>
					<p className='mt-2 mb-3 text-left'>{content}</p>

					<Icon />
				</div>
			</div>
		</div>
	)
}

export default Post
