import React, { useEffect, useState } from "react";

import { Loading, Modal } from "../components";

import style from "./css/accountDetail.module.css";
import { getUserDetails } from "../util/blogactions";

const AccountDetails = ({ user_id }) => {
  const [userDetail, setUserDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    errorStatus: false,
    message: "",
  });

  const fetchUserDetail = async () => {
    setError({ errorStatus: false, message: "" });

    setLoading(true);
    const response = await getUserDetails(user_id);
    setLoading(false);

    if (!response.errorStatus) {
      setUserDetail(response.data);
    } else {
      setError({ errorStatus: true, message: response.message });
    }
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  return (
    <>
      {error.errorStatus && <Modal error={error} />}

      {loading && <Loading />}

      {Object.keys(userDetail).length !== 0 && (
        <section className={style.container}>
          <div className={style.imageContainer}>
            <div></div>
            <img src={userDetail.photoURL} alt="diplay pic" />
          </div>

          <h2 className={style.title}>
            <span>PEN NAME</span> : {userDetail.displayName}
          </h2>
        </section>
      )}
    </>
  );
};

export default AccountDetails;
