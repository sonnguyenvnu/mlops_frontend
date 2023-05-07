import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useReducer } from 'react'
import { UploadTypes } from '../../../assets/data/constants'
import Loading from '../../../components/Loading'
import { validateFiles } from '../../../utils/file'

const initialState = {
  showUploadModal: false,
  showPredictModal: false,
  showResultModal: false,
  predictFile: { url: '', label: '' },
  uploadFiles: [],
  seletedImage: null,
  isDeploying: false,
  isLoading: false,
  confidences: [],
  confidenceLabel: '',
  confidenceScore: 0,
  userConfirm: [],
}
const StepFour = (props) => {
  const { experiment_name } = props
  const [stepFourState, updateState] = useReducer(
    (pre, next) => ({ ...pre, ...next }),
    initialState
  )

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files)
    const validFiles = validateFiles(files)

    const formData = new FormData()
    validFiles.forEach((file, index) => {
      formData.append(`${index}`, file)
    })
    updateState({
      isLoading: true,
    })
    fetch(`https://8a23-34-125-252-20.ngrok-free.app/predict`, {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        const { predictions } = data
        console.log(URL.createObjectURL(validFiles[0]))
        const images = predictions.map((item) => ({
          id: item.key,
          value: null,
          label: item.class,
        }))
        updateState({
          uploadFiles: validFiles,
          seletedImage: validFiles[0],
          confidences: predictions,
          confidenceScore: parseFloat(predictions[0].confidence),
          confidenceLabel: predictions[0].class,
          isLoading: false,
          userConfirm: images,
        })
      })
  }

  const uploadImages = async (e) => {
    e.preventDefault()
    if (stepFourState.uploadFiles !== undefined && stepFourState.uploadFiles.length > 0) {
      console.log(`Uploading ${stepFourState.uploadFiles.length} file(s) to server`)
      const formData = new FormData()
      formData.append('type', UploadTypes.FOLDER)
      for (let i = 0; i < stepFourState.uploadFiles.length; i++) {
        // Convert file name with relative path to base64 string
        const fileNameBase64 = window.btoa(stepFourState.uploadFiles[i].webkitRelativePath)
        formData.append('files', stepFourState.uploadFiles[i], fileNameBase64)
      }

      // TODO: Remove this line
      const projectID = '641ac7fd897b5152aaa371e9'
      try {
        // const { data } = await projectAPI.uploadFiles(projectID, formData)
        // console.log(data)
        // uploadedImages(data.files, data.labels)
      } catch (error) {
        console.error(error)
      }
    }

    // TODO: validate folder structure
    // Nêú folder chỉ có toàn ảnh không có folder con thì hiển thị lỗi
  }

  const handleDeploy = async () => {
    updateState({ isDeploying: true })
    console.log(stepFourState.uploadFiles)
  }
  const handleStopDeploy = async () => {
    updateState({ isDeploying: false })
  }
  const handleSeletedImage = async (item) => {
    const fileIndex = stepFourState.uploadFiles.findIndex((file) => file.name === item.name)
    updateState({
      seletedImage: item,
      confidenceScore: stepFourState.confidences[fileIndex].confidence,
      confidenceLabel: stepFourState.confidences[fileIndex].class,
    })
  }
  const handleConfirmImage = (value) => {
    const currentImageSeletedIndex = stepFourState.uploadFiles.findIndex(
      (file) => file.name === stepFourState.seletedImage.name
    )
    updateState({
      userConfirm: stepFourState.userConfirm.map((item, index) => {
        if (index === currentImageSeletedIndex) {
          return { ...item, value: value }
        }
        return item
      }),
    })
  }
  return (
    <>
      <Transition.Root show={stepFourState.showResultModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[999999]"
          onClose={(value) => {
            updateState({ showResultModal: value })
          }}
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
                  <div className="bg-white p-[10px] divide-y-2 divide-solid divide-slate-50">
                    <div className="flex justify-between items-center mb-5">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Prediction Result
                        </Dialog.Title>
                      </div>
                      <div className="text-[30px] text-gray-400 mx-auto flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-transparent hover:text-red-200 sm:mx-0 sm:h-10 sm:w-10">
                        <button
                          onClick={() =>
                            updateState({
                              showResultModal: false,
                            })
                          }
                        >
                          ×
                        </button>
                      </div>
                    </div>

                    <h3 className="text-[#666] text-[14px] font-[700] p-[15px]">
                      Total Prediction:{' '}
                      <strong className="text-blue-600">{stepFourState.uploadFiles?.length}</strong>
                    </h3>

                    <h3 className="text-[#666] text-[14px] font-[700] p-[15px]">
                      Correct Prediction:{' '}
                      <strong className="text-blue-600">
                        {' '}
                        {stepFourState.userConfirm.filter((item) => item.value === 'true')?.length}
                      </strong>
                    </h3>

                    <h3 className="text-[#666] text-[14px] font-[700] p-[15px]">
                      Correct Prediction:{' '}
                      <strong className="text-blue-600">
                        {parseFloat(
                          stepFourState.userConfirm.filter((item) => item.value === 'true')
                            ?.length / stepFourState.uploadFiles?.length
                        ).toFixed(2)}
                      </strong>
                    </h3>

                    <div className="images-container flex flex-wrap gap-y-4 justify-center"></div>
                  </div>
                  {/* button */}
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:px-6 justify-start">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => updateState({ showResultModal: false })}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="ml-auto w-fit inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={() => updateState({ showResultModal: false })}
                    >
                      Deploy
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="mt-20 flex justify-center items-center flex-col gap-6">
        <button
          onClick={() => {
            updateState({ showUploadModal: true })
          }}
          className="rounded-md bg-indigo-600 py-[6px] px-4 text-white"
          // hidden
        >
          Predict
        </button>
      </div>
      <div
        className={`${
          stepFourState.showUploadModal
            ? 'top-0 left-0 bottom-full z-[1000] opacity-100'
            : 'left-0 top-full bottom-0 opacity-0'
        } fixed flex flex-col items-center h-full w-full px-[30px] justify-center bg-white  transition-all duration-500 ease overflow-auto`}
      >
        <button
          onClick={() => {
            updateState(initialState)
          }}
          className="absolute top-5 right-5 p-[12px] rounded-full bg-white hover:bg-gray-300 hover:text-white font-[600] w-[48px] h-[48px]"
        >
          <svg
            class="hover:scale-125 hover:fill-red-500"
            focusable="false"
            viewBox="0 0 24 24"
            color="#69717A"
            aria-hidden="true"
            data-testid="close-upload-media-dialog-btn"
          >
            <path d="M18.3 5.71a.9959.9959 0 00-1.41 0L12 10.59 7.11 5.7a.9959.9959 0 00-1.41 0c-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"></path>
          </svg>
        </button>
        {stepFourState.isLoading && <Loading />}

        {/* uploaded */}
        {stepFourState.uploadFiles.length > 0 ? (
          <>
            <div className="mx-auto mt-8 w-full grid grid-cols-1 gap-6 sm:px-6 lg:max-w-[1600px] lg:grid-flow-col-dense justify-center items-center lg:grid-cols-6 h-full ">
              <div className="col-span-4">
                <section>
                  <div className="bg-white shadow sm:rounded-lg p-5">
                    <div
                      class={`${
                        stepFourState.seletedImage ? '' : 'animate-pulse'
                      } h-[400px] bg-[#e1e4e8]  p-4 w-full rounded-md mb-5 m-auto flex justify-center `}
                    >
                      {stepFourState.seletedImage && (
                        <img
                          src={URL.createObjectURL(stepFourState.seletedImage)}
                          className="object-contain rounded-[8px]"
                        />
                      )}
                    </div>

                    <div className="flex gap-5 overflow-x-scroll overflow-y-hidden mt-10">
                      {stepFourState.uploadFiles.map((item, index) => (
                        <div
                          class={`${
                            typeof stepFourState?.userConfirm[index].value === 'string'
                              ? stepFourState?.userConfirm[index].value === 'true'
                                ? 'border-4 border-green-500 border-solid'
                                : 'border-4 border-red-600 border-solid'
                              : ''
                          } bg-[#F3F6F9] rounded-[8px] h-[130px] min-w-[200px] p-2 flex   justify-center `}
                          onClick={() => handleSeletedImage(item)}
                        >
                          <img
                            src={URL.createObjectURL(item)}
                            className="object-contain  rounded-[8px]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>

              <section aria-labelledby="timeline-title" className="lg:col-span-2">
                <div className="bg-white text-base font-medium px-4 py-5 shadow sm:rounded-lg sm:px-6">
                  <div className="flex w-full justify-end items-center">
                    {!stepFourState.userConfirm.some((item) => item.value === null) && (
                      <button
                        onClick={(e) => {
                          updateState({ showResultModal: true })
                        }}
                        type="button"
                        className="ml-auto w-fit inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        View Result
                      </button>
                    )}
                  </div>
                  <div className="ml-auto my-5 flex gap-5 justify-between w-full">
                    <button
                      onClick={(e) => handleConfirmImage('false')}
                      type="button"
                      className="w-fit inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Incorrect
                    </button>
                    <button
                      onClick={(e) => handleConfirmImage('true')}
                      type="button"
                      className="w-fit inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Correct
                    </button>
                  </div>
                  <div class="h-full min-h-[300px] bg-[#e1e4e8]  p-4 w-full rounded-md mb-5 m-auto flex">
                    <div className="bg-[#49525e] rounded-2xl border-2 border-dashed border-gray-200 text-white h-fit px-4 py-1">
                      <span>
                        {stepFourState.confidenceLabel}:{' '}
                        <strong> {parseFloat(stepFourState.confidenceScore).toFixed(2)}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </>
        ) : (
          <label
            htmlFor="file"
            onClick={() => updateState({ showPredictModal: true })}
            // for="file"
            className="flex flex-col w-[95%] cursor-pointer mt-10 shadow justify-between mx-auto items-center p-[10px] gap-[5px] bg-[rgba(0,110,255,0.041)] h-[300px] rounded-[10px] "
          >
            <div className="header flex flex-1 w-full border-[2px] justify-center items-center flex-col border-dashed border-[#4169e1] rounded-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                fill="none"
                viewBox="0 0 100 100"
              >
                <mask
                  id="mask0_908_734"
                  style={{ maskType: 'alpha' }}
                  width="100"
                  height="100"
                  x="0"
                  y="0"
                  maskUnits="userSpaceOnUse"
                >
                  <path fill="#D9D9D9" d="M0 0H100V100H0z"></path>
                </mask>
                <g mask="url(#mask0_908_734)">
                  <path
                    fill="#65A4FE"
                    d="M45.833 83.333h-18.75c-6.319 0-11.718-2.187-16.195-6.562-4.481-4.375-6.721-9.722-6.721-16.042 0-5.416 1.632-10.243 4.896-14.479 3.263-4.236 7.534-6.944 12.812-8.125 1.736-6.389 5.208-11.562 10.417-15.52 5.208-3.96 11.11-5.938 17.708-5.938 8.125 0 15.017 2.829 20.675 8.487 5.661 5.661 8.492 12.554 8.492 20.68 4.791.555 8.768 2.62 11.929 6.195 3.158 3.578 4.737 7.763 4.737 12.554 0 5.209-1.822 9.636-5.466 13.284-3.648 3.644-8.075 5.466-13.284 5.466H54.167V53.542L60.833 60l5.834-5.833L50 37.5 33.333 54.167 39.167 60l6.666-6.458v29.791z"
                  ></path>
                </g>
              </svg>
              <p className="text-center text-black">Browse File to upload!</p>
            </div>
            <input
              id="file"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
              onClick={(event) => {
                event.target.value = null
              }}
            />
          </label>
        )}
      </div>
    </>
  )
}

export default StepFour
