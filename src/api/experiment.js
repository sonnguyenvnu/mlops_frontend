import instance from './axios'

const getTrainingHistory = (experimentName) => {
  return instance.get(`experiments/train-history?experiment_name=${experimentName}`)
}

export { getTrainingHistory }
