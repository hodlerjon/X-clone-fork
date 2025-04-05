import React from 'react'
import {
	Settings,
	MoreHorizontal,
	MessageCircle,
	Repeat2,
	Heart,
	Share,
} from 'lucide-react'

const Bookmarks = () => {
	const bookmarks = [
		{
			id: 1,
			author: {
				name: 'John Doe',
				handle: '@johndoe',
				avatar: '',
			},
			content:
				'Just learned something new about React hooks! 🚀 #reactjs #webdev',
			timestamp: '2h',
			stats: {
				replies: 5,
				reposts: 12,
				likes: 28,
			},
			image: null,
		},
		// Add more bookmarks as needed
	]

	return (
		<div className='min-h-screen border-x border-gray-800 w-[600px]'>
			{/* Header */}
			<div className='sticky top-0 bg-black/80 backdrop-blur-md z-10 px-4 py-2 flex items-center justify-between'>
				<div>
					<h2 className='font-bold text-xl'>Bookmarks</h2>
					<p className='text-gray-500 text-sm'>@ShukrulloQ36672</p>
				</div>
				<button className='p-2 hover:bg-gray-900 rounded-full'>
					<Settings className='w-5 h-5' />
				</button>
			</div>

			{/* Bookmarks List */}
			{bookmarks.length > 0 ? (
				<div>
					{bookmarks.map(bookmark => (
						<div
							key={bookmark.id}
							className='p-4 border-b border-gray-800 hover:bg-gray-900/50 cursor-pointer transition-colors'
						>
							<div className='flex gap-3'>
								{/* Author Avatar */}
								<div className='w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center'>
									{bookmark.author.avatar ? (
										<img
											src={bookmark.author.avatar}
											alt={bookmark.author.name}
											className='w-full h-full rounded-full object-cover'
										/>
									) : (
										<span className='text-xl font-bold'>
											{bookmark.author.name.charAt(0)}
										</span>
									)}
								</div>

								{/* Post Content */}
								<div className='flex-1'>
									{/* Author Info */}
									<div className='flex items-center justify-between'>
										<div className='flex items-center gap-2'>
											<span className='font-bold hover:underline'>
												{bookmark.author.name}
											</span>
											<span className='text-gray-500'>
												{bookmark.author.handle}
											</span>
											<span className='text-gray-500'>·</span>
											<span className='text-gray-500'>
												{bookmark.timestamp}
											</span>
										</div>
										<button className='p-2 hover:bg-blue-500/20 rounded-full group'>
											<MoreHorizontal className='w-5 h-5 group-hover:text-blue-500' />
										</button>
									</div>

									{/* Post Text */}
									<p className='mt-2 text-[15px]'>{bookmark.content}</p>

									{/* Post Image */}
									{bookmark.image && (
										<img
											src={bookmark.image}
											alt='Post content'
											className='mt-3 rounded-xl border border-gray-800 max-h-[500px] object-cover w-full'
										/>
									)}

									{/* Interaction Buttons */}
									<div className='flex justify-between mt-3 max-w-[425px]'>
										<button className='group flex items-center gap-1 text-gray-500'>
											<div className='p-2 rounded-full group-hover:bg-blue-500/20'>
												<MessageCircle className='w-5 h-5 group-hover:text-blue-500' />
											</div>
											<span>{bookmark.stats.replies}</span>
										</button>
										<button className='group flex items-center gap-1 text-gray-500'>
											<div className='p-2 rounded-full group-hover:bg-green-500/20'>
												<Repeat2 className='w-5 h-5 group-hover:text-green-500' />
											</div>
											<span>{bookmark.stats.reposts}</span>
										</button>
										<button className='group flex items-center gap-1 text-gray-500'>
											<div className='p-2 rounded-full group-hover:bg-pink-500/20'>
												<Heart className='w-5 h-5 group-hover:text-pink-500' />
											</div>
											<span>{bookmark.stats.likes}</span>
										</button>
										<button className='group flex items-center gap-1 text-gray-500'>
											<div className='p-2 rounded-full group-hover:bg-blue-500/20'>
												<Share className='w-5 h-5 group-hover:text-blue-500' />
											</div>
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				// Empty State
				<div className='flex flex-col items-center justify-center p-8 text-center'>
					<h3 className='text-3xl font-bold mb-2'>Save Posts for later</h3>
					<p className='text-gray-500 mb-4'>
						Don't let the good ones fly away! Bookmark Posts to easily find them
						again in the future.
					</p>
				</div>
			)}
		</div>
	)
}

export default Bookmarks
