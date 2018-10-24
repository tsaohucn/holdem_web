import Moment from 'moment'

const getSpendTime = (spendTime) => {
  const diff = Moment.duration(spendTime)
  return [Math.floor(diff.asHours()), diff.minutes(), diff.seconds()].join(':')
}

const getTenMinutes = (spendTime) => {
  const diff = Moment.duration(spendTime)
  return Math.floor(diff.asMinutes()/10)
} 

export { getSpendTime, getTenMinutes }