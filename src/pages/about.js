import React from 'react'
import { Link } from 'gatsby'
import { Layout } from '../components/common'

const NotFoundPage = () => (
    <Layout>
        <div className="container">
            <article className="content" style={{ textAlign: `center` }}>
                <h1 className="content-title">About the author</h1>
                <section className="content-body">
                    My (internet) name is Juuro and I love mountainbiking. Since ten years I participate in MTB marathon races and my bike obsession in growing since. I live in south-west Germany. Here we have the Black Forrest and the Swabian Alps to ride and with Albstadt the only Cross Country UCI Worlcup spot in Germany right around the corner.
                </section>
                <section className="content-body">
                    With this blog I try to canalise my thoughts about cycling in gerneral. But it will be MTB dominated.
                </section>
            </article>
        </div>
    </Layout>
)

export default NotFoundPage
