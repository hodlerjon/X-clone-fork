import { useState } from 'react'
import {
	FaBookmark,
	FaEllipsisH,
	FaHeart,
	FaRegBookmark,
	FaRegComment,
	FaRegHeart,
	FaRegShareSquare,
	FaRetweet,
} from 'react-icons/fa'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const PostCommentPage = ({ postId }) => {
	const [liked, setLiked] = useState(false)
	const [bookmarked, setBookmarked] = useState(false)
	const [commentText, setCommentText] = useState('')

	const handleSubmitComment = e => {
		e.preventDefault()
		if (commentText.trim()) {
			// Add comment logic here
			console.log('Comment submitted:', commentText)
			setCommentText('')
		}
	}

	return (
		<div className='max-w-2xl mx-auto border-x border-gray-700 min-h-screen w-[600px] bg-black text-white'>
			{/* Header */}
			<div className='sticky top-0 z-10 bg-black bg-opacity-70 backdrop-blur-sm p-4 border-b border-gray-700 flex items-center'>
				<Link to='/' className='mr-6 rounded-full p-2 hover:bg-gray-800'>
					<FiArrowLeft className='text-lg' />
				</Link>
				<p className='font-bold text-xl'>Post</p>
			</div>

			{/* Main Post */}
			<div className='p-4 border-b border-gray-700'>
				<div className='flex'>
					<div className='mr-3'>
						<div className='w-12 h-12 rounded-full bg-gray-700'></div>
					</div>
					<div className='flex-1'>
						<div className='flex items-center mb-1'>
							<span className='font-bold mr-1'>John Doe</span>
							<span className='text-gray-400 mr-1'>@johndoe</span>
							<span className='text-gray-400'>· 2h</span>
							<button className='ml-auto text-gray-400 hover:text-gray-200'>
								<FaEllipsisH />
							</button>
						</div>
						<p className='mb-3'>
							Just launched our new product! Check it out at example.com
							#excited #launch
						</p>
						<div className='mb-3 rounded-2xl border border-gray-700 overflow-hidden'>
							<div className='h-64 bg-gray-800 flex items-center justify-center'>
								<span className='text-gray-400'>Preview of shared content</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Interaction Buttons */}
			<div className='flex justify-between px-4 py-3 border-b border-gray-700'>
				<button className='flex items-center text-gray-400 group'>
					<div className='p-2 rounded-full group-hover:bg-blue-900 group-hover:bg-opacity-20 group-hover:text-blue-400'>
						<FaRegComment className='text-lg' />
					</div>
					<span className='ml-1 text-sm group-hover:text-blue-400'>24</span>
				</button>

				<button className='flex items-center text-gray-400 group'>
					<div className='p-2 rounded-full group-hover:bg-green-900 group-hover:bg-opacity-20 group-hover:text-green-400'>
						<FaRetweet className='text-lg' />
					</div>
					<span className='ml-1 text-sm group-hover:text-green-400'>12</span>
				</button>

				<button
					className='flex items-center text-gray-400 group'
					onClick={() => setLiked(!liked)}
				>
					<div className='p-2 rounded-full group-hover:bg-pink-900 group-hover:bg-opacity-20 group-hover:text-pink-400'>
						{liked ? (
							<FaHeart className='text-lg text-pink-500' />
						) : (
							<FaRegHeart className='text-lg' />
						)}
					</div>
					<span
						className={`ml-1 text-sm group-hover:text-pink-400 ${
							liked ? 'text-pink-500' : ''
						}`}
					>
						156
					</span>
				</button>

				<button
					className='flex items-center text-gray-400 group'
					onClick={() => setBookmarked(!bookmarked)}
				>
					<div className='p-2 rounded-full group-hover:bg-blue-900 group-hover:bg-opacity-20 group-hover:text-blue-400'>
						{bookmarked ? (
							<FaBookmark className='text-lg text-blue-500' />
						) : (
							<FaRegBookmark className='text-lg' />
						)}
					</div>
				</button>

				<button className='flex items-center text-gray-400 group'>
					<div className='p-2 rounded-full group-hover:bg-blue-900 group-hover:bg-opacity-20 group-hover:text-blue-400'>
						<FaRegShareSquare className='text-lg' />
					</div>
				</button>
			</div>

			{/* Comment Input */}
			<div className='p-4 border-b border-gray-700'>
				<div className='flex'>
					<div className='mr-3'>
						<div className='w-12 h-12 rounded-full bg-gray-700'></div>
					</div>
					<div className='flex-1'>
						<form onSubmit={handleSubmitComment}>
							<textarea
								className='w-full bg-transparent outline-none resize-none text-xl placeholder-gray-500 mb-3'
								placeholder='Post your reply'
								rows='2'
								value={commentText}
								onChange={e => setCommentText(e.target.value)}
							/>
							<div className='flex justify-end'>
								<button
									type='submit'
									disabled={!commentText.trim()}
									className={`px-4 py-2 rounded-full font-bold ${
										commentText.trim()
											? 'bg-blue-500 text-white hover:bg-blue-600'
											: 'bg-blue-800 text-gray-300 opacity-50 cursor-not-allowed'
									}`}
								>
									Reply
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>

			{/* Comments List */}
			<div>
				<div className='p-4 border-b border-gray-700 hover:bg-gray-900 transition'>
					<div className='flex'>
						<div className='mr-3'>
							<div className='w-12 h-12 rounded-full bg-gray-600'></div>
						</div>
						<div className='flex-1'>
							<div className='flex items-center mb-1'>
								<span className='font-bold mr-1'>Jane Smith</span>
								<span className='text-gray-400 mr-1'>@janesmith</span>
								<span className='text-gray-400'>· 1h</span>
								<button className='ml-auto text-gray-400 hover:text-gray-200'>
									<FaEllipsisH />
								</button>
							</div>
							<p className='mb-2'>
								This looks amazing! Congratulations on the launch 🎉
							</p>
							<div className='flex text-gray-400 text-sm'>
								<button className='flex items-center mr-4 hover:text-blue-400'>
									<FaRegComment className='mr-1' /> 2
								</button>
								<button className='flex items-center mr-4 hover:text-green-400'>
									<FaRetweet className='mr-1' /> 1
								</button>
								<button className='flex items-center hover:text-pink-400'>
									<FaRegHeart className='mr-1' /> 5
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className='p-4 border-b border-gray-700 hover:bg-gray-900 transition'>
					<div className='flex'>
						<div className='mr-3'>
							<div className='w-12 h-12 rounded-full bg-gray-600'></div>
						</div>
						<div className='flex-1'>
							<div className='flex items-center mb-1'>
								<span className='font-bold mr-1'>Alex Johnson</span>
								<span className='text-gray-400 mr-1'>@alexj</span>
								<span className='text-gray-400'>· 45m</span>
								<button className='ml-auto text-gray-400 hover:text-gray-200'>
									<FaEllipsisH />
								</button>
							</div>
							<p className='mb-2'>
								How does this compare to your previous version?
							</p>
							<div className='flex text-gray-400 text-sm'>
								<button className='flex items-center mr-4 hover:text-blue-400'>
									<FaRegComment className='mr-1' /> 0
								</button>
								<button className='flex items-center mr-4 hover:text-green-400'>
									<FaRetweet className='mr-1' /> 0
								</button>
								<button className='flex items-center hover:text-pink-400'>
									<FaRegHeart className='mr-1' /> 1
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PostCommentPage
