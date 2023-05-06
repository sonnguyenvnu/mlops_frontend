import React, { useEffect, useReducer } from 'react'
import { UploadTypes } from '../../../assets/data/constants'
import Loading from '../../../components/Loading'
import { validateFiles } from '../../../utils/file'

const initialState = {
  showUploadModal: false,
  showPredictModal: false,
  predictFile: { url: '', label: '' },
  uploadFiles: [],
  seletedImage: null,
  isDeploying: false,
  isLoading: false,
  confidences: [],
  confidenceLabel: '',
  confidenceScore: 0,
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
    fetch('http://35.223.5.214:4000/predict', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        const { predictions } = data
        console.log(URL.createObjectURL(validFiles[0]))
        updateState({
          uploadFiles: validFiles,
          seletedImage: validFiles[0],
          confidences: predictions,
          confidenceScore: predictions[0].confidence,
          confidenceLabel: predictions[0].class,
          isLoading: false,
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

  return (
    <>
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
            ? 'top-0 left-0 bottom-full z-[99999] opacity-100'
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
                      {stepFourState.uploadFiles.map((item) => (
                        <div
                          class={`${
                            stepFourState.seletedImage === item
                              ? 'border-4 border-blue-600 border-solid '
                              : ''
                          }bg-[#F3F6F9] rounded-[8px] h-[130px] min-w-[200px] p-2 flex   justify-center `}
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
                  <span>
                    Label:{' '}
                    <strong className="text-blue-700">{stepFourState.confidenceLabel}</strong>
                  </span>
                  <br />
                  Confidence:{' '}
                  <strong className="text-blue-700">{stepFourState.confidenceScore}</strong>
                  <div className="ml-auto w-fit my-5">
                    {stepFourState.isDeploying ? (
                      <button
                        onClick={handleStopDeploy}
                        type="button"
                        className="w-fit inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        Stop
                      </button>
                    ) : (
                      <button
                        onClick={handleDeploy}
                        type="button"
                        className="w-fit inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Deploy
                      </button>
                    )}
                  </div>
                  <div class="h-full min-h-[300px] bg-[#e1e4e8]  p-4 w-full rounded-md mb-5 m-auto flex">
                    {/* <pre className="overflow-auto">
                      <code>{stepFourState.jsonResult}</code>
                    </pre> */}
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
