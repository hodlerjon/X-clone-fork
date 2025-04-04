import {
	BarChart3,
	HelpCircle,
	KeyRound,
	MessageSquare,
	Paintbrush,
	Settings,
	Users,
} from 'lucide-react'
import React from 'react'

const MoreModal = ({ isOpen, onClose }) => {
	if (!isOpen) return null

	const menuItems = [
		{ icon: <Settings className='w-5 h-5' />, text: 'Settings and privacy' },
		{ icon: <HelpCircle className='w-5 h-5' />, text: 'Help Center' },
		{ icon: <Paintbrush className='w-5 h-5' />, text: 'Display' },
		{ icon: <KeyRound className='w-5 h-5' />, text: 'Keyboard shortcuts' },
		{ icon: <Users className='w-5 h-5' />, text: 'Communities' },
		{ icon: <BarChart3 className='w-5 h-5' />, text: 'Analytics' },
		{ icon: <MessageSquare className='w-5 h-5' />, text: 'Professional Tools' },
	]

	return (
		<>
			<div className='fixed inset-0 bg-black/50 z-40' onClick={onClose} />
			<div className='fixed left-75 bottom-100 w-[318px] bg-black rounded-2xl border border-gray-800 shadow-xl z-50'>
				{menuItems.map((item, index) => (
					<button
						key={index}
						className='flex items-center w-full space-x-4 p-4 hover:bg-gray-900 transition-colors first:rounded-t-2xl last:rounded-b-2xl'
					>
						{item.icon}
						<span className='text-xl'>{item.text}</span>
					</button>
				))}
			</div>
		</>
	)
}

export default MoreModal
