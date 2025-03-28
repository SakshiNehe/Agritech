import { db } from "../config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Add Address
export const addAddress = async (addressData) => {
  try {
    const docRef = await addDoc(collection(db, "addresses"), addressData);
    console.log("Address added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding address:", error);
  }
};

// Get All Addresses
export const getAddresses = async () => {
  const querySnapshot = await getDocs(collection(db, "addresses"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
