import React, { useEffect, useRef, useState } from 'react'

const StepOne = ({ name, email, updateFields }) => {
  const inputFile = useRef(null)
  const [images, setImages] = useState([])
  const uploadedImages = (images, savedLabels) => {
    updateFields({ images: images, savedLabels, isDoneStepOne: true })
    setImages(images)
  }
  const [uploadedFiles, setUploadedFiles] = useState([])

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files)
    console.log(files)
    setUploadedFiles(files)
  }
  const handleRemoveFile = (index) => {
    console.log(index)
    setUploadedFiles((prevState) => {
      const newState = [...prevState]
      newState.splice(index, 1)
      return newState
    })
  }

  return (
    <div>
      <h1>Upload images</h1>
      {images?.map((image) => (
        <img src={image.url} alt="Image" />
      ))}

      <form className="bg-white mx-auto my-5 rounded-[1em] max-w-[330px] text-gray-700  overflow-hidden relative p-[0.875em] shadow-lg border border-[#45454512] border-solid ">
        <span className="absolute cursor-pointer text-white font-bold rounded-full flex justify-center items-center top-[10px] right-[10px] h-[30px] w-[30px] bg-[rgb(226,94,54)]">
          X
        </span>
        <div className="content">
          <span className="p-[18px] text-[1.25em] text-black font-[600] flex justify-center leading-[1.2] ">
            Upload a File
          </span>
          <p className="text-[16px] leading-[1.2] text-center p-[18px]">
            Select a file to upload from your computer or device.
          </p>
          <div className="flex justify-center flex-wrap mb-3">
            <label
              htmlFor="file"
              className="rounded-[26px] px-[75px] py-[13px] upload-btn flex border-[0.125rem] border-dashed  border-[hsla(223,10%,50%,0.4)] hover:bg-[hsla(223,10%,60%,0.2)]"
            >
              Choose File
              <input
                hidden
                type="file"
                id="file"
                multiple
                onChange={handleFileChange}
                onClick={(event) => {
                  event.target.value = null
                }}
              />
            </label>
          </div>
          {/* list file uploaded */}

          {uploadedFiles.length ? (
            uploadedFiles.map((file, index) => (
              <div className="result mt-[4px] bg-[rgba(0,140,255,0.062)] flex justify-center relative rounded-[1em]">
                <div className="file-uploaded font-[300] p-[8px]">{file.name}</div>
                <span
                  onClick={(e) => {
                    handleRemoveFile(index)
                    e.currentTarget.value = null
                  }}
                  className="absolute cursor-pointer text-white font-bold rounded-full flex justify-center items-center top-1/2 -translate-y-1/2 right-[10px] h-[30px] w-[30px] bg-[rgb(226,94,54)]"
                >
                  X
                </span>
              </div>
            ))
          ) : (
            <div className="file-uploaded font-[300] p-[8px] text-center">No files uploaded</div>
          )}
        </div>
      </form>

      {/* <UploadFolder projectID="641ac7fd897b5152aaa371e9" uploadedImages={uploadedImages} /> */}
      {/* <UploadFiles projectID="641ac7fd897b5152aaa371e9" uploadedImages={uploadedImages} /> */}
    </div>
  )
}

export default StepOne
