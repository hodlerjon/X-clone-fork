import React, { useRef, useState } from 'react'
import { CiFaceSmile, CiImageOn } from 'react-icons/ci'
import { HiOutlineGif } from 'react-icons/hi2'
import { IoCloseOutline } from 'react-icons/io5'
import EmojiPicker from 'emoji-picker-react'

const PostInput = () => {
	const [content, setContent] = useState('')
	const [selectedImage, setSelectedImage] = useState(null)
	const [showEmojis, setShowEmojis] = useState(false)
	const fileInputRef = useRef(null)

	const handleChange = e => {
		setContent(e.target.value)
	}

	const handleEmojiClick = emojiObject => {
		setContent(prevContent => prevContent + emojiObject.emoji)
		setShowEmojis(false)
	}

	const toggleEmojiPicker = () => {
		setShowEmojis(!showEmojis)
	}

	const handleImageClick = () => {
		fileInputRef.current.click()
	}

	const handleImageChange = e => {
		const file = e.target.files[0]
		if (file && file.type.startsWith('image/')) {
			setSelectedImage(URL.createObjectURL(file))
		}
	}

	const removeImage = () => {
		setSelectedImage(null)
	}

	const isDisabled = content.trim().length === 0 && !selectedImage

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
					/>

					{selectedImage && (
						<div className='relative mt-2'>
							<img
								src={selectedImage}
								alt='Selected'
								className='rounded-2xl max-h-80 object-contain'
							/>
							<button
								onClick={removeImage}
								className='absolute top-2 left-2 p-1 rounded-full bg-black/50 hover:bg-black/70 text-white'
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
								<div className='absolute  left-0 z-10'>
									<EmojiPicker
										onEmojiClick={handleEmojiClick}
										theme='dark'
										width={320}
										height={400}
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
							disabled={isDisabled}
							className={`px-4 py-2 rounded-full font-bold transition-colors
                ${
									isDisabled
										? 'bg-gray-500 text-black '
										: 'bg-white text-black cursor-not-allowed'
								}`}
						>
							Post
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PostInput
