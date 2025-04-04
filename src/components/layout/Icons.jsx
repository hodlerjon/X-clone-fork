import {
	Bookmark,
	ChartNoAxesColumn,
	Heart,
	MessageCircle,
	Repeat,
	Share,
} from 'lucide-react'
import React, { useState } from 'react'

export const Icon = () => {
	const [isLiked, setIsLiked] = useState(false)
	const [isRetweeted, setIsRetweeted] = useState(false)
	const [likes, setLikes] = useState(24)
	const [retweets, setRetweets] = useState(12)

	const handleLike = () => {
		setIsLiked(!isLiked)
		setLikes(prev => (isLiked ? prev - 1 : prev + 1))
	}

	const handleRetweet = () => {
		setIsRetweeted(!isRetweeted)
		setRetweets(prev => (isRetweeted ? prev - 1 : prev + 1))
	}

	return (
		<div className='wrapper flex justify-between'>
			<div className='icons-group flex justify-around w-xs gap-4'>
				<div className='group flex items-center space-x-1 text-gray-500 hover:text-blue-500 cursor-pointer transition-colors'>
					<div className='p-2 rounded-full group-hover:bg-blue-500/20 transition-colors'>
						<MessageCircle className='w-5 h-5' />
					</div>
					<span>24</span>
				</div>

				<div
					onClick={handleRetweet}
					className={`group flex items-center space-x-1 cursor-pointer transition-colors ${
						isRetweeted
							? 'text-green-500'
							: 'text-gray-500 hover:text-green-500'
					}`}
				>
					<div
						className={`p-2 rounded-full transition-colors ${
							isRetweeted ? 'bg-green-500/20' : 'group-hover:bg-green-500/20'
						}`}
					>
						<Repeat className='w-5 h-5' />
					</div>
					<span>{retweets}</span>
				</div>

				<div
					onClick={handleLike}
					className={`group flex items-center space-x-1 cursor-pointer transition-colors ${
						isLiked ? 'text-pink-500' : 'text-gray-500 hover:text-pink-500'
					}`}
				>
					<div
						className={`p-2 rounded-full transition-colors ${
							isLiked ? 'bg-pink-500/20' : 'group-hover:bg-pink-500/20'
						}`}
					>
						<Heart
							className={`w-5 h-5 transition-colors ${
								isLiked ? 'fill-pink-500' : ''
							}`}
						/>
					</div>
					<span>{likes}</span>
				</div>

				<div className='group flex items-center space-x-1 text-gray-500 hover:text-blue-500 cursor-pointer transition-colors'>
					<div className='p-2 rounded-full group-hover:bg-blue-500/20 transition-colors'>
						<ChartNoAxesColumn className='w-5 h-5' />
					</div>
					<span>287</span>
				</div>
			</div>

			<div className='icons-group flex gap-2'>
				<div className='group p-2 rounded-full text-gray-500 hover:text-blue-500 hover:bg-blue-500/20 cursor-pointer transition-colors'>
					<Share className='w-5 h-5' />
				</div>
				<div className='group p-2 rounded-full text-gray-500 hover:text-blue-500 hover:bg-blue-500/20 cursor-pointer transition-colors'>
					<Bookmark className='w-5 h-5' />
				</div>
			</div>
		</div>
	)
}
