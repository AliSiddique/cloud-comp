"use client"
import { BASEURL } from '@/API/APIRoute'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { useRouter } from 'next/navigation'

export default function MyModal({isOpen,setIsOpen,token}:any) {
  const [image, setImage] = useState<any>()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  console.log("token",token)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData();
    formData.append("image", image[0]);

    if (token) {
      console.log(token)

      var requestOptions: any = {
          method: "POST",
          body: formData,
          redirect: "follow",
          "Content-type": "multipart/form-data",
          headers: {
              Authorization: `Token ${token}`,
          },
      }

      // Now you can proceed with the fetch request using requestOptions
      await fetch(`${BASEURL}/api/photo`, requestOptions)
          .then((response) => {
            response.text()
          window.location.reload()
          })
          .then((result) => {
            
            console.log(result)
            window.location.reload()

          })
          .catch((error) => console.log("error", error))

  } else {
      console.log("Token is undefined. Cannot make the fetch request.")
  }
    setLoading(false)
  }
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Drop your files here
                  </Dialog.Title>
                  <div className="mt-2">
                   {/* <Empty /> */}
                   <input
                    type="file"
                    className='text-sm font-medium text-gray-900'
                    onChange={(e: any) => setImage(e.target.files)}
                />
                  </div>

                  <div className="mt-4 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleSubmit}
                    >
                      {loading ? <ClipLoader color="#ffffff" loading={loading} size={15} /> : "Upload"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

function Empty() {
    return (
      <button
        type="button"
        className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
          />
        </svg>
        <span className="mt-2 block text-sm font-semibold text-gray-900">Add a file</span>
      </button>
    )
  }
  