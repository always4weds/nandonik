import {
  collection,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  getDocs,
  limit,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { CustomerOrder, ChatMessageRecord, Product } from '../types';

export const ORDERS_COLLECTION = 'customer_orders';
export const CHAT_COLLECTION = 'chat_messages';
export const PRODUCTS_COLLECTION = 'products';

/**
 * Save customer order details directly into Firestore (customer_orders)
 */
export async function saveCustomerOrder(orderData: Omit<CustomerOrder, 'id'>): Promise<string | null> {
  try {
    const colRef = collection(db, ORDERS_COLLECTION);
    const payload = {
      ...orderData,
      status: orderData.status || 'pending',
      serverCreatedAt: serverTimestamp(),
      createdAt: orderData.createdAt || new Date().toISOString(),
    };
    const docRef = await addDoc(colRef, payload);
    console.log('[Firestore] Order successfully saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, ORDERS_COLLECTION);
    return null;
  }
}

/**
 * Save chat message (customer inquiry) directly to Firestore (chat_messages)
 */
export async function saveChatMessage(message: Omit<ChatMessageRecord, 'id'>): Promise<string | null> {
  try {
    const colRef = collection(db, CHAT_COLLECTION);
    const payload = {
      ...message,
      serverCreatedAt: serverTimestamp(),
      createdAt: message.createdAt || new Date().toISOString(),
    };
    const docRef = await addDoc(colRef, payload);
    console.log('[Firestore] Chat message saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, CHAT_COLLECTION);
    return null;
  }
}

/**
 * Real-time listener for products collection in Firestore.
 * Updates the app state whenever a product is added, edited, or removed.
 */
export function subscribeToProducts(
  onProducts: (products: Product[]) => void
): () => void {
  try {
    const colRef = collection(db, PRODUCTS_COLLECTION);
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: Product[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              ...data,
            } as Product;
          });
          onProducts(list);
        } else {
          onProducts([]);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, PRODUCTS_COLLECTION);
      }
    );
    return unsubscribe;
  } catch (err) {
    console.warn('[Firestore] Failed to subscribe to products:', err);
    return () => {};
  }
}

/**
 * Seed initial boutique curations if Firestore products collection is empty
 */
export async function seedInitialProductsIfEmpty(initialProducts: Product[]): Promise<void> {
  try {
    const colRef = collection(db, PRODUCTS_COLLECTION);
    const snap = await getDocs(colRef);
    if (snap.empty && initialProducts.length > 0) {
      console.log('[Firestore] Initializing products collection in Firestore...');
      for (const prod of initialProducts) {
        await syncProductToFirestore(prod);
      }
      console.log('[Firestore] Initial products successfully seeded to Firestore.');
    }
  } catch (error) {
    console.warn('[Firestore] Seeding check note:', error);
  }
}

/**
 * Sync / Add / Update product into Firestore
 */
export async function syncProductToFirestore(product: Product): Promise<void> {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, product.id);
    await setDoc(
      docRef,
      {
        ...product,
        updatedAt: new Date().toISOString(),
        serverUpdatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    console.log(`[Firestore] Product ${product.id} successfully synced.`);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${PRODUCTS_COLLECTION}/${product.id}`);
  }
}

/**
 * Remove / Delete product from Firestore
 */
export async function deleteProductFromFirestore(productId: string): Promise<void> {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, productId);
    await deleteDoc(docRef);
    console.log(`[Firestore] Product ${productId} successfully deleted.`);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${PRODUCTS_COLLECTION}/${productId}`);
  }
}

/**
 * Real-time listener for customer orders
 */
export function subscribeToOrders(
  onOrders: (orders: CustomerOrder[]) => void,
  onError?: (err: unknown) => void
): () => void {
  try {
    const q = query(collection(db, ORDERS_COLLECTION), orderBy('createdAt', 'desc'), limit(100));
    return onSnapshot(
      q,
      (snapshot) => {
        const list: CustomerOrder[] = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<CustomerOrder, 'id'>),
        }));
        onOrders(list);
      },
      () => {
        // Fallback without orderBy if composite index is pending
        return onSnapshot(
          collection(db, ORDERS_COLLECTION),
          (snapshot) => {
            const list: CustomerOrder[] = snapshot.docs.map((docSnap) => ({
              id: docSnap.id,
              ...(docSnap.data() as Omit<CustomerOrder, 'id'>),
            }));
            onOrders(list.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1)));
          },
          (err) => {
            if (onError) onError(err);
          }
        );
      }
    );
  } catch (err) {
    console.warn('[Firestore] Fallback order listener:', err);
    return () => {};
  }
}

/**
 * Real-time listener for chat messages
 */
export function subscribeToChatMessages(
  onMessages: (msgs: ChatMessageRecord[]) => void
): () => void {
  try {
    const q = query(collection(db, CHAT_COLLECTION), orderBy('createdAt', 'asc'), limit(50));
    return onSnapshot(
      q,
      (snapshot) => {
        const list: ChatMessageRecord[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<ChatMessageRecord, 'id'>),
        }));
        onMessages(list);
      },
      () => {
        return onSnapshot(
          collection(db, CHAT_COLLECTION),
          (snapshot) => {
            const list: ChatMessageRecord[] = snapshot.docs.map((d) => ({
              id: d.id,
              ...(d.data() as Omit<ChatMessageRecord, 'id'>),
            }));
            onMessages(list);
          }
        );
      }
    );
  } catch (err) {
    return () => {};
  }
}
