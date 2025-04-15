import React from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'

const LogoutModal = ({ isOpen, onClose }) => {
	if (!isOpen) return null

	const handleLogout = async () => {
		try {
			const response = await fetch('http://localhost:5000/api/auth/logout', {
				method: 'POST',
				credentials: 'include',
			})

			if (response.ok) {
				localStorage.removeItem('user')
				window.location.href = '/register'
			}
		} catch (error) {
			console.error('Logout failed:', error)
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
					className='bg-black border border-gray-800 rounded-2xl w-full max-w-sm mx-4 p-8
          pointer-events-auto shadow-2xl animate-in fade-in duration-200'
				>
					<h2 className='textlogin-xl font-bold mb-2'>Log out of X?</h2>
					<p className='text-gray-500 mb-8'>
						You can always log back in at any time.
					</p>

					<div className='space-y-3'>
						<button
							onClick={handleLogout}
							className='w-full bg-white hover:bg-gray-200 text-black font-bold 
                py-3 rounded-full transition-colors'
						>
							Log out
						</button>
						<button
							onClick={onClose}
							className='w-full border border-gray-600 text-white hover:bg-gray-900 
                font-bold py-3 rounded-full transition-colors'
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</>,
		document.body
	)
}

export default LogoutModal
