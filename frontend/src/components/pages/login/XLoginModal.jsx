import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function XLoginModal({ onClose }) {
	const navigate = useNavigate()
	// Add at the top of the component with other state
	const [error, setError] = useState(null)
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
	})

	const handleSubmit = async e => {
		e.preventDefault()
		setError(null)

		try {
			const response = await fetch('http://localhost:5000/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(formData),
			})

			const data = await response.json()
			if (data.status === 'success') {
				// Store complete user data
				const userData = {
					...data.user,
					isAuthenticated: true,
					lastLogin: new Date().toISOString(),
				}
				localStorage.setItem('user', JSON.stringify(userData))

				onClose()
				navigate('/', { replace: true })
			} else {
				setError(data.message || 'Ошибка входа')
			}
		} catch (error) {
			console.error('Login error:', error)
			setError('Произошла ошибка при входе. Попробуйте позже.')
		}
	}

	return (
		<div className='fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50'>
			<div className='bg-black border border-gray-700 rounded-2xl p-8 max-w-md w-full'>
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-xl font-bold'>Войти</h2>
					<button
						onClick={onClose}
						className='text-gray-500 hover:text-gray-400'
					>
						<svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
							<path d='M18.3 5.71a.996.996 0 00-1.41 0L12 10.59 7.11 5.7A.996.996 0 105.7 7.11L10.59 12 5.7 16.89a.996.996 0 101.41 1.41L12 13.41l4.89 4.89a.996.996 0 101.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z' />
						</svg>
					</button>
				</div>

				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<input
							type='text'
							placeholder='Username'
							className='w-full bg-black border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:border-blue-500'
							value={formData.username}
							onChange={e =>
								setFormData({ ...formData, username: e.target.value })
							}
						/>
					</div>
					<div>
						<input
							type='email'
							placeholder='Email'
							className='w-full bg-black border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:border-blue-500'
							value={formData.email}
							onChange={e =>
								setFormData({ ...formData, email: e.target.value })
							}
						/>
					</div>
					<div>
						<input
							type='password'
							placeholder='Пароль'
							className='w-full bg-black border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:border-blue-500'
							value={formData.password}
							onChange={e =>
								setFormData({ ...formData, password: e.target.value })
							}
						/>
					</div>
					{error && <p className='text-red-500 text-sm'>{error}</p>}
					<button
						type='submit'
						className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-full transition-colors'
					>
						Войти
					</button>
				</form>

				<p className='text-sm text-gray-500 mt-4 text-center'>
					Нет аккаунта?{' '}
					<button onClick={onClose} className='text-blue-500 hover:underline'>
						Зарегистрироваться
					</button>
				</p>
			</div>
		</div>
	)
}

export default XLoginModal
// {"data":{"message":"successfully logged in","status":"success","user":{"email":"shukrulloqurbonov342@gmail.com","full_name":"shukrullo","profile_image_url":"","user_id":"5v7qil2i0j9","username":"shadowmonarch702"}}}
