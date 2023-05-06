import { message } from 'antd'
import React, { useEffect, useState } from 'react'

const StepThree = (props) => {
  const [processValue, setProcessValue] = useState(0)
  const { experiment_name } = props
  const stopTrainModel = () => {}
  const getTrainingProgress = async (experimentName) => {
    const res = await fetch(
      `${process.env.REACT_APP_ML_SERVICE_ADDR}/accuracy/best?experiment_name=0e98j0w9q3`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await res.json()
    if (res.status === 422) {
    }
    if (res.status === 200) {
      document.getElementById('message').innerHTML = 'Best accuracy so far'
      // setProcessValue(data.accuracy)
    }

    return res.data
  }
  useEffect(() => {
    const interval = setInterval(() => {
      getTrainingProgress(experiment_name)
    }, 3000)

    return () => clearInterval(interval)
  }, [experiment_name])

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col mt-5 items-center justify-center w-full">
        <div className="mt-20 flex justify-center items-center flex-col gap-6 w-full max-w-md">
          <div className="w-full max-w-md">
            <h4 className="sr-only">Status</h4>
            <div className="flex justify-between items-center">
              <p id="message" className="text-[20px] font-medium text-gray-900">
                Provisioning TPU...
              </p>
              <strong className="text-[20px] animate-pulse">{processValue}</strong>
            </div>
            <div className="mt-4" aria-hidden="true">
              <div className="overflow-hidden rounded-full bg-gray-200">
                <div
                  className=" h-2 rounded-full bg-indigo-600"
                  style={{ width: `${processValue}%` }}
                />
              </div>
              <div className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid"></div>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            // message.success('Training', 3)
            // goToNextStep()
            stopTrainModel()
          }}
          className="rounded-md bg-red-600 py-[6px] px-4 text-white"

          // className="rounded-md bg-indigo-600 py-[6px] px-4 text-white"
          // hidden
        >
          Stop
        </button>
      </div>
    </div>
  )
}

export default StepThree
