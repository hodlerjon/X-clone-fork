// src/components/ui/TrendingSection.jsx

import { Ellipsis } from 'lucide-react'
import React from 'react'

const TrendingSection = () => {
	const trends = [
		{ id: 1, category: 'Technology', tag: 'React', posts: '125K' },
		{ id: 2, category: 'Programming', tag: 'JavaScript', posts: '98K' },
		// { id: 3, category: 'Web Development', tag: 'WebDev', posts: '76K' },
		// { id: 4, category: 'Tech', tag: 'Programming', posts: '54K' },
	]

	return (
		<div className='bg-dark-900 border border-gray-800 rounded-2xl mb-4'>
			<h2 className='font-bold text-xl text-left p-4'>What's happening</h2>

			{trends.map(trend => (
				<div key={trend.id} className=' p-4 relative'>
					<div className='flex justify-between items-start'>
						<div className='text-gray-500 text-sm text-left'>
							Trending in {trend.category}
						</div>

						<Ellipsis className='h-4 w-4' />
					</div>
					<div className='font-bold text-left'>{trend.tag}</div>
					<div className='text-gray-500 text-sm text-left'>
						{trend.posts} posts
					</div>
				</div>
			))}
			<button className='text-blue-500 p-4 hover:bg-gray-800 w-full text-left rounded-b-2xl'>
				Show more
			</button>
		</div>
	)
}

export default TrendingSection
