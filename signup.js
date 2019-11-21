import React, { useState } from 'react';
import { schema }  from 'yup';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import {SignUpTemplate} from '../templates/SignupTemplate';
import { useApi } from '../utils/api';
import { useAuth } from '../utils/auth';
import { useRequest } from '../hooks/useRequest';
import Container from "../atoms/Container";


export function SignUp() {
  const history = useHistory();
  const auth = useAuth();
  const [signupRequestState, signupRequest] = useRequest();
  const api = useApi();
  const [alert, setAlert] = useState(false);
  const [alertGroupCreated, setAlertGroupCreated] = useState(false);

  /*  const handleInputChange = event => {
    const { value, name } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onSubmit = event => {
 Data.password1 === formData.password2 &&
      formData.password2 !== ''
    ) {
      const data = {
        email: formData.email,
        password: formData.password1,
      };
      api
        .post('/auth/signup', data)
        .then(res => {
          //TODO TADY SE USPESNE REGISTROVAL CHLAPEC
          setAlert(true);
          console.log(res.data);
        })   event.preventDefault();
    if (
      form
        .catch(err => console.log('error', err));
    }
  };
*/
  return (
    <Container navbar={false}>
      <div className="row">
        <div className="col-lg">
          <h2 className="font-weight-bold font-italic text-center login-page_title">
            Registrace uživatele do The League6
          </h2>
        </div>
      </div>
      <div className="row justify-content-center login-page_form">

      <Formik
      initialValues={{ email: '', password: '', passwordConfirmation: '' }}
      validationSchema={schema}

      onSubmit={values => {
        const { email, password } = values;
        signupRequest({
          url: '/auth/signup',
          method: 'POST',
          data: { email, password },
        }).then(({ data }) => {
          const { token, user } = data;
          auth.signin({ token, user });
          history.replace('/');
        }).catch(error => {
          console.error(error.response.data.msg);
        });
        setAlertGroupCreated(true);
      }}
    >
        <Form>
      <SignUpTemplate
        isLoading={signupRequestState.isLoading}
        error={signupRequestState.error}
      />

        {alertGroupCreated && (
          <div className="">
            <div className="col-12">
              <div className="alert alert-danger label_right" role="alert">
                Nějaký hráč už má taký email
              </div>
            </div>
          </div>
        )}
      </Form>

    </Formik>
      </div>
    </Container>
  );
}
