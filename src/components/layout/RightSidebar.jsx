import React from 'react'
import { Search } from 'lucide-react'
import TrendingSection from '../ui/TrendingSection'
import FollowRecommendations from '../ui/FollowRecommendation'

const RightSidebar = () => {
	return (
		<div className='w-80 p-4 hidden lg:block'>
			<div className='bg-dark-900 border border-gray-800 rounded-xl flex items-center px-4 py-2 mb-4'>
				<Search className='h-5 w-5 text-gray-500' />
				<input
					type='text'
					placeholder='Search'
					className='bg-transparent ml-2 outline-none w-full'
				/>
			</div>

			<TrendingSection />
			<FollowRecommendations />
		</div>
	)
}

export default RightSidebar
