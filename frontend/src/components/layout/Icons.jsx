import {
	Bookmark,
	ChartNoAxesColumn,
	Heart,
	MessageCircle,
	Repeat,
	Share,
} from 'lucide-react'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

const Icons = ({ tweetId, onBookmarkToggle, onLikeToggle }) => {
	const [tweetData, setTweetData] = useState({
		like_count: 0,
		retweet_count: 0,
		reply_count: 0,
		view_count: 0,
	})
	const [isLiked, setIsLiked] = useState(false)
	const [isRetweeted, setIsRetweeted] = useState(false)
	const [isBookmarked, setBookmarked] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	// Fetch tweet data
	useEffect(() => {
		const fetchTweetData = async () => {
			if (!tweetId) {
				setIsLoading(false)
				setError('Tweet ID is missing')
				return
			}

			const userId = JSON.parse(localStorage.getItem('user'))?.user_id

			try {
				const response = await fetch(
					`http://localhost:5000/api/${tweetId}/data?user_id=${userId}`,
					{
						credentials: 'include',
					}
				)

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}

				const result = await response.json()

				if (result.status === 'success' && result.data) {
					setTweetData({
						like_count: result.data.like_count || 0,
						retweet_count: result.data.retweet_count || 0,
						reply_count: result.data.reply_count || 0,
						view_count: result.data.view_count || 0,
					})
					setIsLiked(result.is_liked || false) // 💡 здесь result.is_liked, не result.data.is_liked
					setIsRetweeted(result.is_retweeted || false) // если есть такая логика
					setBookmarked(result.is_bookmarked || false) // если есть такая логика
				} else {
					throw new Error(result.message || 'Failed to fetch tweet data')
				}
			} catch (error) {
				console.error('Error fetching tweet data:', error)
				setError(error.message)
			} finally {
				setIsLoading(false)
			}
		}

		fetchTweetData()
	}, [tweetId])

	// Handle like
	const handleLike = async () => {
		const userId = JSON.parse(localStorage.getItem('user'))?.user_id
		if (!userId) {
			alert('Please login to like tweets')
			return
		}

		try {
			const response = await fetch('http://localhost:5000/api/likes', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({
					user_id: userId,
					tweet_id: tweetId,
				}),
			})

			if (!response.ok) {
				throw new Error('Failed to like tweet')
			}

			const data = await response.json()
			if (data.status === 'success') {
				const newStatus = !isLiked
				setIsLiked(newStatus)
				if (onLikeToggle) {
					onLikeToggle(tweetId, newStatus)
				}
				setTweetData(prev => ({
					...prev,
					like_count: isLiked ? prev.like_count - 1 : prev.like_count + 1,
				}))
			}
		} catch (error) {
			console.error('Error liking tweet:', error)
			alert('Failed to like tweet. Please try again.')
		}
	}

	// Handle retweet
	const handleRetweet = async () => {
		const userId = JSON.parse(localStorage.getItem('user'))?.user_id
		if (!userId) {
			alert('Please login to retweet')
			return
		}

		try {
			const response = await fetch('http://localhost:5000/api/retweet', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({
					user_id: userId,
					tweet_id: tweetId,
				}),
			})

			if (!response.ok) {
				throw new Error('Failed to retweet')
			}

			const data = await response.json()
			if (data.status === 'success') {
				setIsRetweeted(!isRetweeted)
				setTweetData(prev => ({
					...prev,
					retweet_count: isRetweeted
						? prev.retweet_count - 1
						: prev.retweet_count + 1,
				}))
			}
		} catch (error) {
			console.error('Error retweeting:', error)
			alert('Failed to retweet. Please try again.')
		}
	}
	const handleBookmark = async () => {
		const userId = JSON.parse(localStorage.getItem('user'))?.user_id
		if (!userId) {
			alert('Please login to bookmark')
			return
		}
		try {
			const resp = await fetch('http://localhost:5000/api/bookmarks', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					user_id: userId,
					tweet_id: tweetId,
				}),
			})
			if (!resp.ok) {
				throw new Error('Failed to bookmark')
			}
			const data = await resp.json()
			if (data.status === 'success') {
				const newStatus = !isBookmarked
				setBookmarked(newStatus)

				if (onBookmarkToggle) {
					onBookmarkToggle(tweetId, newStatus)
				}
			}
		} catch (error) {
			alert('Failed to bookmark. Please try again.')
			console.error('Error bookmarking:', error)
		}
	}
	if (isLoading) {
		return <div className='flex justify-center p-4'>Loading tweet data...</div>
	}

	if (error) {
		return <div className='text-red-500 p-4'>Error: {error}</div>
	}

	return (
		<div className='wrapper flex justify-between'>
			<div className='icons-group flex justify-around w-xs gap-4'>
				{/* Replies */}
				<div className='group flex items-center space-x-1 text-gray-500 hover:text-blue-500 cursor-pointer transition-colors'>
					<div className='p-2 rounded-full group-hover:bg-blue-500/20 transition-colors'>
						<MessageCircle className='w-5 h-5' />
					</div>
					<span className='min-w-[16px] text-center'>
						{tweetData.reply_count > 0 ? tweetData.reply_count : ''}
					</span>
				</div>

				{/* Retweets */}
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
					<span className='min-w-[16px] text-center'>
						{tweetData.retweet_count > 0 ? tweetData.retweet_count : ''}
					</span>
				</div>

				{/* Likes */}
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
					<span className='min-w-[16px] text-center'>
						{tweetData.like_count > 0 ? tweetData.like_count : ''}
					</span>
				</div>

				{/* Views */}
				<div className='group flex items-center space-x-1 text-gray-500 hover:text-blue-500 cursor-pointer transition-colors'>
					<div className='p-2 rounded-full group-hover:bg-blue-500/20 transition-colors'>
						<ChartNoAxesColumn className='w-5 h-5' />
					</div>
					<span className='min-w-[16px] text-center'>
						{tweetData.view_count > 0 ? tweetData.view_count : ''}
					</span>
				</div>
			</div>

			<div className='icons-group flex gap-2'>
				<div className='group p-2 rounded-full text-gray-500 hover:text-blue-500 hover:bg-blue-500/20 cursor-pointer transition-colors'>
					<Share className='w-5 h-5' />
				</div>
				<div
					onClick={handleBookmark}
					className={`group flex items-center space-x-1 cursor-pointer transition-colors ${
						isBookmarked ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'
					}`}
				>
					<div
						className={`p-2 rounded-full transition-colors ${
							isBookmarked ? 'bg-blue-500/20' : 'group-hover:bg-blue-500/20'
						}`}
					>
						<Bookmark
							className={`w-5 h-5 transition-colors ${
								isBookmarked ? 'fill-blue-500' : ''
							}`}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

Icons.propTypes = {
	tweetId: PropTypes.number.isRequired,
}

export default Icons
