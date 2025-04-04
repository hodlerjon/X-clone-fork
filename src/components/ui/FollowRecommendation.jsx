import React from 'react'

const FollowRecommendation = () => {
	const recommendations = [
		{ id: 1, name: 'React Official', handle: 'reactjs' },
		{ id: 2, name: 'JavaScript', handle: 'javascript' },
		{ id: 3, name: 'Web Dev Community', handle: 'webdev' },
	]

	return (
		<div className='border border-gray-800 rounded-2xl bg-black'>
			<h2 className='font-bold text-xl p-4'>Who to follow</h2>

			{recommendations.map(user => (
				<div
					key={user.id}
					className='hover:cursor-pointer p-4 flex justify-between items-center'
				>
					<div className='flex items-center'>
						<div className='w-10 h-10 rounded-full bg-gray-700 mr-3'></div>
						<div>
							<div className='font-bold text-left'>
								<a href=''>{user.name}</a>
							</div>
							<div className='text-gray-500 text-left'>@{user.handle}</div>
						</div>
					</div>
					<button className='bg-white text-black font-bold rounded-full px-4 py-1'>
						Follow
					</button>
				</div>
			))}

			<button className='text-blue-500 p-4 hover:bg-gray-800 w-full text-left rounded-b-2xl'>
				Show more
			</button>
		</div>
	)
}

export default FollowRecommendation
