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
        <section className="post-card">
            <header className="post-card-header">
                <span className="post-card-date">{post.published_at_pretty}</span>
                <h2 className="post-card-title"><Link to={url}>{post.title}</Link></h2>
                <div className="post-card-header-right">
                    <div>{readingTime}</div>
                </div>
                {post.featured && <span>Featured</span>}
                {post.feature_image &&
                    <Link to={url}><div className="post-card-image" style={{
                        backgroundImage: `url(${post.feature_image})` ,
                    }}></div></Link>}
            </header>
            <section
                className="content-body load-external-scripts"
                dangerouslySetInnerHTML={{ __html: post.html }}
            />
            <footer className="post-card-footer">
                <div className="post-card-footer-left">
                    {post.tags && <div className="post-card-tags"> <Tags post={post} visibility="public" autolink={true} permalink="/tag/:slug" separator="" /></div>}
                </div>
            </footer>
        </section>
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
