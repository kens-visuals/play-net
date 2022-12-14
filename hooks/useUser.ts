import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useAuthUser } from '@react-query-firebase/auth';
import { db, auth } from '../firebase/firebase.config';

export interface UserInterface {
  email: string;
  uid: string;
  createdAt: string;
  displayName: string;
  photoURL: string;
}

const options = {
  async onSuccess(newUser: UserInterface) {
    if (!newUser) return;

    const { displayName, email, uid, photoURL } = newUser;
    const userDocRef = doc(db, 'users', uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      const createdAt = serverTimestamp();

      try {
        // Create user doc
        await setDoc(userDocRef, {
          email,
          id: uid,
          photoURL,
          createdAt,
          displayName,
        });
      } catch (error) {
        console.error(error);
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

export default function useUser() {
  const user = useAuthUser(['user'], auth, options);

  return user;
}
