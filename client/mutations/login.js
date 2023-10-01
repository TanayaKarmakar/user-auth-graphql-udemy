import gql from 'graphql-tag';

export default gql`
    mutation SignIn($email: String, $password: String) {
        login(email: $email, password: $password) {
            email
        }
    }
`;