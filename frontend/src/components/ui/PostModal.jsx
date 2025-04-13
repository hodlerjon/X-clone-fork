import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, Image, XCircle, Smile } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react'

const PostModal = ({ isOpen, onClose }) => {
	const [content, setContent] = useState('')
	const [selectedImage, setSelectedImage] = useState(null)
	const [showEmojiPicker, setShowEmojiPicker] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const fileInputRef = useRef(null)
	const MAX_CHARS = 280

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}

		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [isOpen])
	if (!isOpen) return null

	const handleImageUpload = event => {
		const file = event.target.files[0]
		if (file) {
			setSelectedImage(URL.createObjectURL(file))
		}
	}

	const removeImage = () => {
		setSelectedImage(null)
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	const handleEmojiClick = emoji => {
		setContent(prevContent => prevContent + emoji.emoji)
		setShowEmojiPicker(false)
	}

	const handleSubmit = async () => {
		if (!content && !selectedImage) return

		setIsLoading(true)
		const formData = new FormData()
		formData.append('text_content', content)

		if (selectedImage) {
			const imageFile = fileInputRef.current.files[0]
			formData.append('media', imageFile)
		}

		try {
			const response = await fetch('http://localhost:5000/api/tweets', {
				method: 'POST',
				credentials: 'include',
				body: formData,
			})

			if (response.ok) {
				setContent('')
				setSelectedImage(null)
				onClose()
			}
		} catch (error) {
			console.error('Error creating post:', error)
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
				<div
					className='bg-black border border-gray-800 rounded-2xl w-full max-w-xl mx-4
					pointer-events-auto shadow-2xl animate-in fade-in duration-200'
				>
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
								(!content.trim() && !selectedImage) ||
								content.length > MAX_CHARS ||
								isLoading
							}
							className={`
								px-5 py-1.5 rounded-full font-bold text-sm transition-all
								${
									(!content.trim() && !selectedImage) ||
									content.length > MAX_CHARS ||
									isLoading
										? 'bg-blue-500/50 cursor-not-allowed text-gray-300'
										: 'bg-blue-500 hover:bg-blue-600 active:scale-95'
								}
							`}
						>
							{isLoading ? 'Posting...' : 'Post'}
						</button>
					</div>

					{/* Content */}
					<div className='p-4 max-h-[calc(100vh-200px)] overflow-y-auto'>
						<textarea
							placeholder="What's happening?"
							value={content}
							onChange={e => setContent(e.target.value)}
							className='w-full bg-transparent resize-none outline-none text-xl 
								min-h-[150px] placeholder:text-gray-600'
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
									className='absolute top-2 right-2 bg-black/75 rounded-full p-2 
										opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black'
								>
									<XCircle className='h-5 w-5 text-white' />
								</button>
							</div>
						)}
					</div>

					{/* Footer */}
					<div className='border-t border-gray-800/60'>
						<div className='flex items-center justify-between mt-4 pt-4'>
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
							<div className='flex items-center'>
								<span
									className={`
									text-sm font-medium px-3 py-1 rounded-full
									${
										content.length > MAX_CHARS
											? 'text-red-500 bg-red-500/10'
											: content.length > MAX_CHARS * 0.8
											? 'text-yellow-500 bg-yellow-500/10'
											: 'text-gray-400'
									}
								`}
								>
									{content.length}/{MAX_CHARS}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			,
		</>,
		document.body
	)
}

export default PostModal
