import { Search } from 'lucide-react'
import React from 'react'
import FollowRecommendations from '../ui/FollowRecommendation'
import TrendingSection from '../ui/TrendingSection'

const RightSidebar = () => {
	// const [isFocused, setIsFocused] = useState(false)

	return (
		<div className='sticky top-0 w-80 h-screen p-4 hidden lg:block'>
			{/* Search Bar */}
			<div
				className='border-gray-800
          rounded-full 
          flex items-center 
          px-4 py-3 
          mb-4
          border'
			>
				<Search className={`h-5 w-5 ${'text-gray-500'}`} />
				<input
					type='text'
					placeholder='Search'
					className='bg-transparent ml-2 outline-none w-full text-white placeholder-gray-500'
				/>
			</div>

			{/* Content Sections */}
			<div className='space-y-4'>
				<div className=' rounded-2xl'>
					<TrendingSection />
				</div>

				<div className='rounded-2xl'>
					<FollowRecommendations />
				</div>
			</div>

			{/* Footer Links */}
		</div>
	)
}

export default RightSidebar
