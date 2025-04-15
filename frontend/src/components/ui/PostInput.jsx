import EmojiPicker from 'emoji-picker-react'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { CiFaceSmile, CiImageOn } from 'react-icons/ci'
import { HiOutlineGif } from 'react-icons/hi2'
import { IoCloseOutline } from 'react-icons/io5'

const getUserFromStorage = () => {
  try {
    const userStr = localStorage.getItem('user')
    if (!userStr) return null
    const parsed = JSON.parse(userStr)
    return parsed?.user_id || null
  } catch {
    return null
  }
}

const PostInput = ({ onPostSuccess }) => {
	const [postData, setPostData] = useState({
		content: '',
		selectedImage: null,
		user_id: getUserFromStorage(),
	})
	const [showEmojis, setShowEmojis] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const fileInputRef = useRef(null)
	const emojiPickerRef = useRef(null)

	// Close emoji picker when clicking outside
	useEffect(() => {
		const handleClickOutside = event => {
			if (
				emojiPickerRef.current &&
				!emojiPickerRef.current.contains(event.target)
			) {
				setShowEmojis(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])
	const handleChange = e => {
		const text = e.target.value
		if (text.length <= 280) {
			setPostData(prev => ({
				...prev,
				content: text,
			}))
		}
	}

	const handleEmojiClick = emojiObject => {
		if (postData.content.length + emojiObject.emoji.length <= 280) {
			setPostData(prev => ({
				...prev,
				content: prev.content + emojiObject.emoji,
			}))
		}
	}

	const toggleEmojiPicker = () => {
		setShowEmojis(!showEmojis)
	}

	const handleImageClick = () => {
		fileInputRef.current.click()
	}

	const handleImageChange = e => {
		const file = e.target.files[0]
		const MAX_SIZE = 5 * 1024 * 1024 // 5MB

		if (!file) return

		if (file.size > MAX_SIZE) {
			alert('Image size should be less than 5MB')
			return
		}

		if (!file.type.startsWith('image/')) {
			alert('Please select an image file')
			return
		}

		const reader = new FileReader()
		reader.onloadend = () => {
			setPostData(prev => ({
				...prev,
				selectedImage: reader.result,
			}))
		}
		reader.readAsDataURL(file)
	}

	const removeImage = () => {
		setPostData(prev => ({
			...prev,
			selectedImage: null,
		}))
	}

	const isDisabled =
		postData.content.trim().length === 0 && !postData.selectedImage

	const handlePost = async e => {
		e.preventDefault()
		if (!postData.user_id) {
			alert('Please log in to post')
			return
		}
		setIsLoading(true)

		try {
			const formDataToSend = new FormData()
			formDataToSend.append('user_id', postData.user_id)
			formDataToSend.append('content', postData.content)

			if (postData.selectedImage) {
				const response = await fetch(postData.selectedImage)
				const blob = await response.blob()
				const imageFile = new File([blob], 'tweet_image.jpg', {
					type: 'image/jpeg',
				})
				formDataToSend.append('image', imageFile)
			}

			const response = await fetch('http://localhost:5000/api/tweets', {
				method: 'POST',
				body: formDataToSend,
				credentials: 'include',
			})

			const data = await response.json()

			if (response.ok) {
				const newPost = data.tweet
				setPostData({
					content: '',
					selectedImage: null,
					user_id: postData.user_id,
				})
				// Pass the complete post data to the parent
				onPostSuccess(newPost)
			} else {
				throw new Error(data.message || 'Error posting tweet')
			}
		} catch (error) {
			console.error('Error posting tweet:', error)
			alert(error.message || 'Network error occurred. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='p-4 border-b border-gray-800'>
			<div className='flex space-x-4'>
				<div className='w-12 h-12 rounded-full bg-gray-700 flex justify-center items-center'>
					<span className='font-bold text-xl'>
						{JSON.parse(localStorage.getItem('user')).full_name.slice(0, 1)}
					</span>
				</div>
				<div className='flex-1'>
					<textarea
						value={postData.content}
						onChange={handleChange}
						className='w-full bg-transparent text-white text-xl p-2 outline-none'
						placeholder="What's happening?"
						maxLength={280}
					/>

					{/* Character count */}
					<div className='text-sm text-gray-500 text-right'>
						{postData.content.length}/280
					</div>

					{postData.selectedImage && (
						<div className='relative mt-2'>
							<img
								src={postData.selectedImage}
								alt='Selected'
								className='rounded-2xl max-h-80 object-cover w-full'
							/>
							<button
								onClick={removeImage}
								className='absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors'
								aria-label="Remove image"
							>
								<IoCloseOutline size={20} />
							</button>
						</div>
					)}

					<div className='flex justify-between mt-2 items-center relative'>
						<div className='flex space-x-2 text-blue-500'>
							<input
								type='file'
								ref={fileInputRef}
								onChange={handleImageChange}
								accept='image/*'
								className='hidden'
							/>
							<div
								className='group flex items-center space-x-1 text-blue-400 hover:text-blue-500 cursor-pointer transition-colors'
								onClick={handleImageClick}
							>
								<div className='p-2 rounded-full group-hover:bg-blue-500/20 transition-colors'>
									<CiImageOn fontSize={20} />
								</div>
							</div>

							<div
								className='group flex items-center space-x-1 text-blue-400 hover:text-blue-500 cursor-pointer transition-colors'
								onClick={toggleEmojiPicker}
							>
								<div className='p-2 rounded-full group-hover:bg-blue-500/20 transition-colors'>
									<CiFaceSmile fontSize={20} />
								</div>
							</div>

							{showEmojis && (
								<div ref={emojiPickerRef} className='absolute  left-0 z-10'>
									<EmojiPicker
										onEmojiClick={handleEmojiClick}
										theme='dark'
										width={320}
										height={400}
										searchDisabled
										skinTonesDisabled
										previewConfig={{ showPreview: false }}
									/>
								</div>
							)}

							<div className='group flex items-center space-x-1 text-blue-400 hover:text-blue-500 cursor-pointer transition-colors'>
								<div className='p-2 rounded-full group-hover:bg-blue-500/20 transition-colors'>
									<HiOutlineGif fontSize={20} />
								</div>
							</div>
						</div>
						<button
							onClick={handlePost}
							disabled={isDisabled || isLoading}
							className={`px-4 py-2 rounded-full font-bold transition-colors
        ${
					isDisabled || isLoading
						? 'bg-gray-400 text-black cursor-not-allowed'
						: 'bg-blue-500 text-white hover:bg-blue-600'
				}`}
						>
							{isLoading ? (
								<span className='flex items-center'>
									<svg
										className='animate-spin h-5 w-5 mr-2'
										viewBox='0 0 24 24'
									>
										<circle
											className='opacity-25'
											cx='12'
											cy='12'
											r='10'
											stroke='currentColor'
											strokeWidth='4'
											fill='none'
										/>
										<path
											className='opacity-75'
											fill='currentColor'
											d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
										/>
									</svg>
									Posting...
								</span>
							) : (
								'Post'
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

PostInput.propTypes = {
	onPostSuccess: PropTypes.func.isRequired,
}

export default PostInput
