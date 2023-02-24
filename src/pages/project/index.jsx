import React from 'react'
import UploadFiles from '../../components/UploadFiles'

const Project = () => {
  const projectID = '63f39e3883848f340ef0587c'
  return (
    <div>
      {/* <UploadFolder projectID={projectID} /> */}
      <UploadFiles projectID={projectID} />
    </div>
  )
}

export default Project
