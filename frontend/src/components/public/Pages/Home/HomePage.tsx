import Footer from '@/components/Layout/Constants/Footer'
import Navbar from '@/components/Layout/Constants/Navbar'
import HomeHero from '@/components/public/Pages/Home/Hero'
import React from 'react'
import { cookies } from 'next/headers'; // Import cookies
import axios from 'axios';

type Props = {}
const getUser = () => {
  const token = cookies().get('token')
  if (!token) return null
  const result = axios.get(`${process.env.BACKEND_URL}/api/auth/user/`,{
      headers: {
          'Authorization': `Token ${token.value}`
      }
  })
  return result
  }
export default async function HomePage({}: Props) {
  const user = await getUser()

  return (
    <div>
      <Navbar userLoggedIn={user ? true : false} />
      <HomeHero />
      <Footer />
    </div>
  )
}