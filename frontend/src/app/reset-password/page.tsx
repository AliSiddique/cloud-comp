"use client"
import React from 'react'
import { resetPassword } from "../../redux/slices/auth/authSlice";
import { useAppDispatch } from "../../redux/store";

type Props = {}

export default function page({}: Props) {
    const [email, setEmail] = React.useState("");
    const dispatch = useAppDispatch();
  return (
    <div>
        <h1>Reset Password</h1>
        <form onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(resetPassword(email));
              }}>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" id="email" placeholder="Email" />
                <button type="submit">submit</button>
        </form>
    </div>
  )
}