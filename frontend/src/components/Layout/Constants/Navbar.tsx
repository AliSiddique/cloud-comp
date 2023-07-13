"use client"
import React from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { useAppDispatch } from '@/redux/store';
import { logout } from '@/redux/slices/auth/functions/Function';


const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
  ]

interface User {
    userLoggedIn: boolean
}
export default async function Navbar({userLoggedIn}: User) {
    const dispatch = useAppDispatch()
    
  return (
    <div>

      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt=""
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-white">
                {item.name}
              </a>
            ))}
          </div>
   
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                {userLoggedIn ? (
                    <button onClick={() => dispatch(logout())} className="text-sm font-semibold leading-6 text-white">
                        Log out <span aria-hidden="true">&rarr;</span>
                    </button>
                ):(
                    <button className="text-sm font-semibold leading-6 text-white">
                    Log in <span aria-hidden="true">&rarr;</span>
                  </button>
                )}
           
          </div>
          
      
        </nav>
      
      </header>
    </div>
  )
}