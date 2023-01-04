import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './App';
import {UserProvider} from './contexts/user.context'
import {CardProvider} from './contexts/cart.context'
import { CategoriesProvider } from './contexts/categories.context';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://crwn-clothing.com/',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>x
    <BrowserRouter>
      <UserProvider>
        <CategoriesProvider>
          <CardProvider>
            <App/>
          </CardProvider>
        </CategoriesProvider>
      </UserProvider>
    </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

//可以向上获取数据
//所有被UserProvider包裹起来的componennt都可以访问context value => currentState setCurrentState 

