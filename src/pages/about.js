import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'

const AboutPage = ({ data, location }) => {
    const author = data.ghostAuthor

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="profile"
            />
            <Layout>
                <div className="container">
                    <div className="author-header-image">
                        {author.profile_image && <img src={author.profile_image} alt={author.name} />}
                    </div>
                    <article className="content" style={{ textAlign: `center` }}>
                        <h1 className="content-title">About the author</h1>
                        {author.postCount}
                        <section className="content-body">
                            My (internet) name is Juuro and I love mountainbiking. Since ten years I participate in MTB marathon races and my bike obsession in growing since. I live in south-west Germany. Here we have the Black Forrest and the Swabian Alps to ride and with Albstadt the only Cross Country UCI Worlcup spot in Germany right around the corner.
                        </section>
                        <section className="content-body">
                            With this blog I try to canalise my thoughts about cycling in gerneral. But it will be MTB dominated.
                        </section>
                    </article>
                </div>
            </Layout>
        </>
    )
}

AboutPage.propTypes = {
    data: PropTypes.shape({
        ghostAuthor: PropTypes.shape({
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.string,
            website: PropTypes.string,
            twitter: PropTypes.string,
            url: PropTypes.string,
            postCount: PropTypes.int,
            location: PropTypes.string,
        }),
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
}

export default AboutPage

export const pageQuery = graphql`
    query GhostAboutQuery {
        ghostAuthor(slug: {eq: "juuro"}) {
            profile_image
            postCount
            twitter
            url
            website
            name
            location
        }
    }
`