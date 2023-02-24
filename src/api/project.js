import instance from './axios'

const uploadFiles = (projectID, files) => {
  const options = {
    headers: { 'Content-Type': 'multipart/form-data' },
  }
  return instance.post(`/projects/${projectID}/upload`, files, options)
}

export { uploadFiles }
