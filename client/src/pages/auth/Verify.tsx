// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { selectResponse, verifyUser } from "features/authSlice";
import Error from "pages/Error";

const Verify = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const response = useAppSelector(selectResponse);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (response.status === 'success') {
      setIsVerified(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
    if (response.status === 'error') {
      toast.error(response.message);
      setIsVerified(false);
    }
  }, [navigate, dispatch, response.status, response.message]);

  const handleClick = () => {
    dispatch(verifyUser(searchParams.get("token")));
  };

  return (
    <>
      {isVerified && <div>{response.message}</div>}
      {searchParams.get("token") && !isVerified && (
        <div>
          <div>You are super close to join Pierre's!</div>
          <button onClick={handleClick}>Verify Email</button>
        </div>
      )}
      {(!(searchParams.get("token")) && !isVerified) && (
        <Error message='Invalid URL' />
      )}
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </>
  );
};

export default Verify;
