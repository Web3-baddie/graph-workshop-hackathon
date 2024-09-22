// src/App.js
import React from 'react';
import ApolloProviderComponent from './ApolloProvider';
import Kitties from './kitties';

const App = () => {
  return (
    <ApolloProviderComponent>
      <Kitties />
    </ApolloProviderComponent>
  );
};

export default App;
