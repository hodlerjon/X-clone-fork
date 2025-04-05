import { Search, Settings, Edit } from 'lucide-react'
import React, { useState } from 'react'
import ChatInterface from '../messages/ChatInterface'

const Messages = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedChat, setSelectedChat] = useState(null)

	const conversations = [
		{
			id: 1,
			name: 'John Doe',
			username: '@johndoe',
			avatar: '',
			lastMessage: 'Thanks for your help!',
			time: '2h',
		},
		{
			id: 2,
			name: 'Jane Smith',
			username: '@janesmith',
			avatar: '',
			lastMessage: 'How are you doing?',
			time: '1d',
		},
	]

	return (
		<div className='flex'>
			<div
				className={`${
					selectedChat ? 'hidden md:block' : ''
				} min-h-screen border-x border-gray-800 w-[600px]`}
			>
				{/* Header */}
				<div className='sticky top-0 bg-black/80 backdrop-blur-md z-10 px-4 py-2 flex items-center justify-between'>
					<div className='flex items-center gap-6'>
						<h2 className='font-bold text-xl'>Messages</h2>
					</div>
					<div className='flex items-center gap-2'>
						<button className='p-2 hover:bg-gray-900 rounded-full'>
							<Settings className='w-5 h-5' />
						</button>
						<button className='p-2 hover:bg-gray-900 rounded-full'>
							<Edit className='w-5 h-5' />
						</button>
					</div>
				</div>

				{/* Search */}
				<div className='p-4'>
					<div className='flex items-center bg-gray-900 rounded-full px-4 py-2'>
						<Search className='w-5 h-5 text-gray-500' />
						<input
							type='text'
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
							placeholder='Search Direct Messages'
							className='bg-transparent ml-2 outline-none w-full text-white'
						/>
					</div>
				</div>

				{/* Conversations List */}
				<div className='border-t border-gray-800'>
					{conversations.map(conversation => (
						<div
							key={conversation.id}
							onClick={() => setSelectedChat(conversation)}
							className='flex items-start gap-3 p-4 hover:bg-gray-900 cursor-pointer transition-colors border-b border-gray-800'
						>
							{/* Avatar */}
							<div className='w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center'>
								{conversation.avatar ? (
									<img
										src={conversation.avatar}
										alt={conversation.name}
										className='w-full h-full rounded-full object-cover'
									/>
								) : (
									<span className='text-xl font-bold'>
										{conversation.name.charAt(0)}
									</span>
								)}
							</div>

							{/* Conversation Details */}
							<div className='flex-1'>
								<div className='flex justify-between items-start'>
									<div>
										<p className='font-bold'>{conversation.name}</p>
										<p className='text-gray-500 text-sm'>
											{conversation.username}
										</p>
									</div>
									<span className='text-gray-500 text-sm'>
										{conversation.time}
									</span>
								</div>
								<p className='text-gray-500 mt-1'>{conversation.lastMessage}</p>
							</div>
						</div>
					))}
				</div>

				{/* Empty State */}
				{conversations.length === 0 && (
					<div className='flex flex-col items-center justify-center p-8 text-center'>
						<h3 className='text-2xl font-bold mb-2'>Welcome to your inbox!</h3>
						<p className='text-gray-500 mb-4'>
							Drop a line, share posts and more with private conversations
							between you and others on X.
						</p>
						<button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full'>
							Write a message
						</button>
					</div>
				)}
			</div>

			{/* Chat Interface */}
			{selectedChat && (
				<div className='flex-1 border-r border-gray-800'>
					<ChatInterface
						conversation={selectedChat}
						onBack={() => setSelectedChat(null)}
					/>
				</div>
			)}
		</div>
	)
}

export default Messages
