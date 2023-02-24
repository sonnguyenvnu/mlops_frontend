import React, { useState } from 'react'
import { UploadTypes } from '../data/constants'
import { uploadFiles } from '../api/project'
import { validateFiles } from '../utils/file'

const UploadFiles = ({ projectID }) => {
  const [fileBlobs, setFileBlobs] = useState([])
  const [files, setFiles] = useState([])

  const handleImageChange = (e) => {
    if (e.target.files) {
      setFiles(e.target.files)
      const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file))

      // console.log("filesArray: ", filesArray);

      setFileBlobs((prevImages) => prevImages.concat(filesArray))
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      )
    }
  }

  const renderPhotos = (source) => {
    return source.map((blobURL) => {
      return <img src={blobURL} alt="" key={blobURL} />
    })
  }

  const uploadImages = async (e) => {
    e.preventDefault()

    const validFiles = validateFiles(files)
    if (validFiles !== undefined && validFiles.length > 0) {
      console.log(`Uploading ${validFiles.length} file(s) to server`)
      const formData = new FormData()
      formData.append('type', UploadTypes.MULTIPLE)
      validFiles.forEach((file) => {
        formData.append('files', file)
      })

      try {
        const res = await uploadFiles(projectID, formData)
        console.log(res)
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div className="app">
      <div className="heading">Upload images</div>
      <div>
        <input type="file" id="file" multiple onChange={handleImageChange} />
        <div className="label-holder">
          <label htmlFor="file" className="label">
            <i className="material-icons">Select</i>
          </label>
        </div>
        <div className="result">{renderPhotos(fileBlobs)}</div>
      </div>
      <div className="container">
        <button className="btn-primary" onClick={uploadImages}>
          Upload
        </button>
      </div>
    </div>
  )
}

export default UploadFiles
