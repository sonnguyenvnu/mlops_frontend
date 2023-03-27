import React from 'react'
import Preview from '../../preview'

const StepTwo = ({ images, savedLabels }) => {
  return (
    <div>
      <Preview images={images} savedLabels={savedLabels} />
    </div>
  )
}

export default StepTwo
