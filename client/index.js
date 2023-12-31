import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, hashHistory } from 'react-router';
import App from './components/app';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import DashBoard from './components/DashBoard';
import requireAuth from './components/requireAuth';

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
            <Route path = "dashboard" component = {requireAuth(DashBoard)}/>
          </Route>
       </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
