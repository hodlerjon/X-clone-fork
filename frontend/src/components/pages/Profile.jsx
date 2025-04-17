import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    Link,
    NavLink,
    Route,
    Routes,
    useLocation,
    useNavigate,
    useParams,
} from 'react-router-dom'

const Profile = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { user_id } = useParams()
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Update default navigation
    useEffect(() => {
        if (location.pathname === '/profile') {
            navigate('/profile/')
        }
    }, [location, navigate])

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const targetUserId = user_id || JSON.parse(localStorage.getItem('user'))?.user_id
                if (!targetUserId) {
                    throw new Error('No user ID available')
                }

                const response = await fetch(`http://localhost:5000/api/profile/${targetUserId}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })

                if (!response.ok) {
                    throw new Error('Failed to fetch profile')
                }

                const data = await response.json()
                if (data.status === 'success') {
                    setUserData(data.user)
                } else {
                    throw new Error(data.message || 'Failed to fetch profile')
                }
            } catch (err) {
                console.error('Profile fetch error:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [user_id])

    const tabs = [
        { name: 'Posts', path: '.' },
        { name: 'Replies', path: 'replies' },
        { name: 'Media', path: 'media' },
        { name: 'Likes', path: 'likes' }
    ]

    if (loading) {
        return (
            <div className="min-h-screen border-x border-gray-800 w-[600px] flex items-center justify-center">
                <p className="text-gray-500">Loading profile...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen border-x border-gray-800 w-[600px] flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        )
    }

    if (!userData) {
        return (
            <div className="min-h-screen border-x border-gray-800 w-[600px] flex items-center justify-center">
                <p className="text-gray-500">Profile not found</p>
            </div>
        )
    }

    return (
        <div className='min-h-screen border-x border-gray-800 w-[600px]'>
            {/* Header */}
            <div className='sticky top-0 bg-black/80 backdrop-blur-md z-10 px-4 py-3 flex items-center gap-6'>
                <Link to='/' className='p-2 hover:bg-gray-900 rounded-full'>
                    <ArrowLeft className='w-5 h-5' />
                </Link>
                <div>
                    <h2 className='font-bold text-xl'>{userData.full_name}</h2>
                    <p className='text-gray-500 text-sm'>{userData.post_count || 0} posts</p>
                </div>
            </div>

            <div>
                {/* Avatar */}
                <div className='px-4 pb-4 flex justify-between items-start'>
                    <div>
                        <div className='w-24 h-24 rounded-full border-4 border-black bg-gray-800 overflow-hidden flex justify-center items-center'>
                            {userData.profile_image_url ? (
                                <img
                                    src={userData.profile_image_url}
                                    alt='Avatar'
                                    className='w-full h-full object-cover'
                                />
                            ) : (
                                <span className='font-bold text-[34px]'>
                                    {userData.full_name?.charAt(0).toUpperCase()}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className='mt-4 px-4 py-2 rounded-full border border-gray-500 font-bold hover:bg-gray-600/20 cursor-pointer transition-all'>
                        Edit profile
                    </div>
                </div>

                {/* Profile Info */}
                <div className='px-4 mb-4'>
                    <h2 className='font-bold text-xl text-left'>{userData.full_name}</h2>
                    <p className='text-gray-500 text-left'>@{userData.username}</p>
                    {userData.bio && <p className='mt-3 text-left'>{userData.bio}</p>}

                    <div className='flex gap-4 mt-3'>
                        <span className='hover:underline cursor-pointer'>
                            <strong>{userData.following_count || 0}</strong>
                            <span className='text-gray-500'> Following</span>
                        </span>
                        <span className='hover:underline cursor-pointer'>
                            <strong>{userData.follower_count || 0}</strong>
                            <span className='text-gray-500'> Followers</span>
                        </span>
                    </div>
                </div>

                {/* Tabs */}
                <div className='flex border-b border-gray-800 sticky top-[73px] bg-black/80 backdrop-blur-md z-10'>
                    {tabs.map(tab => (
                        <NavLink
                            key={tab.name}
                            to={`/profile/${user_id}/${tab.path}`}
                            end={tab.path === '.'}
                            className={({ isActive }) =>
                                `flex-1 min-w-[100px] p-4 text-center font-bold text-[15px] 
                                cursor-pointer transition-all relative hover:bg-gray-900/50 
                                ${isActive 
                                    ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-blue-500'
                                    : 'text-gray-500 hover:text-white'}`
                            }
                        >
                            {tab.name}
                        </NavLink>
                    ))}
                </div>

                {/* Tab Content */}
                <Routes>
                    <Route index element={<Posts />} />
                    <Route path="replies" element={<Replies />} />
                    <Route path="media" element={<Media />} />
                    <Route path="likes" element={<Likes />} />
                </Routes>
            </div>
        </div>
    )
	
}

const EmptyState = ({ message }) => (
    <div className='flex flex-col items-center justify-center min-h-[400px] text-gray-500'>
        <p className='text-xl font-medium'>{message}</p>
    </div>
)

const Posts = () => <EmptyState message='No posts yet' />
const Replies = () => <EmptyState message='No replies yet' />
const Likes = () => <EmptyState message='No likes yet' />
const Media = () => <EmptyState message='No media yet' />

export default Profile
