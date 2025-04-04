import React from 'react'
import Post from '../ui/Post'
import PostInput from '../ui/PostInput'

const FollowContent = () => {
	const posts = [
		{
			id: 1,
			username: 'React Developer',
			handle: '@reactdev',
			time: '3h',
			content:
				'Just launched a new React app! Check out my repository. #ReactJS #WebDev',
			issubscribe: true,
		},
		{
			id: 2,
			username: 'JavaScript News',
			handle: '@jsnews',
			time: '5h',
			content:
				'TypeScript 5.5 is now available with exciting new features. #JavaScript #TypeScript',
			issubscribe: false,
		},
		{
			id: 3,
			username: 'Tech Enthusiast',
			handle: '@techlover',
			time: '7h',
			content:
				'AI is transforming how we build web applications. What are your thoughts on AI in web development? #AI #WebDevelopment',
			issubscribe: false,
		},
	]
	return (
		<div className='flex flex-col'>
			<PostInput />
			{posts
				.filter(post => post.issubscribe)
				.map(post => (
					<Post
						key={post.id}
						username={post.username}
						handle={post.handle}
						time={post.time}
						content={post.content}
					/>
				))}
		</div>
	)
}

export default FollowContent
