import React from 'react';
import ReactDOM from 'react-dom';
// wrap the App with BrowserRouter so that all child components of App will get access to the routing functionality
import { BrowserRouter } from 'react-router-dom';
//react-apollo contains the bindings to use Apollo Client with React.
import { ApolloProvider } from 'react-apollo';
// apollo - boost offers some convenience by bundling several packages you need when working with Apollo Client:
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

import App from './components/App';
import * as serviceWorker from './serviceWorker';

import './styles/index.css';
import { AUTH_TOKEN } from './components/constants';


//create the httpLink that will connect ApolloClient instance with the GraphQL API, GraphQL server will be running on localhost: 4000
const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

// This middleware will be invoked every time ApolloClient sends a request to the server
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

//instantiate ApolloClient by passing in the httpLink and a new instance of an InMemoryCache
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <BrowserRouter>
    {/*The App is wrapped with the higher-order component ApolloProvider that gets passed the client as a prop*/}
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
