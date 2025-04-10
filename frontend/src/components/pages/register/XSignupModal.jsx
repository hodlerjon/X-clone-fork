import { useState } from 'react'

function XSignupModal({ onClose }) {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	})

	const handleSubmit = e => {
		e.preventDefault()
		// Handle form submission here
		console.log(formData)
	}

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-black border border-gray-700 rounded-2xl p-8 max-w-md w-full mx-4'>
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-xl font-bold text-white'>Создать аккаунт</h2>
					<button onClick={onClose} className='text-gray-400 hover:text-white'>
						✕
					</button>
				</div>

				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<input
							type='text'
							placeholder='Имя'
							className='w-full bg-black border border-gray-700 rounded-md p-3 text-white focus:border-blue-500 focus:outline-none'
							value={formData.name}
							onChange={e => setFormData({ ...formData, name: e.target.value })}
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
							placeholder='Пароль'
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
