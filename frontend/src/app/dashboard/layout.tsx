import RootRedux from '@/redux/layout'
import '../globals.css'
import { Inter } from 'next/font/google'
import DashboardLayout from '@/components/Layout/Dashboard/DashboardLayout'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = cookies().get('token')
  if (!token) redirect('/user/login')
  return (
    <DashboardLayout token={token?.value}>
        {children}
    </DashboardLayout>
       
  )
}
