import { useState, useEffect } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';

import Amplify from 'aws-amplify';
import {
  AmplifyAuthContainer,
  AmplifyAuthenticator,
  AmplifyForgotPassword,
  AmplifySignIn
} from '@aws-amplify/ui-react';
import {
  AuthState,
  onAuthUIStateChange
} from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const App = () => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  const routing = useRoutes(routes);

  return authState === AuthState.SignedIn && user ? (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  ) : (
    <AmplifyAuthContainer>
      <AmplifyAuthenticator usernameAlias="email">
        <AmplifySignIn
          slot="sign-in"
          usernameAlias="email"
          headerText="MyLabs - Identification"
          hideSignUp="True"
          forgotPasswordText="Mot de passe oublié"
          submitButtonText="Connexion"
          formFields={[
            {
              type: 'email',
              label: 'Email',
              placeholder: 'Entrer votre email',
              inputProps: { required: true, autocomplete: 'username' },
            },
            {
              type: 'password',
              label: 'Mot de passe',
              placeholder: 'Entrer votre mot de passe',
              inputProps: { required: true, autocomplete: 'new-password' },
            }
          ]}
        />
        <AmplifyForgotPassword
          slot="forgot-password"
          headerText="Mylabs - Reset du mot de passe"
          sendButtonText="Envoyer un code"
          formFields={[
            {
              type: 'email',
              label: 'Email',
              placeholder: 'Entrer votre email',
              inputProps: { required: true, autocomplete: 'username' },
            }
          ]}
        />
      </AmplifyAuthenticator>
    </AmplifyAuthContainer>
  );
};

export default App;
