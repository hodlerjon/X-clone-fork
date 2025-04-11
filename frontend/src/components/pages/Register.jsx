// App.jsx
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import XLogo from '../ui/Xlogo'
import XSignupModal from '../pages/register/XSignupModal'

function Register() {
	const navigate = useNavigate()
	const [error, setError] = useState('')
	const [isModalOpen, setIsModalOpen] = useState(false)

	const openModal = () => setIsModalOpen(true)
	const closeModal = () => setIsModalOpen(false)

	const handleGoogleSuccess = async credentialResponse => {
		try {
			const decoded = jwtDecode(credentialResponse.credential)
			console.log('Decoded response:', decoded) // For debugging

			localStorage.setItem(
				'user',
				JSON.stringify({
					name: decoded.name,
					email: decoded.email,
					picture: decoded.picture,
					isAuthenticated: true,
				})
			)

			navigate('/')
		} catch (error) {
			console.error('Google sign in error:', error)
			setError('Failed to sign in with Google')
		}
	}

	const handleAppleSignIn = async () => {
		try {
			// Initialize Apple SignIn
			const data = await window.AppleID.auth.signIn()
			// Handle successful sign in
			localStorage.setItem(
				'user',
				JSON.stringify({
					name: data.user.name,
					email: data.user.email,
					isAuthenticated: true,
				})
			)
			navigate('/')
		} catch (error) {
			console.error('Apple sign in error:', error)
		}
	}

	return (
		<div className='min-h-screen flex flex-col bg-black text-white'>
			<div className='flex flex-col lg:flex-row flex-1'>
				{/* Logo section */}
				<div className='flex justify-center items-center p-8 lg:flex-1'>
					<div className='w-full max-w-md h-auto'>
						<XLogo />
					</div>
				</div>

				{/* Signup section */}
				<div className='flex flex-col justify-center p-8 lg:flex-1'>
					<h1 className='text-5xl md:text-6xl font-bold mb-12 text-left'>
						В курсе происходящего
					</h1>
					<h2 className='text-2xl md:text-3xl font-bold mb-8 text-left'>
						Присоединяйтесь сегодня.
					</h2>

					<div className='max-w-sm'>
						{/* Google signup - Updated with consistent styling */}
						<div className='w-full mb-4'>
							<GoogleOAuthProvider
								clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
							>
								<div className='w-full'>
									<GoogleLogin
										onSuccess={handleGoogleSuccess}
										onError={() => {
											console.log('Login Failed')
											setError('Google login failed')
										}}
										useOneTap
										theme='filled_white'
										shape='pill'
										text='Sign_up_with_Google'
										// locale='en'
										width='100%'
									/>
								</div>
							</GoogleOAuthProvider>
						</div>

						{error && <p className='text-red-500 text-sm mt-2'>{error}</p>}

						{/* Apple signup - no changes needed, already looks good */}
						<button
							onClick={handleAppleSignIn}
							className='w-full flex items-center justify-center px-4 py-3 rounded-full border border-gray-700 mb-4 hover:bg-gray-900 transition-colors'
						>
							<span className='mr-2'>
								<svg className='w-5 h-5' viewBox='0 0 24 24' fill='white'>
									<path d='M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.09 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z' />
								</svg>
							</span>
							<span>Вход через аккаунт Apple</span>
						</button>

						{/* Rest of the component remains the same */}
						<div className='relative flex items-center my-5'>
							<div className='flex-grow border-t border-gray-700'></div>
							<span className='flex-shrink mx-4 text-gray-500'>или</span>
							<div className='flex-grow border-t border-gray-700'></div>
						</div>

						<button
							className='w-full bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded-full font-medium transition-colors'
							onClick={openModal}
						>
							Зарегистрироваться
						</button>

						<p className='text-xs text-gray-500 my-4 leading-relaxed'>
							Регистрируясь, вы соглашаетесь с
							<a href='#' className='text-blue-500 hover:underline'>
								{' '}
								Условиями предоставления услуг
							</a>{' '}
							и
							<a href='#' className='text-blue-500 hover:underline'>
								{' '}
								Политикой конфиденциальности
							</a>
							, а также с{' '}
							<a href='#' className='text-blue-500 hover:underline'>
								{' '}
								Политикой использования файлов cookie
							</a>
							.
						</p>

						<div className='mt-10'>
							<p className='text-gray-500 mb-4'>Уже зарегистрированы?</p>
							<button className='w-full border border-gray-700 text-blue-500 hover:bg-blue-900/20 px-4 py-3 rounded-full font-medium transition-colors'>
								Войти
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Footer */}
			<footer className='p-4 text-xs text-gray-500 border-t border-gray-800'>
				<div className='flex flex-wrap justify-center gap-4 mb-3'>
					<a href='#' className='hover:underline'>
						О нас
					</a>
					<a href='#' className='hover:underline'>
						Скачать приложение X
					</a>
					<a href='#' className='hover:underline'>
						Блог
					</a>
					<a href='#' className='hover:underline'>
						Справочный центр
					</a>
					<a href='#' className='hover:underline'>
						Условия предоставления услуг
					</a>
					<a href='#' className='hover:underline'>
						Политика конфиденциальности
					</a>
					<a href='#' className='hover:underline'>
						Политика в отношении файлов cookie
					</a>
					<a href='#' className='hover:underline'>
						Специальные возможности
					</a>
					<a href='#' className='hover:underline'>
						Информация о рекламе
					</a>
					<a href='#' className='hover:underline'>
						Блог
					</a>
					<a href='#' className='hover:underline'>
						Работа
					</a>
					<a href='#' className='hover:underline'>
						Ресурсы бренда
					</a>
					<a href='#' className='hover:underline'>
						Реклама
					</a>
					<a href='#' className='hover:underline'>
						Маркетинг
					</a>
					<a href='#' className='hover:underline'>
						X для бизнеса
					</a>
					<a href='#' className='hover:underline'>
						Разработчикам
					</a>
					<a href='#' className='hover:underline'>
						Каталог
					</a>
					<a href='#' className='hover:underline'>
						Настройки
					</a>
				</div>
				<div className='text-center'>© 2025 X Corp.</div>
			</footer>

			{/* Modal */}
			{isModalOpen && <XSignupModal onClose={closeModal} />}
		</div>
	)
}

export default Register
