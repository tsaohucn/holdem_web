import Moment from 'moment'

const getSpendTime = (spendTime) => {
  const diff = Moment.duration(spendTime)
  return [Math.floor(diff.asHours()), diff.minutes()].join(':')
}

const getTenMinutes = (spendTime) => {
  const diff = Moment.duration(spendTime)
  return Math.floor(diff.asMinutes()/10)
}

const getTotalSpendTime = (spendTime) => {
  const diff = Moment.duration(spendTime)
  return [Math.floor(diff.asHours()), diff.minutes()].join('.')
}

const getScore = (spendTime,table_level) => {
  const totalSpendTime = getTotalSpendTime(spendTime)
  switch(table_level) {
  case '10/20':
    return totalSpendTime*1
  case '20/20':
    return totalSpendTime*2
  case '20/40':
    return totalSpendTime*3
  case '25/50':
    return totalSpendTime*4
  case '50/100':
    return totalSpendTime*5
  case '100/200':
    return totalSpendTime*6
  default:
    return 0
  }
}

const getC = (totalFinallyChip,t,i) => {
  return totalFinallyChip - t - i
}

export { getSpendTime, getTenMinutes, getTotalSpendTime, getScore, getC }