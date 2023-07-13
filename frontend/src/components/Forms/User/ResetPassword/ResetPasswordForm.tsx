"use client"
import { useAppDispatch } from "../../../../redux/store";
import { resetPassword } from "../../../../redux/slices/auth/functions/Function";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from "react";
type FormData = {
    email: string
  }
  
  const schema = yup
    .object({
      email: yup.string().email().required(),
    })
    .required()
  
export default function ResetPasswordForm() {
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormData>({
        resolver: yupResolver(schema),
      })

    const onSubmit = handleSubmit((data:FormData) => {
        setLoading(true);
        const {email } = data;
        dispatch(resetPassword(email)); // dispatch register function
        setLoading(false);
      })
    return (
      <div>
        <form onSubmit={onSubmit}>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Email
        </label>
        <div className="mt-2">
          <input
            type="email"
            {...register("email")}
            id="email"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="you@example.com"
          />
        </div>
        <button disabled={loading} type="submit">Send</button>
        </form>
      </div>
    )
  }
  