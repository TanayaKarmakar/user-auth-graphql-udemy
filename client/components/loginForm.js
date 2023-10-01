import React, { Component } from 'react';
import AuthForm from './authForm';
import mutation from '../mutations/login';
import query from '../queries/currentUser';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: []
        };
    }

    onSubmit({email, password}) {
        console.log('email', email);
        console.log('password', password);
        this.props.mutate({
            variables: {
                email,
                password
            },
            refetchQueries: [{query}]
        }).catch(res => {
            const errors = res.graphQLErrors.map(error => error.message);
            this.setState({errors});
        });
    }

    componentWillUpdate(nextProps) {
        console.log(this.props, nextProps);
        if(!this.props.data.user && nextProps.data.user) {
            // redirect tp dashboard
            hashHistory.push('/dashboard');
        }
    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <AuthForm onSubmit = {this.onSubmit.bind(this)} errors = {this.state.errors}/>
            </div>
        );
    }
}

export default graphql(query)
(
    graphql(mutation)(LoginForm)
);