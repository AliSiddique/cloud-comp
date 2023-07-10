"use client"
import { useState } from "react";
import { login,getLoggedIn } from "../../../redux/slices/auth/authSlice";
import { useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";

// we will need this to get redirect path
type LocationState = {
  from: {
    pathname: string;
  };
};

export default function page() {
  // location with redirect path (if available)
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const loggedIn = useSelector(getLoggedIn);
console.log(loggedIn);
  return (
    <div>
      <div
        className="container"
        style={{ paddingTop: "70px", paddingBottom: "70px" }}
      >
        <div className="row">
            <h1 className="text-center">Logged in? {loggedIn}</h1>
          <div className="col-md-4 offset-md-4">
            <form
              className="form-signin"
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(login(email, password));
              }}
            >
              <h1 className="h3 mb-3 fw-normal">Please login</h1>
              <div className="my-2">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="my-2">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                className="w-100 btn btn-lg btn-primary my-2"
                disabled={email === "" || password === ""}
                type="submit"
              >
                Login
              </button>
            </form>
            <p className="my-2">
              <a href="/register">Create account</a>
              <a className="m-3" href="/reset-password">
                Forgot password?
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
