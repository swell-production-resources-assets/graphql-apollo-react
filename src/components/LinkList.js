import React from 'react';
import { Query } from 'react-apollo';
// import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import Link from './Link';

const LinkList = () => {

  const FEED_QUERY = gql`
    {
      feed {
        links {
          id
          createdAt
          url
          description
        }
      }
    }
  `;

  // This is a sample implementation of a query with apollo-boost (must un-comment import above)
  // const client = new ApolloClient({ uri: 'http://localhost:4000' });
  // client.query({
  //   query: FEED_QUERY,
  // })
  //   .then(data => console.log('fetched directly with apollo-boost:', data))
  //   .catch(error => console.error(error));

  return (
    <Query query={FEED_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;

        console.log(data);
        const linksToRender = data.feed.links;

        return (
          linksToRender.map(link => <li><Link key={link.id} link={link} /></li>)
        )
      }}
    </Query>
  )
}

export default LinkList