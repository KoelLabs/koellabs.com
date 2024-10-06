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

// Initialize auth
const auth = getAuth(app);
auth.useDeviceLanguage();
setPersistence(auth, browserSessionPersistence); // auth session ends when browser session ends (closing window/browser will end session, refresh and closing tab will not)
getRedirectResult(auth); // initialize auth with redirect login results if available

/**
 * Gets the currently logged in user.
 */
export async function getUser() {
  return await fetch("/api/getUser").then((res) => res.ok ? res.json() : null);
}

/**
 * Signs out the currently logged in user.
 */
export async function signOut() {
  await auth.signOut();
  await fetch("/api/logout");
  window.location.reload();
}

// Email and Password Auth
/**
 * Logs in a user with email and password.
 * @param {string} email the email of the user
 * @param {string} password the password of the user
 * @returns {Promise<Error>} an error if unsuccessful
 * @effect reloads the page if successful
 */
export async function emailPasswordLogin(email, password) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await result.user.getIdToken();
    await fetch("/api/login", {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    window.location.reload();
  } catch (error) {
    console.error(error.code, error.message);
    return error;
  }
}

/**
 * Signs up a user with email and password.
 * @param {string} email the email of the user 
 * @param {string} password the password of the user
 * @returns {Promise<Error>} an error if unsuccessful
 * @effect reloads the page if successful
 */
export async function emailPasswordSignUp(email, password) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const idToken = await result.user.getIdToken();
    await fetch("/api/login", {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    window.location.reload();
  } catch (error) {
    console.error(error.code, error.message);
    return error;
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
 * @returns {Promise<Error>} an error if unsuccessful
 * @effect reloads the page if successful
 */
async function popupLogin(provider, providerCLS) {
  try {
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();
    await fetch("/api/login", {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    window.location.reload();
  } catch (error) {
    console.error(
      error.code,
      error.message,
      error.customData.email,
      providerCLS.credentialFromError(error),
    );
    return error;
  }
}

/**
 * Logs in a user with Google.
 * @returns {Promise<Error>} an error if unsuccessful
 * @effect reloads the page if successful
 * @see popupLogin
 * @see signInWithPopup
 */
export async function googleLogin() {
  return await popupLogin(googleProvider, GoogleAuthProvider);
}

/**
 * Logs in a user with Facebook.
 * @returns {Promise<Error>} an error if unsuccessful
 * @effect reloads the page if successful
 * @see popupLogin
 * @see signInWithPopup
 */
export async function facebookLogin() {
  return await popupLogin(facebookProvider, FacebookAuthProvider);
}

/**
 * Logs in a user with Microsoft.
 * @returns {Promise<Error>} an error if unsuccessful
 * @effect reloads the page if successful
 * @see popupLogin
 * @see signInWithPopup
 */
export async function microsoftLogin() {
  return await popupLogin(microsoftProvider, OAuthProvider);
}
