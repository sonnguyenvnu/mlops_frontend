import React, { useEffect, useState, useRef } from 'react'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Slider } from 'antd'

const types = [
  {
    id: 0,
    type: 'FLIP',
    title: 'Flip',

    description:
      'Add variability to perspective to help your model be more resilient to camera and subject pitch and yaw.',
    originImg: 'https://app.roboflow.com/images/augmentation/flip.jpg',
    generatedImgs: ['https://app.roboflow.com/images/augmentation/flip.jpg'],
    question: 'How Flip Augmentation Improves Model Performance',
    questionDes: 'Flipping an image can improve model performance in substantial ways.',
    option: {
      flipHorizontal: false,
      flipVertical: false,
    },
  },

  {
    id: 1,
    type: 'ROTATE',
    title: 'Rotate',

    description:
      'Add variability to perspective to help your model be more resilient to camera and subject pitch and yaw.',
    originImg: 'https://app.roboflow.com/images/augmentation/rotate.jpg',
    generatedImgs: [
      'https://app.roboflow.com/images/augmentation/flip.jpg',
      'https://app.roboflow.com/images/augmentation/flip.jpg',
    ],

    question: 'When should I rotate my images? ',
    questionDes: `If orientation doesn'teg they may be taken in portrait/landscape mode or from above`,

    option: {
      clockwise: false,
      counterClockwise: false,
      upsideDown: false,
    },
  },
  {
    id: 2,

    type: 'SHEAR',
    title: 'Shear',

    description:
      'Add variability to perspective to help your model be more resilient to camera and subject pitch and yaw.',
    originImg: 'https://app.roboflow.com/images/augmentation/shear.jpg',
    generatedImgs: [
      'https://app.roboflow.com/images/augmentation/flip.jpg',
      'https://app.roboflow.com/images/augmentation/flip.jpg',
      'https://app.roboflow.com/images/augmentation/flip.jpg',
      'https://app.roboflow.com/images/augmentation/flip.jpg',
    ],
    option: {
      shearHorizontal: 10,
      shearVertical: 20,
    },
  },
  {
    id: 3,

    type: 'GRAYSCALE',
    title: 'Grayscale',

    description:
      'Add variability to perspective to help your model be more resilient to camera and subject pitch and yaw.',
    originImg: 'https://app.roboflow.com/images/augmentation/rgrayscale.jpg',
    generatedImgs: [
      'https://app.roboflow.com/images/augmentation/flip.jpg',
      'https://app.roboflow.com/images/augmentation/flip.jpg',
      'https://app.roboflow.com/images/augmentation/flip.jpg',
      'https://app.roboflow.com/images/augmentation/flip.jpg',
    ],
    option: {
      grayscalePercent: 25,
    },
  },
  {
    id: 4,

    type: 'HUE',
    title: 'Hue',

    description: 'Randomly adjust the colors in the image.',
    originImg: 'https://app.roboflow.com/images/augmentation/hue.jpg',
    generatedImgs: [
      'https://app.roboflow.com/images/augmentation/flip.jpg',
      'https://app.roboflow.com/images/augmentation/flip.jpg',
    ],
    option: { huePercent: 30 },
  },
  {
    id: 5,

    type: 'EXPOSURE',
    title: 'Exposure',

    description:
      'Add variability to image brightness to help your model be more resilient to lighting and camera setting changes.',
    originImg: 'https://app.roboflow.com/images/augmentation/exposure.jpg',
    generatedImgs: [
      'https://app.roboflow.com/images/augmentation/flip.jpg',
      'https://app.roboflow.com/images/augmentation/flip.jpg',
    ],
    option: { exposurePercent: 30 },
  },
  {
    id: 6,

    type: 'CUTOUT',
    title: 'Cutout',

    description:
      'Add variability to perspective to help your model be more resilient to camera and subject pitch and yaw.',
    originImg: 'https://app.roboflow.com/images/augmentation/cutout.jpg',
    generatedImgs: ['https://app.roboflow.com/images/augmentation/flip.jpg'],
    option: {
      cutoutCount: 0,
      cutoutPercent: 0,
    },
  },
]

