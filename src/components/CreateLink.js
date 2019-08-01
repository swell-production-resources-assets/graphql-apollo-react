import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
// import ApolloClient from 'apollo-boost'

const CreateLink = () => {
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
  `;

  // This is a sample implementation of a mutation with apollo-boost (must un-comment import above)
  // More info here: https://www.robinwieruch.de/graphql-apollo-client-tutorial/#graphql-apollo-client-mutation
  // const client = new ApolloClient({ uri: 'http://localhost:4000' });
  // client.mutate({
  //   mutation: POST_MUTATION,
  //   variables: {
  //     description: 'A search engine',
  //     url: 'www.google.com',
  //   }
  // })
  //   .then(data => console.log('posted with apollo-boost: ', data))
  //   .catch(error => console.error(error));

  return (
    <>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={description}
          onChange={e => setDescription(e.target.value)}
          type="text"
          placeholder="A description for the link"
        />
        <input
          className="mb2"
          value={url}
          onChange={e => setUrl(e.target.value)}
          type="text"
          placeholder="The URL for the link"
        />
      </div>
      <Mutation mutation={POST_MUTATION} variables={{ description, url }}>
        {(postMutation) => (
          <button onClick={(e) => {
            setUrl('');
            setDescription('');
            return postMutation(e);
          }}>Submit</button>
        )}
      </Mutation>
    </>
  )
}


export default CreateLink;