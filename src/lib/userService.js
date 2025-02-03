import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export const getUserData = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
};

export const createUser = async (userId, userData) => {
  try {
    const defaultData = {
      userName: '',
      fontSize: 16,
      userCountry: null,
      user_type: 'student',
      hasShownComplete: false,
      ...userData
    };
    await setDoc(doc(db, 'users', userId), defaultData);
    return defaultData;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUserData = async (userId, data) => {
  try {
    await updateDoc(doc(db, 'users', userId), data);
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

export const deleteUserData = async (userId) => {
  try {
    await setDoc(doc(db, 'users', userId), {
      userName: '',
      fontSize: 16,
      userCountry: null,
      user_type: 'student',
      hasShownComplete: false
    });
  } catch (error) {
    console.error('Error deleting user data:', error);
    throw error;
  }
}; 