const StepThree = ({ updateFields }) => {
  const [openOptions, setOpenOptions] = useState(false)
  const [openAugmentation, setOpenAugmentation] = useState(false)
  const [value, setValue] = useState(50)

  function handleChange(event) {
    setValue(event.target.value)
  }

  const goToNextStep = () => {
    updateFields({ isDoneStepThree: true })
  }

  const [selectedType, setSelectedType] = useState(types[0])
  const cancelButtonRef = useRef(null)
  const trainModel = () => {
    setOpenOptions(true)
  }
  return (
    <div className="flex items-center justify-center">
      <Transition.Root show={openOptions} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpenOptions}
        >
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
                  {/* title */}
                  <div className="bg-white p-[10px">
                    <div className="flex justify-between items-center">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Augmentation Options
                        </Dialog.Title>
                      </div>
                      <div className="text-[30px] text-gray-400 mx-auto flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-transparent hover:text-red-200 sm:mx-0 sm:h-10 sm:w-10">
                        <button onClick={() => setOpenOptions(false)}>×</button>
                      </div>
                    </div>

                    <div className="description border text-[14px] p-[15px]">
                      Augmentations create new training examples for your model to learn from.
                    </div>

                    <h3 className="text-[#666] text-[14px] font-[700] p-[15px]">
                      IMAGE LEVEL AUGMENTATIONS
                    </h3>

                    <div className="images-container flex flex-wrap gap-y-4 justify-center">
                      {types.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col justify-between w-[90px] items-center gap-1 item rounded-md hover:shadow overflow-hidden border-transparent hover:border-[#f0f] border-[2px] hover:font-[600] hover:text-[16px] focus:font-[600] focus:text-[16px] px-[3px] pt-[2px] hover:bg-gray-200"
                          onClick={() => {
                            setSelectedType(types[item.id])

                            setOpenAugmentation(true)
                          }}
                        >
                          <img src={item.originImg} alt="" srcset="" className="rounded-md" />
                          <span className="text-gray-600 text-center text-[14px] w-full ">
                            {item.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* button */}
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:px-6 justify-start">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpenOptions(false)}
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

      <Transition.Root show={openAugmentation} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpenAugmentation}
        >
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
                <Dialog.Panel className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-fit max-w-[650px] max-h-[650px] overflow-scroll ">
                  {/* title */}
                  <div className="bg-white px-[15px] py-[5px] shadow">
                    <div className="flex justify-between items-center">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-[24px] font-semibold leading-6 text-gray-900"
                        >
                          {selectedType.title}
                        </Dialog.Title>
                      </div>
                      <div className="text-[30px] text-gray-400 mx-auto flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-transparent hover:text-red-200 sm:mx-0 sm:h-10 sm:w-10">
                        <button onClick={() => setOpenAugmentation(false)}>×</button>
                      </div>
                    </div>
                  </div>

                  <div className="flex min-h-fit h-fit">
                    <div className="flex flex-row justify-center items-center flex-wrap bg-gray-300 w-1/2 min-w-[]">
                      <div className="w-full my-5">
                        <img
                          src="https://app.roboflow.com/images/augmentation/flip.jpg"
                          alt=""
                          className="item-img w-[150px] h-[150px] m-auto object-fill"
                        />
                      </div>

                      {selectedType.generatedImgs.map((url) => (
                        <div className={`w-1/2 m-auto overflow-hidden`}>
                          <div className="p-2  w-full overflow-hidden">
                            <img
                              src="https://app.roboflow.com/images/augmentation/flip.jpg"
                              alt=""
                              className="item-img w-[150px] h-[150px] m-auto  object-fill"
                            />
                            <div></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="w-1/2">
                      <div className="info p-[15px] h-full flex flex-col bg-[#f0f0f0]">
                        <h3 className="text-[15px] font-[700]">{selectedType.title}</h3>
                        <p className="whitespace-normal text-[12px]">{selectedType.description}</p>
                        {selectedType.type === 'FLIP' && (
                          <>
                            <div className="flex flex-col">
                              <label className="inline-flex items-center mt-3">
                                <input
                                  type="checkbox"
                                  checked={selectedType?.option?.flipHorizontal ?? false}
                                  className="form-checkbox h-4 w-4 text-gray-600"
                                  onChange={(event) => {
                                    setSelectedType((pre) => {
                                      const newPre = { ...pre }

                                      newPre.option.flipHorizontal = event.target.checked
                                      return newPre
                                    })
                                  }}
                                />
                                <span className="ml-2 text-gray-700 text-[12px]">Horizontal</span>
                              </label>
                              <label className="inline-flex items-center mt-3">
                                <input
                                  type="checkbox"
                                  className="form-checkbox h-4 w-4 text-gray-600"
                                  value={selectedType?.option?.flipVertical ?? false}
                                  onChange={(event) => {
                                    setSelectedType((pre) => {
                                      const newPre = { ...pre }

                                      newPre.option.flipVertical = event.target.checked
                                      return newPre
                                    })
                                  }}
                                />
                                <span className="ml-2 text-gray-700 text-[12px]">Vertical</span>
                              </label>
                            </div>
                          </>
                        )}
                        {selectedType.type === 'ROTATE' && (
                          <>
                            <div className="flex flex-col">
                              <label className="inline-flex items-center mt-3">
                                <input
                                  type="checkbox"
                                  className="form-checkbox h-4 w-4 text-gray-600"
                                  value={selectedType?.option?.clockwise ?? false}
                                  onChange={(event) => {
                                    setSelectedType((pre) => {
                                      const newPre = { ...pre }

                                      newPre.option.clockwise = event.target.checked
                                      return newPre
                                    })
                                  }}
                                />
                                <span className="ml-2 text-gray-700 text-[12px]">Clockwise</span>
                              </label>
                              <label className="inline-flex items-center mt-3">
                                <input
                                  type="checkbox"
                                  className="form-checkbox h-4 w-4 text-gray-600"
                                  value={selectedType?.option?.counterClockwise ?? false}
                                  onChange={(event) => {
                                    setSelectedType((pre) => {
                                      const newPre = { ...pre }

                                      newPre.option.counterClockwise = event.target.checked
                                      return newPre
                                    })
                                  }}
                                />
                                <span className="ml-2 text-gray-700 text-[12px]">
                                  Counter-Clockwise
                                </span>
                              </label>
                              <label className="inline-flex items-center mt-3">
                                <input
                                  type="checkbox"
                                  className="form-checkbox h-4 w-4 text-gray-600"
                                  value={selectedType?.option?.upsideDown ?? false}
                                  onChange={(event) => {
                                    setSelectedType((pre) => {
                                      const newPre = { ...pre }

                                      newPre.option.upsideDown = event.target.checked
                                      return newPre
                                    })
                                  }}
                                />
                                <span className="ml-2 text-gray-700 text-[12px]">Upside Down</span>
                              </label>
                            </div>
                          </>
                        )}
                        {selectedType.type === 'SHEAR' && (
                          <>
                            <p className="text-center mb-[7px] font-[700] text-[12px] mt-5">
                              Horizontal
                            </p>
                            <Slider
                              className="mt-0"
                              marks={{
                                0: '0°',
                                100: '45°',
                              }}
                              defaultValue={selectedType.option.shearHorizontal}
                              onChange={(value) => {
                                setSelectedType((pre) => {
                                  const newPre = { ...pre }
                                  newPre.option.shearHorizontal = Math.round((value * 45) / 100.0)
                                  return newPre
                                })
                              }}
                              disabled={false}
                              tooltip={{
                                open: true,
                                formatter: (value) => Math.round((value * 45) / 100.0),
                              }}
                            />
                            <p className="text-center mb-[7px] font-[700] text-[12px]">Vertical</p>
                            <Slider
                              className="mt-0"
                              marks={{
                                0: '0°',
                                100: '45°',
                              }}
                              defaultValue={selectedType.option.shearVertical}
                              onChange={(value) => {
                                setSelectedType((pre) => {
                                  const newPre = { ...pre }
                                  newPre.option.shearVertical = Math.round((value * 45) / 100.0)
                                  return newPre
                                })
                              }}
                              disabled={false}
                              tooltip={{
                                open: true,
                                formatter: (value) => Math.round((value * 45) / 100.0),
                              }}
                            />
                          </>
                        )}
                        {selectedType.type === 'GRAYSCALE' && (
                          <>
                            <p className="text-center mb-[7px] font-[700] text-[12px] mt-5">
                              Percent of Outputted Images to Grayscale
                            </p>
                            <Slider
                              className="mt-0"
                              marks={{
                                0: '0%',
                                100: '100%',
                              }}
                              defaultValue={selectedType.option.grayscalePercent}
                              onChange={(value) => {
                                setSelectedType((pre) => {
                                  const newPre = { ...pre }
                                  newPre.option.grayscalePercent = value
                                  return newPre
                                })
                              }}
                              disabled={false}
                              tooltip={{ open: true }}
                            />
                          </>
                        )}
                        {selectedType.type === 'HUE' && (
                          <>
                            <Slider
                              className="mt-5"
                              marks={{
                                0: '0%',
                                100: '100%',
                              }}
                              defaultValue={selectedType.option.huePercent}
                              onChange={(value) => {
                                setSelectedType((pre) => {
                                  const newPre = { ...pre }
                                  newPre.option.huePercent = value
                                  return newPre
                                })
                              }}
                              disabled={false}
                              tooltip={{ open: true }}
                            />
                          </>
                        )}
                        {selectedType.type === 'EXPOSURE' && (
                          <>
                            <Slider
                              className="mt-5"
                              marks={{
                                0: '0%',
                                100: '100%',
                              }}
                              defaultValue={selectedType.option.exposurePercent}
                              onChange={(value) => {
                                setSelectedType((pre) => {
                                  const newPre = { ...pre }
                                  newPre.option.exposurePercent = value
                                  return newPre
                                })
                              }}
                              disabled={false}
                              tooltip={{ open: true }}
                            />
                          </>
                        )}
                        {selectedType.type === 'CUTOUT' && (
                          <>
                            <p className="text-center mb-[7px] font-[700] text-[12px] mt-5">
                              Percent
                            </p>
                            <Slider
                              className="mt-0"
                              marks={{
                                0: '0%',
                                100: '100%',
                              }}
                              defaultValue={selectedType.option.cutoutPercent}
                              onChange={(value) => {
                                setSelectedType((pre) => {
                                  const newPre = { ...pre }
                                  newPre.option.cutoutPercent = value
                                  return newPre
                                })
                              }}
                              disabled={false}
                              tooltip={{ open: true }}
                            />
                            <p className="text-center mb-[7px] font-[700] text-[12px]">Count</p>
                            <Slider
                              className="mt-0"
                              marks={{
                                0: '1',
                                100: '25',
                              }}
                              defaultValue={selectedType.option.cutoutCount}
                              onChange={(value) => {
                                setSelectedType((pre) => {
                                  const newPre = { ...pre }
                                  newPre.option.cutoutCount = Math.round((value * 25) / 100.0)
                                  return newPre
                                })
                              }}
                              disabled={false}
                              tooltip={{
                                open: true,
                                formatter: (value) => Math.round((value * 25) / 100.0),
                              }}
                            />
                          </>
                        )}

                        <div className="mt-auto rounded-md bg-[#d5edf3]  p-4">
                          <h2 className="font-[700] text-[16px]">
                            How Flip Augmentation Improves Model Performance
                          </h2>
                          <p>
                            Flipping an image can improve model performance in substantial ways.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* button */}
                  <div className="bg-gray-50 py-3 flex px-6 justify-between">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpenAugmentation(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-[#5e6dc6] px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => {
                        setSelectedType((pre) => {
                          console.log()
                          return pre.id === types.length - 1 ? types[0] : types[pre.id + 1]
                        })

                        console.log(selectedType)
                      }}
                      ref={cancelButtonRef}
                    >
                      Apply
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="flex flex-col mt-5 items-center justify-center">
        <h1>Training in progress</h1>
        <br />
        <button
          onClick={() => {
            // message.success('Training', 3)
            // goToNextStep()
            trainModel()
          }}
          className="rounded-md bg-indigo-600 py-[6px] px-4 text-white"
          // hidden
        >
          Data Augmentation
        </button>
      </div>
    </div>
  )
}

export default StepThree
