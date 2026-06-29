import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../config/firebase";

const productCollection = collection(db, "products");

// Add Product
export async function createProduct(product) {
  return await addDoc(productCollection, {
    ...product,
    createdAt: serverTimestamp(),
  });
}

// Get All Products
export async function getProducts() {
  const snapshot = await getDocs(productCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Get Single Product
export async function getProduct(id) {
  const snapshot = await getDoc(doc(db, "products", id));
  if (!snapshot.exists()) return null;
  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

// Update Product
export async function updateProduct(id, data) {
  await updateDoc(doc(db, "products", id), data);
}

// Delete Product
export async function deleteProduct(id) {
  await deleteDoc(doc(db, "products", id));
}

// Logged User Products
export async function getUserProducts(uid) {
  const q = query(productCollection, where("userId", "==", uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
