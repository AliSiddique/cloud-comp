"use client"
import React from 'react'
import { setNewPassword } from "../../../../redux/slices/auth/functions/Function";
import { useAppDispatch } from "../../../../redux/store";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
export const randUrl = "-3onr.onrender.com"

type Props = {
    params: {
        key: string
        token: string
    }

}

interface FormData {
    password1: string
    password2: string
}


const schema = yup
  .object({
    password1: yup.string().required(),
    password2: yup.string().required(),
  })
  .required()
export default function ChangePasswordForm({params}:Props) {
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormData>({
        resolver: yupResolver(schema),
      })
      const onSubmit = (data:FormData) => {
        const {password1, password2 } = data;
        dispatch(setNewPassword(key, token, password1, password2)); // dispatch register function
      }
  const { key, token } = params



  return (
    <div>
      <div
        className="container"
        style={{ paddingTop: "70px", paddingBottom: "70px" }}
      >
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="h3 mb-3 fw-normal">Set New Password</h1>
              <div className="my-2">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="Password2"
                  placeholder="New Password"
                  {...register("password1")}
                />
              </div>
              <div className="my-2">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="OldPassword"
                  placeholder="Repeat New Password"
                    {...register("password2")}
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