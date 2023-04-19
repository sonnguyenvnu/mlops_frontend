import instance from './axios'

const uploadFiles = (projectID, files) => {
  const options = {
    headers: { 'Content-Type': 'multipart/form-data' },
  }
  return instance.post(`/projects/${projectID}/upload`, files, options)
}

const listImages = (projectID) => {
  return instance.get(`/images?project_id=${projectID}`)
}

const trainModel = (projectID) => {
  return instance.post(`/projects/${projectID}/train`)
}

export { uploadFiles, listImages, trainModel }
