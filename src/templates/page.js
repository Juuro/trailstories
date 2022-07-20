import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Single page (/:slug)
*
* This file renders a single page and loads all the content.
*
*/
const Page = ({ data, location }) => {
    const page = data.ghostPage
    const site = data.allGhostSettings.edges[0].node

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type='website'
            />

            <header>
                <div className='viewport'>
                    <Link to='/'>{site.title}</Link>
                </div>
            </header>

            <Layout>
                <div className='container'>
                    <article className='content'>
                        <h1 className='content-title'>{page.title}</h1>

                        <section
                            className='content-body load-external-scripts'
                            dangerouslySetInnerHTML={{ __html: page.html }}
                        />
                    </article>
                </div>
            </Layout>
        </>
    )
}

Page.propTypes = {
    data: PropTypes.shape({
        allGhostSettings: PropTypes.shape({
            edges: PropTypes.shape([{
                node: PropTypes.shape({
                    title: PropTypes.string.isRequired,
                }),
            }]),
        }),
        ghostPage: PropTypes.shape({
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Page

export const postQuery = graphql`
    query($slug: String!) {
        allGhostSettings {
            edges {
                node {
                    title
                }
            }
        }
        ghostPage(slug: { eq: $slug }) {
            ...GhostPageFields
        }
    }
`
