import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    registerUser(
      options: { username: $username, email: $email, password: $password }
    ) {
      user {
        username
        email
        password
      }
    }
  }
`;