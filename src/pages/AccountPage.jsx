import React, { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../util/authactions";
import { AccountBlogSection, AccountDetails } from "../components";

const AccountPage = () => {
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    }
  });
  return (
    <>
      {Object.keys(user).length !== 0 && (
        <>
          <AccountDetails user={user} />
          <AccountBlogSection user_id={user.uid}/>
        </>
      )}
    </>
  );
};

export default AccountPage;
