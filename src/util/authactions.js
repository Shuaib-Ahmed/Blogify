import { app } from "../firebaseconfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { storeUserDetails } from "./blogactions";

export const auth = getAuth(app);
const storage = getStorage();

export const createUser = async ({ email, password, displayName, photo }) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const imgResponse = await storeImage(photo, "profile_photo", user.uid);

    if (imgResponse.errorStatus) {
      throw new Error({ message: imgResponse.message });
    }

    const userDetailResponse = await storeUserDetails({
      displayName,
      photoURL: imgResponse.url,
      user_id: user.uid,
    });

    if (userDetailResponse.errorStatus) {
      throw new Error({ message: userDetailResponse.message });
    }

    return { errorStatus: false };
  } catch (error) {
    return { errorStatus: true, message: error.message };
  }
};

export const logInUser = async ({ email, password }) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { errorStatus: false };
  } catch (error) {
    return { errorStatus: true, message: error.message };
  }
};

export const logOutUser = async () => {
  try {
    await signOut(auth);
    return { errorStatus: false };
  } catch (error) {
    return { errorStatus: true, message: error.message };
  }
};

export const sendEmailChangePassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { errorStatus: false };
  } catch (error) {
    return { errorStatus: true, message: error.message };
  }
};

export const updateUserProfile = async (displayName, photoURL) => {
  try {
    await updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
    return { errorStatus: false };
  } catch (error) {
    return { errorStatus: true, message: error.message };
  }
};

export const storeImage = async (photo, filePath, userId) => {
  try {
    const imageRef = ref(storage, `${filePath}/${userId}`);
    await uploadBytes(imageRef, photo);
    const url = await getDownloadURL(imageRef);

    return { errorStatus: false, url: url };
  } catch (error) {
    return { errorStatus: true, message: error.message };
  }
};

export const deleteImage = async (filePath, userId) => {
  try {
    const imageRef = ref(storage, `${filePath}/${userId}`);
    await deleteObject(imageRef);

    return { errorStatus: false };
  } catch (error) {
    return { errorStatus: true, message: error.message };
  }
};
