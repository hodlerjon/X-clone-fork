import React from 'react'
import MainContent from '../layout/MainContent'

const XHomePage = ({ posts, onPostCreated, onPostDeleted, loading, error }) => {
	return (
		<MainContent
			posts={posts}
			onPostCreated={onPostCreated}
			loading={loading}
			error={error}
			onPostDeleted={onPostDeleted}
		/>
	)
}

export default XHomePage
