import { gql, useApolloClient } from '@apollo/client';
import { useFormik } from 'formik';
import { User } from '../components/entities';

const AUTHENTICATE_USER = gql`
  query AuthenticateUser($email: String!, $password: String!) {
    login(options: { email: $email, password: $password }) {
      successful
    }
  }
`;

interface UserData {
  login: { authenticated: boolean };
}

export default function SignIn() {
  const client = useApolloClient();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async values => {
      const { data } = await client.query<UserData, User>({
        query: AUTHENTICATE_USER,
        variables: {
          email: values.email,
          password: values.password,
        },
      });

      console.log(data.login.authenticated);
    },
  });

  return (
    <div id='container'>
      <div id='card'>
        <div id='left-column'>
          <form onSubmit={formik.handleSubmit}>
            <h1>Sign In</h1>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <button type='submit'>Sign In</button>
          </form>
        </div>
        <div id='right-column' />
      </div>

      <style jsx>{`
        #container {
          display: flex;
          justify-content: center;
          align-items: center;

          height: 100vh;
          background-image: linear-gradient(35deg, #c2f3fc, #bfa4f5);
        }

        #card {
          display: flex;
          justify-content: center;
          align-items: center;

          width: 80%;
          height: 85%;

          background-color: white;

          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
            0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }

        #left-column,
        #right-column {
          background-color: white;
          float: left;
          width: 50%;
        }

        #right-column {
          background-image: url('/cards.svg');
          height: 100%;
        }

        body {
        }

        form {
          display: inline-flex;
          flex-direction: column;
          margin: 0px 25%;
          width: 200px;
        }

        label,
        input,
        h1,
        p {
          font-family: 'Lato', sans-serif;
        }

        input {
          font-size: 14px;
          border: none;
          border-bottom: 1.5px solid black;
          margin: 10px 0px;
        }

        input:focus {
          outline: none;
        }

        button {
          width: 100px;
          margin: 10px auto;
        }
      `}</style>
    </div>
  );
}