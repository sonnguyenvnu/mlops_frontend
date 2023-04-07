import React, { useState } from 'react'
import { validateFiles } from '../../../utils/file'
import { UploadTypes } from '../../../assets/data/constants'

const StepFour = () => {
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showPredictModal, setShowPredictModal] = useState(false)
  const [uploadFiles, setUploadFiles] = useState([])
  const [predictFile, setPredictFile] = useState({ url: '', label: '' })

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files)
    const validFiles = validateFiles(files)
    setUploadFiles(validFiles)
    setPredictFile({ url: URL.createObjectURL(validFiles[0]), label: 'tst' })
  }

  const uploadImages = async (e) => {
    e.preventDefault()
    if (uploadFiles !== undefined && uploadFiles.length > 0) {
      console.log(`Uploading ${uploadFiles.length} file(s) to server`)
      const formData = new FormData()
      formData.append('type', UploadTypes.FOLDER)
      for (let i = 0; i < uploadFiles.length; i++) {
        // Convert file name with relative path to base64 string
        const fileNameBase64 = window.btoa(uploadFiles[i].webkitRelativePath)
        formData.append('files', uploadFiles[i], fileNameBase64)
      }

      // TODO: Remove this line
      const projectID = '640da6da6bfb52418c8c966a'
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

  return (
    <>
      <button
        onClick={() => {
          setShowUploadModal(true)
        }}
        className="rounded-md bg-indigo-600 py-[6px] px-4 text-white"
        // hidden
      >
        Predict
      </button>
      <div
        className={`${
          showUploadModal
            ? 'top-0 left-0 bottom-full z-[99999] opacity-100'
            : 'left-0 top-full bottom-0 opacity-0'
        } fixed flex flex-col items-center h-full w-full px-[30px] justify-center bg-white  transition-all duration-500 ease`}
      >
        <button
          onClick={() => {
            setShowUploadModal(false)
            setUploadFiles([])
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
        {/* uploaded */}
        {uploadFiles.length > 0 ? (
          <>
            <div className="text-center mx-auto">
              {uploadFiles.length} Image(s) Ready for Upload
            </div>
            <br />
            <div className="flex justify-between items-center"></div>
            <div className="h-full w-full  flex max-h-[500px] my-5 gap-4">
              <div className="bg-gray-300  w-2/3 rounded-md shadow overflow-hidden py-4">
                <img
                  src={predictFile.url}
                  alt=""
                  className="w-full h-full object-contain rounded-md overflow-hidden"
                />
              </div>
              <div className="w-1/3 bg-blue-50"></div>
            </div>
            <div className="grid grid-cols-6 gap-3 transition-all duration-300">
              {uploadFiles.map((file, index) => (
                <div
                  onClick={() => {
                    console.log({ file })
                    setPredictFile({ url: URL.createObjectURL(file), label: 'test' })
                  }}
                  className="rounded-md overflow-hidden relative group hover:opacity-100"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt=""
                    className="h-[150px] w-full m-0 object-cover"
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <label
            htmlFor="file"
            onClick={() => setShowPredictModal(true)}
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
            <div
              // for="file"
              className="footer  bg-[rgba(0,110,255,0.075)] w-full h-[40px] p-2 flex rounded-[10px] cursor-pointer justify-between border-none text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="h-[130%] fill-[#4169e1] bg-[rgba(70,66,66,0.103)] rounded-full px-[2px] cursor-pointer shadow-[0_2px_30px_rgba(0,0,0,0.205)]"
              >
                <g>
                  <path d="M15.331 6H8.5v20h15V14.154h-8.169z"></path>
                  <path d="M18.153 6h-.009v5.342H23.5v-.002z"></path>
                </g>
              </svg>
              <p>Not selected file</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <g stroke="#000" strokeWidth="2">
                  <path d="M5.166 10.153A2 2 0 017.16 8h9.68a2 2 0 011.994 2.153l-.692 9A2 2 0 0116.148 21H7.852a2 2 0 01-1.994-1.847l-.692-9z"></path>
                  <path strokeLinecap="round" d="M19.5 5h-15"></path>
                  <path d="M10 3a1 1 0 011-1h2a1 1 0 011 1v2h-4V3z"></path>
                </g>
              </svg>
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
