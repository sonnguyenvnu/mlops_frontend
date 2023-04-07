import React, { memo } from 'react'
import Preview from '../../preview'

const StepTwo = ({ files, labels, updateFields }) => {
  const updateStepTwoData = (value) => {
    updateFields({ isDoneStepTwo: true })
  }
  return (
    <div>
      <Preview images={files} savedLabels={labels} next={updateStepTwoData} />
    </div>
  )
}

export default memo(StepTwo)
