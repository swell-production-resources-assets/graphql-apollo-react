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

  const NEW_LINKS_SUBSCRIPTION = gql`
    subscription {
      newLink {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
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

  // 


  /*
  react-apollo gives us special components like Query, Mutation, and Subscription. These components use React's render prop pattern, which allows us to make components more reusable by specifying what the component renders outside of the component definition.
  
  Learn more here: https://reactjs.org/docs/render-props.html
  
  In this case, Query will run the anonymous function that we provide, instead of running its own render method. The function is automatically passed a single argument which includes:
  - data: contains the results of the Graph QL query
  - several Apollo methods: fetchMore, refetch, startPolling, stopPolling, subscribeToMore, updateQuery
  - other goodies: error, loading, networkStatus, and variables
  
  Query also automatically creates a fetch request for the FEED_QUERY that we passed as a prop.

  subscribeToMore tells the Query to re-render its children based on new data coming back from NEW_LINKS_SUBSCRIPTION
  */

  return (
    <Query query={FEED_QUERY}>
      {(arg) => {
        const { loading, error, data, subscribeToMore } = arg;
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;

        subscribeToMore({
          document: NEW_LINKS_SUBSCRIPTION,
          // prev is the list of all the links previously rendered
          // the second parameter is an object containing "subscriptionData" and "variables"
          updateQuery: (prev, { subscriptionData }) => {
            console.log(prev)
            if (!subscriptionData.data) return prev;
            const newLink = subscriptionData.data.newLink;
            // The next two lines prevent re-rendering if we already have the new Link showing
            const exists = prev.feed.links.find(({ id }) => id === newLink.id);
            if (exists) return prev;
            return Object.assign({}, { // tutorial had "prev" as 2nd argument, but unnecessary
              feed: {
                links: [...prev.feed.links, newLink],
                count: prev.feed.links.length + 1,
                __typename: prev.feed.__typename,
              }
            });
          },
        })

        return (
          data.feed.links.map(link => <li><Link key={link.id} link={link} /></li>)
        )
      }}
    </Query>
  )
}

export default LinkList