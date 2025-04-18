import { motion } from 'framer-motion'
import { Bookmark, Flag, Pencil, Share, Trash, X } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const modalVariants = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			type: 'spring',
			damping: 25,
			stiffness: 500,
		},
	},
	exit: {
		opacity: 0,
		scale: 0.9,
		transition: {
			duration: 0.2,
		},
	},
}

const overlayVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.2 } },
	exit: { opacity: 0, transition: { duration: 0.2 } },
}

const PostActionModal = ({
	isOpen,
	onClose,
	postId,
	isOwnPost,
	onDelete,
	onEdit,
}) => {
	const navigate = useNavigate()

	if (!isOpen) return null

	const handleDelete = async () => {
		try {
			// Call the onDelete function passed as prop
			if (onDelete) {
				await onDelete(postId)
			}
			onClose()
		} catch (error) {
			console.error('Error deleting post:', error)
		}
	}

	const handleEdit = () => {
		if (onEdit) {
			onEdit(postId)
		}
		onClose()
	}

	// Close modal when clicking outside
	const handleOverlayClick = e => {
		if (e.target === e.currentTarget) {
			onClose()
		}
	}

	return (
		<motion.div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'
			initial='hidden'
			animate='visible'
			exit='exit'
			variants={overlayVariants}
			onClick={handleOverlayClick}
		>
			<motion.div
				className='bg-black w-80 rounded-2xl border border-gray-800 shadow-xl overflow-hidden'
				variants={modalVariants}
			>
				<div className='flex justify-between items-center p-4 border-b border-gray-800'>
					<h3 className='font-bold text-white'>Post options</h3>
					<button
						onClick={onClose}
						className='p-2 rounded-full hover:bg-gray-800 transition-colors'
					>
						<X className='w-5 h-5 text-white' />
					</button>
				</div>

				<div className='py-2'>
					{isOwnPost && (
						<>
							<button
								onClick={handleDelete}
								className='w-full px-4 py-3 flex items-center text-red-500 hover:bg-gray-900 transition-colors'
							>
								<Trash className='w-5 h-5 mr-3' />
								<span className='text-left font-medium'>Delete</span>
							</button>

							<button
								onClick={handleEdit}
								className='w-full px-4 py-3 flex items-center text-white hover:bg-gray-900 transition-colors'
							>
								<Pencil className='w-5 h-5 mr-3' />
								<span className='text-left font-medium'>Edit post</span>
							</button>
						</>
					)}

					<button className='w-full px-4 py-3 flex items-center text-white hover:bg-gray-900 transition-colors'>
						<Bookmark className='w-5 h-5 mr-3' />
						<span className='text-left font-medium'>Bookmark</span>
					</button>

					<button className='w-full px-4 py-3 flex items-center text-white hover:bg-gray-900 transition-colors'>
						<Share className='w-5 h-5 mr-3' />
						<span className='text-left font-medium'>Share post</span>
					</button>

					{!isOwnPost && (
						<button className='w-full px-4 py-3 flex items-center text-red-500 hover:bg-gray-900 transition-colors'>
							<Flag className='w-5 h-5 mr-3' />
							<span className='text-left font-medium'>Report post</span>
						</button>
					)}
				</div>
			</motion.div>
		</motion.div>
	)
}

export default PostActionModal
