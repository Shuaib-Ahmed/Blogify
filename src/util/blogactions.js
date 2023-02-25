import { app } from "../firebaseconfig";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { storeImage, deleteImage } from "./authactions";

export const db = getFirestore(app);

export const createNewBlog = async ({
  title,
  summary,
  category,
  blog_image,
}) => {
  const user = getAuth().currentUser;
  try {
    const { id: blog_id } = await addDoc(collection(db, "blogs"), {
      title,
      summary,
      category,
      user_id: user.uid,
    });
    const imgResponse = await storeImage(blog_image, "blog_photo", blog_id);

    if (imgResponse.errorStatus) {
      throw new Error({ message: imgResponse.message });
    }

    await updateDoc(doc(db, "blogs", blog_id), { blog_image: imgResponse.url });

    return { errorStatus: false };
  } catch (error) {
    return { errorStatus: true, message: error.message };
  }
};

export const getBlog = async (blog_id) => {
  try {
    const res = await getDoc(doc(db, "blogs", blog_id));
    if (res.exists()) {
      return { errorStatus: false, data: res.data() };
    } else {
      throw new Error("Blog dose not exist");
    }
  } catch (error) {
    return { errorStatus: true, message: error.message };
  }
};

export const getBlogs = async (category) => {
  try {
    const data = [];
    const querySnapShot = await getDocs(
      query(collection(db, "blogs"), where("category", "==", category))
    );

    querySnapShot.forEach((doc) => {
      data.push({ blog_id: doc.id, ...doc.data() });
    });

    return { errorStatus: false, data: data };
  } catch (error) {
    return { errorStatus: true, message: error.message };
  }
};

export const updateBlog = async (input, blog_id) => {
  try {
    let imgResponse;
    if (input.blog_image) {
      imgResponse = await storeImage(input.blog_image, "blog_photo", blog_id);

      if (imgResponse.errorStatus) {
        throw new Error({ message: imgResponse.message });
      } else {
        input = { ...input, blog_image: imgResponse.url };
      }
    }

    await updateDoc(doc(db, "blogs", blog_id), {
      ...input,
    });
    return { errorStatus: false };
  } catch (error) {
    return { errorStatus: true, message: error.message };
  }
};

export const deletetBlog = async (blog_id) => {
  try {
    const imgResponse = await deleteImage("blog_photo", blog_id);
    if (imgResponse.errorStatus) {
      throw new Error({ message: imgResponse.message });
    }

    await deleteDoc(doc(db, "blogs", blog_id));
    return { errorStatus: false };
  } catch (error) {
    return { errorStatus: true, message: error.message };
  }
};

export const storeUserDetails = async ({ displayName, photoURL, user_id }) => {
  try {
    await addDoc(collection(db, "user_details"), {
      displayName,
      photoURL,
      user_id,
    });
    return { errorStatus: false };
  } catch (error) {
    return { errorStatus: true, message: error.message };
  }
};

export const getUserDetails = async (user_id) => {
  try {
    const data = [];
    const querySnapShot = await getDocs(
      query(collection(db, "user_details"), where("user_id", "==", user_id))
    );

    querySnapShot.forEach((doc) => {
      data.push({ ...doc.data() });
    });

    return { errorStatus: false, data: data[0] };
  } catch (error) {
    return { errorStatus: true, message: error.message };
  }
};

export const blogCategories = [
  "science",
  "sport",
  "music",
  "movie",
  "food",
  "travel",
];
