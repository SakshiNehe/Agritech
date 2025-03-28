import { db } from "../config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Add Farmer
export const addFarmer = async (farmerData) => {
  try {
    const docRef = await addDoc(collection(db, "farmers"), farmerData);
    console.log("Farmer added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding farmer:", error);
  }
};

// Get All Farmers
export const getFarmers = async () => {
  const querySnapshot = await getDocs(collection(db, "farmers"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
