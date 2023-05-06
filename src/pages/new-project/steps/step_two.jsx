import React, { memo } from 'react'
import Preview from '../../preview'

const StepTwo = ({ files, labels, pagination, updateFields }) => {
  const updateFieldsFromStep2 = (value) => {
    updateFields(value)
  }
  return (
    <div>
      <Preview
        images={files}
        savedLabels={labels}
        updateFields={updateFieldsFromStep2}
        next={() => {
          updateFields({
            isDoneStepTwo: true,
          })
        }}
        pagination={pagination}
      />
    </div>
  )
}

export default memo(StepTwo)
