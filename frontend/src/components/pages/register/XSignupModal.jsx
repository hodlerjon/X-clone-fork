import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function XSignupModal({ onClose }) {
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		full_name: '',
		bio: '',
		user_id: Math.random().toString(36).substring(2, 15),
		profile_image_url: '',
	})
	const [error, setError] = useState('')

	const handleSubmit = async e => {
		e.preventDefault()
		setError('')

		try {
			const response = await fetch('http://localhost:5000/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json', // Добавляем Accept header
				},
				credentials: 'include', // Добавляем поддержку куки
				body: JSON.stringify(formData),
			})

			const data = await response.json()
			console.log('Response data:', data) // Добавляем лог ответа
			if (data.status === 'success') {
				localStorage.setItem(
					'user',
					JSON.stringify({
						username: formData.username,
						email: formData.email,
						isAuthenticated: true,
						user_id: formData.user_id,
					})
				)
				console.log('Registration successful:', data) // Добавляем лог
				onClose()
				navigate('/')
			} else {
				console.error('Registration failed:', data) // Добавляем лог ошибки
				setError(data.message || 'Registration failed')
			}
		} catch (err) {
			console.error('Network error:', err) // Добавляем детальный лог ошибки
			setError('Something went wrong. Please try again.')
		}
	}

	return (
		<div className='fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50'>
			<div className='bg-black/80 border border-gray-700 rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl'>
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-xl font-bold text-white'>Создать аккаунт</h2>
					<button onClick={onClose} className='text-gray-400 hover:text-white'>
						✕
					</button>
				</div>

				{error && (
					<div className='mb-4 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-500'>
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<input
							type='text'
							placeholder='Username'
							className='w-full bg-black border border-gray-700 rounded-md p-3 text-white focus:border-blue-500 focus:outline-none'
							value={formData.username}
							onChange={e =>
								setFormData({ ...formData, username: e.target.value })
							}
						/>
					</div>

					<div>
						<input
							type='text'
							placeholder='Full Name'
							className='w-full bg-black border border-gray-700 rounded-md p-3 text-white focus:border-blue-500 focus:outline-none'
							value={formData.full_name}
							onChange={e =>
								setFormData({ ...formData, full_name: e.target.value })
							}
						/>
					</div>

					<div>
						<input
							type='email'
							placeholder='Email'
							className='w-full bg-black border border-gray-700 rounded-md p-3 text-white focus:border-blue-500 focus:outline-none'
							value={formData.email}
							onChange={e =>
								setFormData({ ...formData, email: e.target.value })
							}
						/>
					</div>

					<div>
						<input
							type='password'
							placeholder='Password'
							className='w-full bg-black border border-gray-700 rounded-md p-3 text-white focus:border-blue-500 focus:outline-none'
							value={formData.password}
							onChange={e =>
								setFormData({ ...formData, password: e.target.value })
							}
						/>
					</div>

					<button
						type='submit'
						className='w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 font-medium transition-colors'
					>
						Зарегистрироваться
					</button>
				</form>
			</div>
		</div>
	)
}

export default XSignupModal
