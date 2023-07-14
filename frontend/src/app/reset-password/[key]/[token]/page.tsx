import ChangePasswordForm from '@/components/Forms/User/ResetPassword/ChangePasswordForm'
import React from 'react'

type Props = {
    params: {
        key: string
        token: string
    }
}

export default function page({params}: Props) {
  return (
    <div>
        <ChangePasswordForm params={params}/>
    </div>
  )
}