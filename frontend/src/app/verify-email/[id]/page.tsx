"use client"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { verifyEmail } from "../../../redux/slices/auth/functions/Function";
import { getVerifyEmailStatus } from "../../../redux/slices/auth/authSlice";
import { useAppDispatch } from "../../../redux/store";
import { redirect } from "next/navigation";
 interface VerifyEmailViewProps {
    params: {
        id: string;
    };
}
export default function VerifyEmailView({params}: VerifyEmailViewProps) {
        const { id } = params;
  const dispatch = useAppDispatch();
  const emailVerifyStatus = useSelector(getVerifyEmailStatus); //get emailVerifyStatus

  // after view load send POST request
  useEffect(() => {
    if (id) {
      dispatch(verifyEmail(id));
    }
  }, [dispatch, id]);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <h1>Verify Email</h1>

            {(emailVerifyStatus === "unknown" ||
              emailVerifyStatus === "error") && (
              <p>
                We can't verify your email. Please try to register again or
                contact us by email contact@monitor-uptime.com
              </p>
            )}
            {emailVerifyStatus === "started" && (
              <p>Email verification started, please wait a while ...</p>
            )}
            {emailVerifyStatus === "ok" && (
              <p>
                Successfull email verification🎉 Please login to start
                monitoring!
                <br />
                <button
                  className="btn btn-lg btn-primary my-2"
                  onClick={() => redirect("/login")}
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}