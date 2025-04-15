import {
    Bookmark,
    ChartNoAxesColumn, 
    Heart,
    MessageCircle,
    Repeat,
    Share,
} from 'lucide-react'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Icons = ({ tweetId }) => {
    const [tweetData, setTweetData] = useState({
        like_count: 0,
        retweet_count: 0,
        reply_count: 0,
        view_count: 0
    })
    const [isLiked, setIsLiked] = useState(false)
    const [isRetweeted, setIsRetweeted] = useState(false)
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

            try {
                const response = await fetch(`http://localhost:5000/api/${tweetId}/data`, {
                    credentials: 'include'
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const result = await response.json()
                
                if (result.status === 'success' && result.data) {
                    setTweetData({
                        like_count: result.data.like_count || 0,
                        retweet_count: result.data.retweet_count || 0,
                        reply_count: result.data.reply_count || 0,
                        view_count: result.data.view_count || 0
                    })
                    setIsLiked(result.data.is_liked || false)
                    setIsRetweeted(result.data.is_retweeted || false)
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
                    tweet_id: tweetId
                })
            })

            if (!response.ok) {
                throw new Error('Failed to like tweet')
            }

            const data = await response.json()
            if (data.status === 'success') {
                setIsLiked(!isLiked)
                setTweetData(prev => ({
                    ...prev,
                    like_count: isLiked ? prev.like_count - 1 : prev.like_count + 1
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
            const response = await fetch('http://localhost:5000/api/retweets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    user_id: userId,
                    tweet_id: tweetId
                })
            })

            if (!response.ok) {
                throw new Error('Failed to retweet')
            }

            const data = await response.json()
            if (data.status === 'success') {
                setIsRetweeted(!isRetweeted)
                setTweetData(prev => ({
                    ...prev,
                    retweet_count: isRetweeted ? prev.retweet_count - 1 : prev.retweet_count + 1
                }))
            }
        } catch (error) {
            console.error('Error retweeting:', error)
            alert('Failed to retweet. Please try again.')
        }
    }

    if (isLoading) {
        return <div className="flex justify-center p-4">Loading tweet data...</div>
    }

    if (error) {
        return <div className="text-red-500 p-4">Error: {error}</div>
    }

	return (
		<div className='wrapper flex justify-between'>
			<div className='icons-group flex justify-around w-xs gap-4'>
				{/* Replies */}
				<div className='group flex items-center space-x-1 text-gray-500 hover:text-blue-500 cursor-pointer transition-colors'>
					<div className='p-2 rounded-full group-hover:bg-blue-500/20 transition-colors'>
						<MessageCircle className='w-5 h-5' />
					</div>
					<span>{tweetData.reply_count}</span>
				</div>
	
				{/* Retweets */}
				<div
					onClick={handleRetweet}
					className={`group flex items-center space-x-1 cursor-pointer transition-colors ${
						isRetweeted ? 'text-green-500' : 'text-gray-500 hover:text-green-500'
					}`}
				>
					<div
						className={`p-2 rounded-full transition-colors ${
							isRetweeted ? 'bg-green-500/20' : 'group-hover:bg-green-500/20'
						}`}
					>
						<Repeat className='w-5 h-5' />
					</div>
					<span>{tweetData.retweet_count}</span>
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
					<span>{tweetData.like_count}</span>
				</div>
	
				{/* Views */}
				<div className='group flex items-center space-x-1 text-gray-500 hover:text-blue-500 cursor-pointer transition-colors'>
					<div className='p-2 rounded-full group-hover:bg-blue-500/20 transition-colors'>
						<ChartNoAxesColumn className='w-5 h-5' />
					</div>
					<span>{tweetData.view_count}</span>
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

Icons.propTypes = {
    tweetId: PropTypes.string.isRequired
}

export default Icons