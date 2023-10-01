import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import mutation from '../mutations/signup';
import query from '../queries/currentUser';
import AuthForm from './authForm';
import { hashHistory } from 'react-router';


class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: []
        };
    }

    onSubmit({email, password}) {
        this.props.mutate({
            variables: {email, password},
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
                <h3>Signup</h3>
                <AuthForm onSubmit = {this.onSubmit.bind(this)} errors = {this.state.errors}/>
            </div>
        );
    }

}

export default graphql(mutation)(SignupForm);