import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import { Layout, PostCard, Pagination } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Main index page (home page)
*
* Loads all posts from Ghost and uses pagination to navigate through them.
* The number of posts that should appear per page can be setup
* in /utils/siteConfig.js under `postsPerPage`.
*
*/
const Index = ({ data, location, pageContext }) => {
    const posts = data.allGhostPost.edges
    const site = data.allGhostSettings.edges[0].node

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type='website'
            />
            <Link to='/'> 
                <img
                    src={site.cover_image}
                    alt='Cover Image'
                    className='cover-image'
                />
            </Link>
            <header className='home-head'>
                <div className='container'>
                    <div className='site-banner text-center'>
                        <h1 className='site-banner-title'>
                            {site.title}
                        </h1>
                        <p className='site-banner-desc'>
                            {site.description}
                        </p>
                    </div>
                </div>
            </header>
            <Layout bodyClass='nix' isHome={true}>
                <div className='container'>
                    <section className='post-feed'>
                        {posts.map(({ node }) => (
                            <PostCard key={node.id} post={node} />
                        ))}
                    </section>
                    <Pagination pageContext={pageContext} />
                </div>
            </Layout>
        </>
    )
}

Index.propTypes = {
    data: PropTypes.shape({
        allGhostSettings: PropTypes.object.isRequired,
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object.isRequired,
}

export default Index

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query GhostPostQuery($limit: Int!, $skip: Int!) {
    allGhostSettings {
        edges {
            node {
                title,
                description,
                cover_image
            }
        }
    }
    allGhostPost(
        sort: { order: DESC, fields: [published_at] },
        limit: $limit,
        skip: $skip,
        filter: { slug: {ne: "data-schema"}}
    ) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`
