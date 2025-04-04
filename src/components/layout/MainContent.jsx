import React, { useState } from 'react'
import ForYouContent from './ForYouContent'
import FollowingContent from './FollowContent'
import Explore from '../pages/Explore'
const MainContent = () => {
	const [activeTab, setActiveTab] = useState('For you')

	const handleTabClick = tabName => {
		setActiveTab(tabName)
	}

	return (
		<div className='border-r border-gray-800 w-[600px] min-h-screen'>
			<div className='flex sticky top-0 bg-black/80 backdrop-blur-md z-10'>
				<div
					onClick={() => handleTabClick('For you')}
					className={`flex-1 p-4 text-center font-bold text-[15px] cursor-pointer hover:bg-gray-900/50 transition-colors
            ${
							activeTab === 'For you'
								? 'border-b-4 border-b-blue-500'
								: 'border-b border-gray-800'
						}`}
				>
					For you
				</div>
				<div
					onClick={() => handleTabClick('Following')}
					className={`flex-1 p-4 text-center font-bold text-[15px] cursor-pointer hover:bg-gray-900/50 transition-colors
            ${
							activeTab === 'Following'
								? 'border-b-4 border-b-blue-500'
								: 'border-b border-gray-800'
						}`}
				>
					Following
				</div>
			</div>

			<div className='min-h-screen'>
				{activeTab === 'For you' ? <ForYouContent /> : <FollowingContent />}
			</div>
			{/* <Explore></Explore> */}
		</div>
	)
}

export default MainContent
