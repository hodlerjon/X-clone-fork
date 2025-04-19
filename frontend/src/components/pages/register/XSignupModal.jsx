import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function XSignupModal({ onClose }) {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const [formData, setFormData] = useState({
		username: JSON.parse(localStorage.getItem('user'))?.username || '',
		email: JSON.parse(localStorage.getItem('user'))?.email || '',
		password: '',
		full_name: JSON.parse(localStorage.getItem('user'))?.name || '',
		bio: '',
		user_id: Math.random().toString(36).substring(2, 15),
		profile_image_url:
			JSON.parse(localStorage.getItem('user'))?.profile_image_url || '',
	})
	const [error, setError] = useState('')
	const [errors, setErrors] = useState({
		username: '',
		email: '',
		password: '',
		full_name: '',
	})

	const validateForm = () => {
		let isValid = true
		const newErrors = {
			username: '',
			email: '',
			password: '',
			full_name: '',
		}

		if (!formData.username.trim()) {
			newErrors.username = 'Username is required'
			isValid = false
		} else if (formData.username.length < 3) {
			newErrors.username = 'Username must be at least 3 characters'
			isValid = false
		}

		if (!formData.email.trim()) {
			newErrors.email = 'Email is required'
			isValid = false
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Email is invalid'
			isValid = false
		}

		if (!formData.password) {
			newErrors.password = 'Password is required'
			isValid = false
		} else if (formData.password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters'
			isValid = false
		}

		if (!formData.full_name.trim()) {
			newErrors.full_name = 'Full name is required'
			isValid = false
		}

		setErrors(newErrors)
		return isValid
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setError('')

		if (!validateForm()) {
			return
		}

		setIsLoading(true)

		try {
			const response = await fetch('http://localhost:5000/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(formData),
			})

			const data = await response.json()

			if (data.status === 'success') {
				localStorage.setItem(
					'user',
					JSON.stringify({
						...data.user,
						isAuthenticated: true,
					})
				)
				onClose()
				navigate('/')
			} else {
				setError(data.message || 'Registration failed')
			}
		} catch (err) {
			console.error('Network error:', err)
			setError('Something went wrong. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	const handleChange = e => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
		// Clear field-specific error when user types
		if (errors[name]) {
			setErrors({ ...errors, [name]: '' })
		}
	}

	return (
		<div
			className='fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50'
			onClick={onClose}
		>
			<div
				className='bg-black border border-gray-700 rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl'
				onClick={e => e.stopPropagation()}
			>
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-xl font-bold text-white'>Создать аккаунт</h2>
					<button
						onClick={onClose}
						className='text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors'
						aria-label='Close modal'
					>
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
							name='username'
							placeholder='Username'
							className={`w-full bg-black border ${
								errors.username ? 'border-red-500' : 'border-gray-700'
							} rounded-md p-3 text-white focus:border-blue-500 focus:outline-none transition-colors`}
							value={formData.username}
							onChange={handleChange}
							disabled={isLoading}
						/>
						{errors.username && (
							<p className='text-red-500 text-xs mt-1'>{errors.username}</p>
						)}
					</div>

					<div>
						<input
							type='text'
							name='full_name'
							placeholder='Full Name'
							className={`w-full bg-black border ${
								errors.full_name ? 'border-red-500' : 'border-gray-700'
							} rounded-md p-3 text-white focus:border-blue-500 focus:outline-none transition-colors`}
							value={formData.full_name}
							onChange={handleChange}
							disabled={isLoading}
						/>
						{errors.full_name && (
							<p className='text-red-500 text-xs mt-1'>{errors.full_name}</p>
						)}
					</div>

					<div>
						<input
							type='email'
							name='email'
							placeholder='Email'
							className={`w-full bg-black border ${
								errors.email ? 'border-red-500' : 'border-gray-700'
							} rounded-md p-3 text-white focus:border-blue-500 focus:outline-none transition-colors`}
							value={formData.email}
							onChange={handleChange}
							disabled={isLoading}
						/>
						{errors.email && (
							<p className='text-red-500 text-xs mt-1'>{errors.email}</p>
						)}
					</div>

					<div>
						<input
							type='password'
							name='password'
							placeholder='Password'
							className={`w-full bg-black border ${
								errors.password ? 'border-red-500' : 'border-gray-700'
							} rounded-md p-3 text-white focus:border-blue-500 focus:outline-none transition-colors`}
							value={formData.password}
							onChange={handleChange}
							disabled={isLoading}
						/>
						{errors.password && (
							<p className='text-red-500 text-xs mt-1'>{errors.password}</p>
						)}
					</div>

					<button
						type='submit'
						className='w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
						disabled={isLoading}
					>
						{isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
					</button>
				</form>
			</div>
		</div>
	)
}

export default XSignupModal
