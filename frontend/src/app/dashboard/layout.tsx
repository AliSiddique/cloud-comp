import RootRedux from '@/redux/layout'
import '../globals.css'
import { Inter } from 'next/font/google'
import DashboardLayout from '@/components/Layout/Dashboard/DashboardLayout'
import { cookies } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = cookies().get('token')
  return (
    <DashboardLayout token={token?.value}>
        {children}
    </DashboardLayout>
       
  )
}
