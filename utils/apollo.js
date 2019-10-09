import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

// Create a link that can upload blob file, mostly for image purpose
const link = createUploadLink({
  uri: ""
})

const cache = new InMemoryCache();

export const client = new ApolloClient({
  link,
  cache
});