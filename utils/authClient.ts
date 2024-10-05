import { app } from './app';
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  signInWithPopup,
  getRedirectResult,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { getAndSetUser } from './authServer';

// Initialize auth
const auth = getAuth(app);
auth.useDeviceLanguage();
setPersistence(auth, browserSessionPersistence); // auth session ends when browser session ends (closing window/browser will end session, refresh and closing tab will not)
getRedirectResult(auth); // initialize auth with redirect login results if available

/**
 * Gets the currently logged in user.
 * @returns the user object if the user is logged in, null otherwise
 */
export async function getUser() {
  if (auth.currentUser) {
    // use firebase auth information if available (otherwise we rely on the existing idtoken session storage item if it has been set)
    const idToken = await auth.currentUser.getIdToken(/* forceRefresh */ true);
    window.sessionStorage.setItem('idtoken', idToken);
  } else if (!window.sessionStorage.getItem('idtoken')) return null;
  try {
    return await getAndSetUser(window.sessionStorage.getItem('idtoken'));
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Signs out the currently logged in user.
 */
export async function signOut() {
  window.sessionStorage.removeItem('idtoken');
  await auth.signOut();
}

/**
 * Guarantees the user is logged in by redirecting to the login page if the user is not logged in.
 * Should be called before using any features that require the user to be logged in.
 *
 * Automatically reruns itself when the token expires.
 */
export async function requireLogin(
  loginUrl = '/sign-in?redirect=' + encodeURIComponent(location.href),
) {
  if (await getUser()) {
    setTimeout(requireLogin, parseJwt((auth.currentUser as any).accessToken).exp * 1000 - Date.now());
  } else {
    window.location.assign(loginUrl);
  }
}

// Email and Password Auth
/**
 * Logs in a user with email and password.
 * @param {string} email the email of the user
 * @param {string} password the password of the user
 * @returns {Promise<[User, null] | [null, Error]>} the user object if successful, an error otherwise
 */
export async function emailPasswordLogin(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return [await getUser(), null];
  } catch (error) {
    console.error(error.code, error.message);
    return [null, error];
  }
}

/**
 * Signs up a user with email and password.
 * @param {string} email the email of the user 
 * @param {string} password the password of the user
 * @returns {Promise<[User, null] | [null, Error]>} the user object if successful, an error otherwise
 */
export async function emailPasswordSignUp(email, password) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return [await getUser(), null];
  } catch (error) {
    console.error(error.code, error.message);
    return [null, error];
  }
}

/**
 * Sends a password reset email to the given email address.
 * @param {string} email the email address to send the password reset email to
 * @returns {null | Error} null if successful, an error otherwise
 */
export async function emailPasswordReset(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return null;
  } catch (error) {
    console.error(error.code, error.message);
    return error;
  }
}

// Google, Microsoft and Facebook Auth
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');

/**
 * Logs in a user with Google, Microsoft or Facebook.
 * @param {AuthProvider} provider the provider to use for the login
 * @param {AuthProvider} providerCLS the provider class to use for the login
 * @returns {Promise<[User, null] | [null, Error]>} the user object if successful, an error otherwise
 */
async function popupLogin(provider, providerCLS) {
  try {
    await signInWithPopup(auth, provider);
    return [await getUser(), null];
  } catch (error) {
    console.error(
      error.code,
      error.message,
      error.customData.email,
      providerCLS.credentialFromError(error),
    );
    return [null, error];
  }
}

/**
 * Logs in a user with Google.
 * @returns {Promise<[User, null] | [null, Error]>} the user object if successful, an error otherwise
 * @see popupLogin
 * @see signInWithPopup
 */
export async function googleLogin() {
  return await popupLogin(googleProvider, GoogleAuthProvider);
}

/**
 * Logs in a user with Facebook.
 * @returns {Promise<[User, null] | [null, Error]>} the user object if successful, an error otherwise
 * @see popupLogin
 * @see signInWithPopup
 */
export async function facebookLogin() {
  return await popupLogin(facebookProvider, FacebookAuthProvider);
}

/**
 * Logs in a user with Microsoft.
 * @returns {Promise<[User, null] | [null, Error]>} the user object if successful, an error otherwise
 * @see popupLogin
 * @see signInWithPopup
 */
export async function microsoftLogin() {
  return await popupLogin(microsoftProvider, OAuthProvider);
}

// Utility Functions
/**
 * Parses the main body of a JWT bearer token.
 * @param {string} token the base64 encoded token to parse
 * @returns the decoded and parsed token body as a JavaScript object.
 */
function parseJwt(token) {
  return JSON.parse(window.atob(token.split('.')[1]));
}
