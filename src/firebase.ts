// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore, doc, getDocFromServer } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAZTRuoM2AbeDZTfFlMUnTwxwXyiT2ry7c",
  authDomain: "himel-cc98d.firebaseapp.com",
  projectId: "himel-cc98d",
  storageBucket: "himel-cc98d.firebasestorage.app",
  messagingSenderId: "1042056407069",
  appId: "1:1042056407069:web:4caf663c2b445cbf54bef4",
  measurementId: "G-91PBHCN90M"
};

// Initialize Firebase
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Cloud Firestore Database
export const db = getFirestore(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Analytics safely (supports environments with/without browser storage)
export let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log("Firebase Analytics initialized successfully (himel-cc98d)");
    }
  }).catch((err) => {
    console.warn("Firebase Analytics could not be initialized:", err);
  });
}

export const initAnalytics = async () => {
  try {
    if (typeof window !== "undefined" && (await isSupported())) {
      if (!analytics) {
        analytics = getAnalytics(app);
      }
      return analytics;
    }
  } catch (err) {
    console.warn("Analytics init check:", err);
  }
  return null;
};

// Test Firestore Connection
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, "test", "connection"));
    console.log("Firebase Firestore connected successfully to project: himel-cc98d");
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes("the client is offline")) {
      console.warn("Firestore client offline status:", error.message);
    } else {
      console.log("Firebase connection verified for project: himel-cc98d");
    }
    return false;
  }
}

// Error handling helper
export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null = null
): FirestoreErrorInfo {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[Firebase ${operationType} Error] on ${path || "unknown"}:`, message);
  return {
    error: message,
    operationType,
    path,
  };
}
