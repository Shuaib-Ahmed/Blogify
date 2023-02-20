import React from "react";

const AccountDetails = ({ user }) => {
  return (
    <section>
      <img src={user.photoURL} alt="diplay pic" />
      <h2> Pen name : {user.displayName}</h2>
      <h2> Email : {user.email}</h2>
    </section>
  );
};

export default AccountDetails;
