import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './components/app';
import LoginForm from './components/loginForm';
import SignupForm from './components/signupForm';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
});

const client = new ApolloClient({
  dataIdFromObject: o => o.id,
  networkInterface
});

const Root = () => {
  return (
    <ApolloProvider client = {client}>
       <Router history = {hashHistory}>
          <Route path = "/" component = {App}>
            <Route path = "login" component = {LoginForm}/>
            <Route path = "signup" component = {SignupForm}/>
          </Route>
       </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));