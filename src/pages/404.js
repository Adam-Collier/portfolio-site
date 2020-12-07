import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/seo';

const NotFoundPage = ({ location }) => (
  <Layout>
    <SEO
      title="404: Not found"
      description="This page cannot be found"
      pathname={location.pathname}
    />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
);

export default NotFoundPage;
