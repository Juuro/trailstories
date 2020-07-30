import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Post = ({ data, location }) => {
    const post = data.ghostPost

    return (
        <>
            <MetaData data={data} location={location} type="article" />
            <Layout>
                <div className="container">
                    <article className="content">
                        <section className="post-full-content">
                            <h1 className="content-title">{post.title}</h1>
                            {post.feature_image ? (
                                <figure className="post-feature-image">
                                    <img
                                        src={post.feature_image}
                                        alt={post.title}
                                    />
                                </figure>
                            ) : null}
                            <section
                                className="content-body load-external-scripts"
                                dangerouslySetInnerHTML={{ __html: post.html }}
                            />
                            {post.tags && (
                                <div className="post-card-tags">
                                    <Tags
                                        post={post}
                                        visibility="public"
                                        autolink={true}
                                        permalink="/tag/:slug"
                                        separator=""
                                        separatorClasses="d-none"
                                    />
                                </div>
                            )}
                        </section>
                    </article>
                </div>
            </Layout>
        </>
    );
}

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
            tags: PropTypes.array,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
    }
`
