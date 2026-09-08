import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '../firebase';

export const ADMIN_EMAIL = 'mehdihimel@yahoo.com';

export interface AuthUserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
}

const LOCAL_USER_KEY = 'nandonik_logged_in_user';

export const isUserAdmin = (user: { email?: string | null } | null | undefined): boolean => {
  if (!user || !user.email) return false;
  return user.email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase().trim();
};

export async function loginWithEmail(email: string, password: string): Promise<AuthUserProfile> {
  const cleanEmail = email.trim();
  try {
    const credential = await signInWithEmailAndPassword(auth, cleanEmail, password);
    const profile: AuthUserProfile = {
      uid: credential.user.uid,
      email: credential.user.email,
      displayName: credential.user.displayName || credential.user.email?.split('@')[0] || 'User',
    };
    try {
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(profile));
    } catch {
      // ignore
    }
    return profile;
  } catch (error: any) {
    // If account doesn't exist yet, attempt to create it automatically for convenience
    if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
      try {
        const createCred = await createUserWithEmailAndPassword(auth, cleanEmail, password);
        const profile: AuthUserProfile = {
          uid: createCred.user.uid,
          email: createCred.user.email,
          displayName: createCred.user.displayName || cleanEmail.split('@')[0],
        };
        try {
          localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(profile));
        } catch {}
        return profile;
      } catch (innerErr) {
        // rethrow original error
        throw error;
      }
    }
    throw error;
  }
}

export async function registerWithEmail(email: string, password: string): Promise<AuthUserProfile> {
  const cleanEmail = email.trim();
  const credential = await createUserWithEmailAndPassword(auth, cleanEmail, password);
  const profile: AuthUserProfile = {
    uid: credential.user.uid,
    email: credential.user.email,
    displayName: credential.user.displayName || cleanEmail.split('@')[0],
  };
  try {
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(profile));
  } catch {}
  return profile;
}

export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (err) {
    console.warn('Sign out Firebase error:', err);
  }
  try {
    localStorage.removeItem(LOCAL_USER_KEY);
  } catch {}
}

export function getInitialStoredUser(): AuthUserProfile | null {
  try {
    const raw = localStorage.getItem(LOCAL_USER_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {}
  return null;
}

export function subscribeToAuth(onUserChange: (user: AuthUserProfile | null) => void): () => void {
  try {
    const unsubscribe = onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        const profile: AuthUserProfile = {
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
        };
        try {
          localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(profile));
        } catch {}
        onUserChange(profile);
      } else {
        // Check if there is a local session or null
        const local = getInitialStoredUser();
        onUserChange(local || null);
      }
    });
    return unsubscribe;
  } catch (err) {
    console.warn('subscribeToAuth error:', err);
    onUserChange(getInitialStoredUser());
    return () => {};
  }
}
