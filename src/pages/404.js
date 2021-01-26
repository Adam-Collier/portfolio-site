import React from 'react';

import Page from '../components/Page';
import SEO from '../components/Seo';

const NotFoundPage = ({ location }) => (
  <Page>
    <SEO
      title="404: Not found"
      description="This page cannot be found"
      pathname={location.pathname}
    />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Page>
);

export default NotFoundPage;
