import { Auth0Client } from '@auth0/auth0-spa-js';

const auth0 = new Auth0Client({
  domain: '{yourDomain}',
  clientId: '{yourClientId}'
});
