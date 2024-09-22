// src/Kitties.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import './Kitties.css'; // Import the CSS file

const GET_CONTRACTS_AND_ACCOUNTS = gql`
  query {
    contracts(first: 5) {
      id
      asERC721 {
        id
      }
    }
    accounts(first: 5) {
      id
      tokens {
        id
      }
      delegationsOwner {
        id
      }
      delegationsOperator {
        id
      }
    }
  }
`;

const Kitties = () => {
  const { loading, error, data } = useQuery(GET_CONTRACTS_AND_ACCOUNTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (

  
    <div className="kitties-container">
      <header>
        <h1>CryptoKitties Metadata Explorer</h1>
        <p>Explore and interact with the metadata of CryptoKitties NFTs.</p>
      </header>
      <section>
        <h2>Contracts</h2>
        <ul>
          {data.contracts.map((contract) => (
            <li key={contract.id}>
              <h3>Contract ID: {contract.id}</h3>
              <p>ERC721 ID: {contract.asERC721.id}</p>
            </li>
          ))}
        </ul>
        <h2>Accounts</h2>
        <ul>
          {data.accounts.map((account) => (
            <li key={account.id}>
              <h3>Account ID: {account.id}</h3>
              <p>Tokens: {account.tokens.map(token => token.id).join(', ')}</p>
              <p>Delegations Owner: {account.delegationsOwner.map(owner => owner.id).join(', ')}</p>
              <p>Delegations Operator: {account.delegationsOperator.map(operator => operator.id).join(', ')}</p>
            </li>
          ))}
        </ul>
      </section>
      <footer>
        <p>© {new Date().getFullYear()} Meta Data Explorer. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Kitties;
