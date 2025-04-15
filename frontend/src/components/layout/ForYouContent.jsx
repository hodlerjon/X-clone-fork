import React from 'react'
import Post from '../ui/Post'
import PostInput from '../ui/PostInput'
import Spinner from '../ui/Spinner'

const ForYouContent = ({ posts, loading, error, onPostCreated }) => {
	if (error) return <div className='text-red-500 p-4 text-center'>{error}</div>

	return (
		<div className='flex flex-col'>
			<PostInput onPostSuccess={onPostCreated} />
			{loading && (
				<div className='flex justify-center items-center h-screen'>
					<Spinner />
				</div>
			)}
			<div className='space-y-4'>
				{posts?.map(post => (
					<Post
						key={post.id}
						id={post.id}
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
