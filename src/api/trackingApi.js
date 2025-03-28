import { db } from "../config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Add Tracking Data
export const addTracking = async (trackingData) => {
  try {
    const docRef = await addDoc(collection(db, "tracking"), trackingData);
    console.log("Tracking info added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding tracking info:", error);
  }
};

// Get All Tracking Info
export const getTrackingInfo = async () => {
  const querySnapshot = await getDocs(collection(db, "tracking"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
