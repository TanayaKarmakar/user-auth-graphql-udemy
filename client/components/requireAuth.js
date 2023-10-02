import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { graphql } from 'react-apollo';
import currentUserQuery from '../queries/currentUser';

export default (WrappedComponent) => {
    class RequireAuth extends Component {
        componentWillUpdate(nextProps) {
            //console.log('requireAuth', nextProps);
            if(!nextProps.data.loading && !nextProps.data.user) {
                hashHistory.push('/login');
            }
        }

        render() {
            return <WrappedComponent {...this.props}/>;
        }
    }
    
    graphql(currentUserQuery)(RequireAuth);
}
