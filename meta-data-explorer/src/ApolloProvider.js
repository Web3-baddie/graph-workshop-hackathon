// src/ApolloProvider.js
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: "https://gateway.thegraph.com/api/a1f8194a9b36a7bc1703a8fe48b62343/subgraphs/id/Esag956C6WUQwfP8SstPAXCmd2QhApYprrGxcvfydE7c", // Replace YOUR_API_KEY with your actual API key
  cache: new InMemoryCache(),
});

const ApolloProviderComponent = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderComponent;
