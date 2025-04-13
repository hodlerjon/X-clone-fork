import React, { useEffect, useState } from 'react'
import Post from '../ui/Post'
import PostInput from '../ui/PostInput'
const ForYouContent = () => {
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const fetchPosts = async () => {
		try {
			const response = await fetch('http://localhost:5000/api/tweets', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				credentials: 'include',
			})

			if (!response.ok) {
				throw new Error('Failed to fetch posts')
			}

			const data = await response.json()
			setPosts(data.tweets || [])
		} catch (err) {
			setError(err.message)
			console.error('Error fetching posts:', err)
		} finally {
			setLoading(false)
		}
	}

	// Handler for new posts
	const handleNewPost = newPost => {
		if (!newPost || !newPost.id) {
			console.error('Invalid post data:', newPost)
			return
		}

		setPosts(prevPosts => [newPost, ...prevPosts])
	}

	useEffect(() => {
		fetchPosts()
	}, [])

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error: {error}</div>

	return (
		<div className='flex flex-col'>
			<PostInput onPostSuccess={handleNewPost} />
			<div className='space-y-4'>
				{posts?.map(post => (
					<Post
						key={post.id}
						username={post?.user?.username}
						handle={`@${post?.user?.username}`}
						time={new Date(post.created_at).toLocaleString()}
						content={post.text_content}
						media={post.media_content}
						avatar={post?.user?.profile_image_url}
					/>
				))}
			</div>
		</div>
	)
}

export default ForYouContent
