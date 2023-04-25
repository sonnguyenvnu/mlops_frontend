import React, { useEffect, useState, useRef } from 'react'
import { Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { message } from 'antd'
import useIntervalFetch from '../../hooks/useIntervalFetch'
import Loading from '../../components/Loading'
import { trainModel } from '../../api/project'

const LabelSelector = ({ current, labels, setLabels }) => {
  const [currentLabel, setCurrentLabel] = useState(current)
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  const newLabelRef = useRef(null)

  const handleOnChange = (e) => {
    if (e.target.value === 'new') {
      setOpen(true)
    } else {
      setCurrentLabel(e.target.value)
    }
  }

  return (
    <div>
      <select
        className="absolute mt-1 block rounded-md border-white py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bottom-0 left-0 w-fit border bg-[#1e2a37e6] text-white"
        onChange={handleOnChange}
        defaultValue={labels && labels.length === 0 ? 'unknown' : currentLabel}
        value={currentLabel}
      >
        {!labels && <option value="unknown">unknown</option>}
        {labels &&
          labels.map((label) => (
            <option key={label.id} value={label.value}>
              {label.value}
            </option>
          ))}
        <option value="new">Create label</option>
      </select>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Create a label
                        </Dialog.Title>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="label"
                            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="New label"
                            ref={newLabelRef}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => {
                        console.log(newLabelRef.current.value)
                        setOpen(false)
                        const label = newLabelRef.current.value
                        setLabels([label, ...labels])
                        // setCurrentLabel(label)
                      }}
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}

const Preview = ({ images, savedLabels, next }) => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const [projectId, setProjectId] = useState(searchParams.get('id'))
  const [labels, setLabels] = useState(savedLabels)
  const [triggerFetch, setTriggerFetch] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { data } = useIntervalFetch(
    'https://jsonplaceholder.typicode.com/posts/1',
    1000,
    null,
    triggerFetch,
    true
  )
  const handleTrain = async () => {
    setTriggerFetch(true)
    try {
      const { data } = await trainModel(projectId)
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }
  const handleDeploy = async () => {
    // show loading
    setIsLoading(true)
    const res = await fetch(`${process.env.REACT_APP_ML_SERVICE_ADDR}/clf/deploy`)
    const data = await res.json()
    console.log(data)
    setIsLoading(false)
    // jump to next step
    next()
    next()
  }

  const handleStopTrain = async () => {
    // setTriggerFetch(false)
    try {
      const { data } = await trainModel(projectId)
      console.log(data)
    } catch (error) {
      console.error(error)
    }
    // fetch(`${process.env.REACT_APP_ML_SERVICE_ADDR}/clf/stop`)
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.error(err))
  }
  // useEffect(() => {
  //   console.log('data', data)
  //   if (data) {
  //     setTimeout(() => {
  //       message.success('Training completed', 3)
  //       setTriggerFetch(false)
  //     }, 5000)
  //   }
  // }, [data])

  return (
    <div className="container w-full mx-auto">
      {isLoading && <Loading />}
      {/* <div className="flex justify-between items-center mt-5">
        <label>Flowers</label>
        <button>Models</button>
      </div> */}
      <div className="flex flex-col bg-white shadow-xl rounded-md h-full p-10">
        <div className="flex justify-between items-center w-full my-5">
          <label>Label all your images to start training process</label>
          {!data ? (
            <button
              onClick={handleTrain}
              className="rounded-md bg-indigo-600 py-[6px] px-4 text-white"
            >
              Train Model
            </button>
          ) : (
            <>
              {triggerFetch ? (
                <button
                  onClick={handleStopTrain}
                  className="rounded-md bg-red-600 py-[6px] px-4 text-white"
                >
                  Stop
                </button>
              ) : (
                <button
                  onClick={handleDeploy}
                  className="rounded-md bg-indigo-600 py-[6px] px-4 text-white"
                >
                  Deploy
                </button>
              )}
            </>
          )}
        </div>
        <div>
          <div className="grid grid-cols-4 gap-4">
            {images &&
              images.map((image) => (
                <div className="relative flex justify-center hover:border hover:border-red-500 rounded-md overflow-hidden">
                  <img src={image.url} alt="" />
                  <LabelSelector
                    current={image.label ?? 'unlabeled'}
                    labels={savedLabels}
                    setLabels={setLabels}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview
