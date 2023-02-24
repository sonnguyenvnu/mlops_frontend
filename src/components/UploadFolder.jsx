import React, { useState } from 'react'
import { uploadFiles } from '../api/project'
import { UploadTypes } from '../data/constants'
import { validateFiles } from '../utils/file'

const UploadFolder = ({ projectID }) => {
  const [files, setFiles] = useState([])

  const handleImageChange = (e) => {
    if (e.target.files) {
      setFiles(e.target.files)
    }
  }

  // const renderPhotos = (source) => {
  //   return source.map((blobURL) => {
  //     return <img src={blobURL} alt="" key={blobURL} />
  //   })
  // }

  const uploadFolder = async (e) => {
    e.preventDefault()

    const validFiles = validateFiles(files)
    if (validFiles !== undefined && validFiles.length > 0) {
      console.log(`Uploading ${validFiles.length} file(s) to server`)
      const formData = new FormData()
      formData.append('type', UploadTypes.FOLDER)
      for (let i = 0; i < validFiles.length; i++) {
        // Convert file name with relative path to base64 string
        const fileNameBase64 = window.btoa(validFiles[i].webkitRelativePath)
        formData.append('files', validFiles[i], fileNameBase64)
      }

      try {
        const res = await uploadFiles(projectID, formData)
        console.log(res)
      } catch (error) {
        console.error(error)
      }
    }

    // TODO: validate folder structure
    // Nêú folder chỉ có toàn ảnh không có folder con thì hiển thị lỗi
  }

  return (
    <div>
      <form encType="multipart/form-data">
        <input type="file" name="files" webkitdirectory="true" onChange={handleImageChange} />
        <input type="submit" value="Upload" onClick={uploadFolder} />
      </form>
    </div>
  )
}

export default UploadFolder
