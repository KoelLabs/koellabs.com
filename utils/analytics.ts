import { app } from './app';
import { getAnalytics } from 'firebase/analytics';

export const analytics = getAnalytics(app);
