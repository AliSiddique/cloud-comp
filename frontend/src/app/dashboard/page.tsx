import { BASEURL } from '@/API/APIRoute'
import axios from 'axios'
import { cookies } from 'next/headers'
import React from 'react'

type Props = {}
// const files = [
//     {
//       name: 'IMG_4985.HEIC',
//       size: '3.9 MB',
//       source:
//         'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
//       current: true,
//     },
//     {
//       name: 'IMG_4985.s',
//       size: '3.9 MB',
//       source:"https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=2600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       current: false,
//     }
//   ]
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  const getUsersPhotos = async () => {
    const token = cookies().get('token')
   const res = await axios.get(`${BASEURL}/api/users-photos`, {
            headers: {
              Authorization: `Token ${token?.value}`,
            },
          })

    const data = res.data
    return res.data
  }
async function page({}: Props) {
  const files = await getUsersPhotos()
  return (
    <div>
    {files.map((file:any) => (
<li key={file.name} className="relative">
<div
    className={classNames(
    file.current
        ? 'ring-2 ring-indigo-500 ring-offset-2'
        : 'focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100',
    'aspect-w-10 aspect-h-7 group block w-full overflow-hidden rounded-lg bg-gray-100'
    )}
>
    <img
    src={file.image}
    alt=""
    className={classNames(
        file.current ? '' : 'group-hover:opacity-75',
        'pointer-events-none object-cover'
    )}
    />
    <button type="button" className="absolute inset-0 focus:outline-none">
    <span className="sr-only">View details for your image</span>
    </button>
</div>
{/* <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
    {file.name}
</p>
<p className="pointer-events-none block text-sm font-medium text-gray-500">{file.size}</p> */}
</li>
))}
    </div>

  )
}

export default page