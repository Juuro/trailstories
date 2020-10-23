import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { Link, StaticQuery, graphql } from "gatsby"

import { Navigation } from "."

// Styles
import "../../styles/app.scss"

/**
 * Main layout component
 *
 * The Layout component wraps around each page and tmeplate.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
const DefaultLayout = ({ data, children, isHome }) => {
    const site = data.allGhostSettings.edges[0].node

    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <body className={isHome ? `homepage` : null} />
            </Helmet>

            <div className='viewport'>
                <div className='viewport-top'>
                    <main className='site-main'>
                        {children}
                    </main>
                </div>

                <div className='viewport-bottom'>
                    <nav className='site-nav'>
                        <div className='site-nav-left'>
                            {/* The navigation items as setup in Ghost */}
                            <Navigation
                                data={site.navigation}
                                navClass='site-nav-item'
                            />
                        </div>
                        <div className='site-nav-right'>
                            <Link className='site-nav-button' to='/about'>
                                About
                            </Link>
                        </div>
                    </nav>
                    {/* The footer at the very bottom of the screen */}
                    <footer className='site-foot'>
                        <div className='site-foot-nav container'>
                            <div className='site-foot-nav-left'>
                                <Link to='/'>{site.title}</Link> © 2019 &mdash;
                                Published with{` `}
                                <a
                                    className='site-foot-nav-item'
                                    href='https://ghost.org'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Ghost
                                </a>
                            </div>
                            <div className='site-foot-nav-right'>
                                <Navigation
                                    data={site.navigation}
                                    navClass='site-foot-nav-item'
                                />
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        allGhostSettings: PropTypes.object.isRequired,
        file: PropTypes.shape({
            childImageSharp: PropTypes.shape({
                fixed: PropTypes.object,
            }),
        }),
    }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: { eq: "ghost-icon.png" }) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
)

export default DefaultLayoutSettingsQuery
