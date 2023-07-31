"use client"
import LoginForm from '@/components/Forms/User/Login/LoginForm'
import React from 'react'
import axios from 'axios'

type Props = {}

export default function page({}: Props) {
  const googleLogin = async() => {
   const res = await axios.post('http://127.0.0.1:8000/dj-rest-auth/google/login/',{
    access_token:"ya29.a0AbVbY6PE0Zh80E1q3Bo2gIEXeEaa68kRvqjiXI5VM7KdKOwnrUGu-Ne7Xfv1jOTIece7SvCpOTL1Bx8Y0LbOQ_gV7yuMN3RrpQJP6gm_quwyyK0mjTvz1v0hjZZ-Z5aqpB7U2nfWU3CUi_3DzNvO2ymuRSsKaCgYKAaYSARISFQFWKvPlOKWz6fp6fiCeF_pzGyog2Q0163"
   })
    console.log(res)

  }
  return (
    <div>
      <button onClick={googleLogin}>Google Login</button>
      <LoginForm />
    </div>
  )
}