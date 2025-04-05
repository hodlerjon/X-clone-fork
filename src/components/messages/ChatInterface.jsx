import React, { useState } from 'react'
import { ArrowLeft, Image, Smile, Send } from 'lucide-react'

const ChatInterface = ({ conversation, onBack }) => {
	const [message, setMessage] = useState('')

	const messages = [
		{
			id: 1,
			text: 'Hey, how are you?',
			sender: 'them',
			time: '2:30 PM',
		},
		{
			id: 2,
			text: "I'm good, thanks! How about you?",
			sender: 'me',
			time: '2:31 PM',
		},
		{
			id: 3,
			text: conversation.lastMessage,
			sender: 'them',
			time: '2:32 PM',
		},
	]

	const handleSend = () => {
		if (message.trim()) {
			// Add send message logic here
			setMessage('')
		}
	}

	return (
		<div className='flex flex-col h-screen'>
			{/* Chat Header */}
			<div className='sticky top-0 bg-black/80 backdrop-blur-md z-10 px-4 py-2 flex items-center gap-4 border-b border-gray-800'>
				<button
					onClick={onBack}
					className='p-2 hover:bg-gray-900 rounded-full md:hidden'
				>
					<ArrowLeft className='w-5 h-5' />
				</button>
				<div>
					<h2 className='font-bold'>{conversation.name}</h2>
					<p className='text-gray-500 text-sm'>{conversation.username}</p>
				</div>
			</div>

			{/* Messages */}
			<div className='flex-1 overflow-y-auto p-4 space-y-4'>
				{messages.map(msg => (
					<div
						key={msg.id}
						className={`flex ${
							msg.sender === 'me' ? 'justify-end' : 'justify-start'
						}`}
					>
						<div
							className={`max-w-[70%] rounded-2xl px-4 py-2 
                ${
									msg.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-800'
								}`}
						>
							<p>{msg.text}</p>
							<p className='text-xs opacity-70 mt-1'>{msg.time}</p>
						</div>
					</div>
				))}
			</div>

			{/* Message Input */}
			<div className='border-t border-gray-800 p-4'>
				<div className='flex items-center gap-2'>
					<div className='flex-1 bg-gray-900 rounded-2xl px-4 py-2 flex items-center gap-2'>
						<input
							type='text'
							value={message}
							onChange={e => setMessage(e.target.value)}
							placeholder='Start a new message'
							className='flex-1 bg-transparent outline-none'
						/>
						<button className='p-2 hover:bg-gray-800 rounded-full'>
							<Image className='w-5 h-5 text-blue-500' />
						</button>
						<button className='p-2 hover:bg-gray-800 rounded-full'>
							<Smile className='w-5 h-5 text-blue-500' />
						</button>
					</div>
					<button
						onClick={handleSend}
						disabled={!message.trim()}
						className={`p-2 rounded-full ${
							message.trim()
								? 'text-blue-500 hover:bg-blue-500/20'
								: 'text-gray-500'
						}`}
					>
						<Send className='w-5 h-5' />
					</button>
				</div>
			</div>
		</div>
	)
}

export default ChatInterface
