import EmojiPicker from 'emoji-picker-react'
import { Image, Smile, X, XCircle } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const PostModal = ({ isOpen, onClose, onPostCreated }) => {
	const [selectedImage, setSelectedImage] = useState(null)
	const [showEmojiPicker, setShowEmojiPicker] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const fileInputRef = useRef(null)
	const MAX_CHARS = 280

	// const getUserFromStorage = () => {
	// 	const user = localStorage.getItem('user')
	// 	try {
	// 		return user ? JSON.parse(user).user_id : null
	// 	} catch (error) {
	// 		console.error('Error parsing user:', error)
	// 		return null
	// 	}
	// }
	const user_id = JSON.parse(localStorage.getItem('user')).user_id

	const [postData, setPostData] = useState({
		content: '',
		selectedImage: null,
		user_id: user_id,
	})

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : 'auto'
		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [isOpen])

	// Cleanup object URL when modal closes or image changes
	useEffect(() => {
		return () => {
			if (selectedImage) {
				URL.revokeObjectURL(selectedImage)
			}
		}
	}, [selectedImage])

	if (!isOpen) return null

	const handleImageUpload = event => {
		const file = event.target.files[0]
		if (file) {
			const imageUrl = URL.createObjectURL(file) // Temporary preview URL
			setSelectedImage(imageUrl)
			setPostData(prev => ({ ...prev, selectedImage: imageUrl }))
		}
	}

	const removeImage = () => {
		setSelectedImage(null)
		setPostData(prev => ({ ...prev, selectedImage: null }))
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	const handleEmojiClick = emoji => {
		// emoji = { emoji: "😊", ... }
		setPostData(prev => ({
			...prev,
			content: prev.content + emoji.emoji,
		}))
		setShowEmojiPicker(false)
	}
	console.log(postData.user_id)

	const handleSubmit = async e => {
		e.preventDefault()
		if (!postData.content.trim() && !postData.selectedImage) return

		setIsLoading(true)
		try {
			const formData = new FormData()
			formData.append('content', postData.content)
			formData.append('user_id', postData.user_id)

			// Fetch blob from preview URL and create a file
			if (postData.selectedImage) {
				const res = await fetch(postData.selectedImage)
				const blob = await res.blob()
				const imageFile = new File([blob], 'tweet_image.jpg', {
					type: 'image/jpeg',
				})
				formData.append('image', imageFile)
			}

			const response = await fetch('http://localhost:5000/api/tweets', {
				method: 'POST',
				body: formData,
				credentials: 'include',
			})

			const data = await response.json()

			if (response.ok) {
				setPostData({
					content: '',
					selectedImage: null,
					user_id: postData.user_id,
				})
				setSelectedImage(null)
				onClose()
				onPostCreated(data.tweet)
			} else {
				throw new Error(data.message || 'Error posting tweet')
			}
		} catch (error) {
			console.error('Error submitting post:', error)
		} finally {
			setIsLoading(false)
		}
	}

	return createPortal(
		<>
			{/* Overlay */}
			<div
				className='fixed inset-0 bg-black/70 backdrop-blur-sm z-[999]'
				onClick={onClose}
			/>

			{/* Modal */}
			<div className='fixed inset-0 flex items-center justify-center z-[1000]'>
				<div className='bg-black border border-gray-800 rounded-2xl w-full max-w-xl mx-4 shadow-2xl animate-in fade-in duration-200'>
					{/* Header */}
					<div className='flex items-center justify-between p-4 border-b border-gray-800/60'>
						<button
							onClick={onClose}
							className='rounded-full p-2 hover:bg-gray-800/60 transition-colors'
						>
							<X className='h-5 w-5 text-gray-400' />
						</button>
						<button
							onClick={handleSubmit}
							disabled={
								(!postData.content.trim() && !postData.selectedImage) ||
								postData.content.length > MAX_CHARS ||
								isLoading
							}
							className={`px-5 py-1.5 rounded-full font-bold text-sm transition-all ${
								(!postData.content.trim() && !postData.selectedImage) ||
								postData.content.length > MAX_CHARS ||
								isLoading
									? 'bg-blue-500/50 cursor-not-allowed text-gray-300'
									: 'bg-blue-500 hover:bg-blue-600 active:scale-95'
							}`}
						>
							{isLoading ? 'Posting...' : 'Post'}
						</button>
					</div>

					{/* Content */}
					<div className='p-4 max-h-[calc(100vh-200px)] overflow-y-auto'>
						<textarea
							placeholder="What's happening?"
							value={postData.content}
							onChange={e =>
								setPostData(prev => ({ ...prev, content: e.target.value }))
							}
							className='w-full bg-transparent resize-none outline-none text-xl min-h-[150px] placeholder:text-gray-600'
							maxLength={MAX_CHARS}
							autoFocus
						/>

						{/* Image Preview */}
						{selectedImage && (
							<div className='relative mt-2 group'>
								<img
									src={selectedImage}
									alt='Selected'
									className='rounded-2xl max-h-[400px] w-full object-cover'
								/>
								<button
									onClick={removeImage}
									className='absolute top-2 right-2 bg-black/75 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black'
								>
									<XCircle className='h-5 w-5 text-white' />
								</button>
							</div>
						)}
					</div>

					{/* Footer */}
					<div className='border-t border-gray-800/60'>
						<div className='flex items-center justify-between mt-4 pt-4 px-4 pb-4'>
							<div className='flex items-center gap-4'>
								<input
									type='file'
									hidden
									ref={fileInputRef}
									onChange={handleImageUpload}
									accept='image/*'
								/>
								<button
									onClick={() => fileInputRef.current?.click()}
									className='p-2 rounded-full hover:bg-blue-500/20 transition-colors'
								>
									<Image className='h-5 w-5 text-blue-500' />
								</button>
								<div className='relative'>
									<button
										onClick={() => setShowEmojiPicker(!showEmojiPicker)}
										className='p-2 rounded-full hover:bg-blue-500/20 transition-colors'
									>
										<Smile className='h-5 w-5 text-blue-500' />
									</button>
									{showEmojiPicker && (
										<div className='absolute bottom-12 left-0 z-50 shadow-xl rounded-xl'>
											<EmojiPicker
												onEmojiClick={handleEmojiClick}
												theme='dark'
											/>
										</div>
									)}
								</div>
							</div>
							<div className='text-sm font-medium px-3 py-1 rounded-full'>
								<span
									className={`${
										postData.content.length > MAX_CHARS
											? 'text-red-500 bg-red-500/10'
											: postData.content.length > MAX_CHARS * 0.8
											? 'text-yellow-500 bg-yellow-500/10'
											: 'text-gray-400'
									}`}
								>
									{postData.content.length}/{MAX_CHARS}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>,
		document.body
	)
}

export default PostModal
