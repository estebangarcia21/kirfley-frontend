import classNames from 'classnames';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { object, string } from 'yup';
import { useLoginMutation } from '../generated/graphql-types';
import styles from '../styles/auth-form.module.scss';
import buttonStyles from '../styles/buttons.module.scss';
import AuthFormLabel from './forms/auth-form';

export default function LoginForm({
  registerButtonClickCallback,
}: {
  registerButtonClickCallback: (value: boolean) => void;
}) {
  const [login] = useLoginMutation();
  const router = useRouter();

  const LoginSchema = object().shape({
    usernameOrEmail: string().required('Required'),
    password: string()
      .required('Required')
      .test('password-is-correct', 'Incorrect password', async _ => {
        const { data } = await login({
          variables: {
            usernameOrEmail: values.usernameOrEmail,
            password: values.password,
          },
        });

        return data.login.successful;
      }),
  });

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      usernameOrEmail: '',
      password: '',
    },
    onSubmit: async _ => {
      router.push('/home');
    },
    validationSchema: LoginSchema,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <div id={styles['container']}>
      <form className={styles['form']} onSubmit={handleSubmit}>
        <AuthFormLabel name={'usernameOrEmail'} errors={errors}>
          Username or Email
        </AuthFormLabel>
        <input
          id='usernameOrEmail'
          name='usernameOrEmail'
          type='text'
          onChange={handleChange}
          value={values.usernameOrEmail}
        />

        <AuthFormLabel name={'password'} errors={errors}>
          Password
        </AuthFormLabel>
        <input
          id='password'
          name='password'
          type='password'
          onChange={handleChange}
          value={values.password}
        />

        <div className={styles['button-container']}>
          <button
            type='submit'
            className={classNames(
              styles['form__button'],
              buttonStyles['inverted']
            )}
          >
            Log In
          </button>

          <p>or</p>

          <button
            type='button'
            className={classNames(
              styles['form__button'],
              buttonStyles['inverted']
            )}
            onClick={() => {
              registerButtonClickCallback(true);
            }}
          >
            Create an Account
          </button>
        </div>
      </form>
    </div>
  );
}
