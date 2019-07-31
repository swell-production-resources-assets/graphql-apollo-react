import React from 'react'
import LinkList from './LinkList'
import CreateLink from './CreateLink'
import Link from './Link';
import gql from 'graphql-tag';
import { Subscription } from 'react-apollo'


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

const App = () => {
  return (
    <>
      <Subscription subscription={NEW_LINKS_SUBSCRIPTION}>
        {({ loading, data }) => {
          if (loading) return <p>Waiting for new data</p>;
          return (
            <>
              New link posted: <Link key={data.newLink.id} link={data.newLink} />
            </>
          );
        }}
      </Subscription>
      <hr />
      <LinkList />
      <CreateLink />
    </>
  )
}

export default App