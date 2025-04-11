import EmojiPicker from 'emoji-picker-react'
import React, { useEffect, useRef, useState } from 'react'
import { CiFaceSmile, CiImageOn } from 'react-icons/ci'
import { HiOutlineGif } from 'react-icons/hi2'
import { IoCloseOutline } from 'react-icons/io5'

const PostInput = () => {
	const [content, setContent] = useState('')
	const [selectedImage, setSelectedImage] = useState(null)
	const [showEmojis, setShowEmojis] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const fileInputRef = useRef(null)
	const emojiPickerRef = useRef(null)
	const [formData, setFormData] = useState({
		user_id: Math.random().toString(36).substring(2, 15),
		content: '',
		selectedImage: '',
	})

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
			setContent(text)
			setFormData(prev => ({
				...prev,
				content: text,
			}))
		}
	}

	const handleEmojiClick = emojiObject => {
		if (content.length + emojiObject.emoji.length <= 280) {
			setContent(prevContent => prevContent + emojiObject.emoji)
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
		if (file) {
			if (file.size > 5 * 1024 * 1024) {
				// 5MB limit
				alert('Image size should be less than 5MB')
				return
			}
			if (file.type.startsWith('image/')) {
				const reader = new FileReader()
				reader.onloadend = () => {
					setSelectedImage(reader.result)
					setFormData(prev => ({
						...prev,
						selectedImage: reader.result,
					}))
				}
				reader.readAsDataURL(file)
			} else {
				alert('Please select an image file')
			}
		}
	}

	const removeImage = () => {
		setSelectedImage(null)
	}

	const isDisabled = content.trim().length === 0 && !selectedImage

	const handlePost = async e => {
		e.preventDefault()
		setIsLoading(true)

		try {
			const formDataToSend = new FormData()
			formDataToSend.append('user_id', formData.user_id)
			formDataToSend.append('content', content) // Используем content напрямую

			if (selectedImage) {
				const response = await fetch(selectedImage)
				const blob = await response.blob()
				const imageFile = new File([blob], 'tweet_image.jpg', {
					type: 'image/jpeg',
				})
				formDataToSend.append('image', imageFile)
			}

			const response = await fetch('http://localhost:5000/api/tweets', {
				method: 'POST',
				// Удаляем JSON.stringify и отправляем FormData напрямую
				body: formDataToSend,
			})

			const data = await response.json()
			if (data.status === 'success') {
				setContent('')
				setSelectedImage(null)
				setFormData({
					user_id: Math.random().toString(36).substring(2, 15),
					content: '',
					selectedImage: '',
				})
				alert('Tweet posted successfully!')
			} else {
				alert(data.message || 'Error posting tweet')
			}
		} catch (error) {
			console.error('Error posting data:', error)
			alert('Network error occurred. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='p-4 border-b border-gray-800'>
			<div className='flex space-x-4'>
				<div className='w-12 h-12 rounded-full bg-gray-700 flex justify-center items-center'>
					<span className='font-bold text-xl'>S</span>
				</div>
				<div className='flex-1'>
					<textarea
						value={content}
						onChange={handleChange}
						className='w-full bg-transparent text-white text-xl p-2 outline-none'
						placeholder="What's happening?"
						maxLength={280}
					/>

					{/* Character count */}
					<div className='text-sm text-gray-500 text-right'>
						{content.length}/280
					</div>

					{selectedImage && (
						<div className='relative mt-2'>
							<img
								src={selectedImage}
								alt='Selected'
								className='rounded-2xl max-h-80 object-cover w-full'
							/>
							<button
								onClick={removeImage}
								className='absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors'
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
										: 'bg-white text-black  hover:bg-blue-600'
								}`}
						>
							{isLoading ? 'Posting...' : 'Post'}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PostInput
