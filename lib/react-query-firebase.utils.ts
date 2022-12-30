// Firebase config and utils
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';

export interface UserInterface {
  email: string;
  uid: string;
  createdAt: string;
  displayName: string;
}

// eslint-disable-next-line import/prefer-default-export
export const options = {
  async onSuccess(newUser: any) {
    if (newUser) {
      const { displayName, email, uid } = newUser;
      const userDocRef = doc(db, 'users', uid);

      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        const createdAt = serverTimestamp();

        try {
          // Create user doc
          await setDoc(userDocRef, {
            email,
            id: uid,
            createdAt,
            displayName,
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
  },
  onError(error: ErrorOptions | undefined) {
    throw new Error(
      'Failed to subscribe to users authentication state!',
      error
    );
  },
};