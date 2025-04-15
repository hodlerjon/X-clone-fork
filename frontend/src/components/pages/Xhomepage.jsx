import React from 'react'
import MainContent from '../layout/MainContent'

const XHomePage = ({ posts, onPostCreated, loading, error }) => {
	return (
		<MainContent
			posts={posts}
			onPostCreated={onPostCreated}
			loading={loading}
			error={error}
		/>
	)
}

export default XHomePage
