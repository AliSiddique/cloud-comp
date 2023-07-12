"use client"
import { useState } from "react";
import { setNewPassword } from "../../../redux/slices/auth/authSlice";
import { useAppDispatch } from "../../../redux/store";

export default function ResetPasswordConfirmView({params}:{params:any}) {
  let { key, token } = params.key

  const dispatch = useAppDispatch();

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  return (
    <div>
      <div
        className="container"
        style={{ paddingTop: "70px", paddingBottom: "70px" }}
      >
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (key && token) {
                  dispatch(
                    setNewPassword(key, token, password1, password2)
                  );
                }
              }}
            >
              <h1 className="h3 mb-3 fw-normal">Set New Password</h1>

              <div className="my-2">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="Password2"
                  placeholder="New Password"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                />
              </div>
              <div className="my-2">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="OldPassword"
                  placeholder="Repeat New Password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>

              <button className="w-100 btn btn-lg btn-primary my-2">
                Set New Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}