import { initializeApp, getApp } from 'firebase/app';

const createFirebaseApp = (config = {}) => {
  try {
    return getApp();
  } catch (e) {
    return initializeApp(config);
  }
};

// Initialize the Firebase app
export const app = createFirebaseApp({
  // see https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public#:~:text=The%20apiKey%20in%20this%20configuration,interact%20with%20your%20Firebase%20project.
  apiKey: 'AIzaSyCsUAhhNXjc5xoeM9voMGuX-fmG0Jpbaw4', // gitleaks:allow
  authDomain: 'koellabs.firebaseapp.com',
  projectId: 'koellabs',
  appId: '1:1002707406495:web:c7baa37aabbb930512dcaa',
  measurementId: 'G-WEH50514TH',
});
