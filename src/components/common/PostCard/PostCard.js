import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'

import './PostCard.scss'

const PostCard = ({ post }) => {
    const url = `/${post.slug}/`
    const readingTime = readingTimeHelper(post)

    return (
        <article className="post-card">
            {post.feature_image &&
                <Link to={url}><div className="post-card-image" style={{
                    backgroundImage: `url(${post.feature_image})`,
                }}></div></Link>}
            <div className="post-card-main">
                <header className="post-card-header">
                    <div className="post-card-header-content">
                        <div className="post-card-date-reading-time">
                            <span className="post-card-date">{post.published_at_pretty}</span>
                            <div className="post-card-header-reading-time">{readingTime}</div>
                        </div>
                        <h2 className="post-card-title"><Link to={url}>{post.title}</Link></h2>
                        {post.featured && <span>Featured</span>}
                    </div>
                </header>
                <section className="post-card-content">{post.excerpt}</section>
                <footer className="post-card-footer">
                    <div className="post-card-footer-left">
                        {post.tags && <div className="post-card-tags"> <Tags post={post} visibility="public" autolink={true} permalink="/tag/:slug" separator="" /></div>}
                    </div>
                </footer>
            </div>
        </article>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string.isRequired,
        published_at_pretty: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        html: PropTypes.string.isRequired,
    }).isRequired,
}

export default PostCard
