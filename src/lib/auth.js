import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { createHash } from 'crypto';

export const hashPassword = async (password) => {
  return createHash('sha256').update(password).digest('hex');
};

export const verifyUserIsTeacher = async (password) => {
  try {
    const userData = localStorage.getItem('userDataPythonWorkshop');
    if (!userData) {
      return false;
    }

    const parsedData = JSON.parse(userData);
    return parsedData.user_type === 'teacher' && password === '1234'; // Using same password as test students for simplicity
  } catch (error) {
    console.error('Error verifying teacher status:', error);
    return false;
  }
}; 