//import Moment from 'moment'
/*
const getTotalSpendTime = (spendTime) => {
  const diff = Moment.duration(spendTime)
  return [Math.floor(diff.asHours()), diff.minutes()].join('.')
}

const getC = (totalFinallyChip,t,i) => {
  return totalFinallyChip - t - i
}
*/

const getSaleReportData = (data) => {
  const data_by_day = {}
  data.forEach(ele => {
    if (data_by_day[ele.onTableDate]) {
      data_by_day[ele.onTableDate].push(ele)
    } else {
      data_by_day[ele.onTableDate] = [ele]
    }
  })
  const data_by_day_by_sort_by_total = Object.values(data_by_day).map(data => {
    data.sort((a,b) => {return a.referee_id.localeCompare(b.referee_id)})
    let sort_total_data = []
    let referee_id = null
    let totalScore = 0
    let totalSpendTime = 0
    data.forEach((ele,index) => {
      if (referee_id) {
        if (referee_id === ele.referee_id) {
          totalScore = totalScore + ele.score
          totalSpendTime = totalSpendTime + ele.spendTime
        } else {
          sort_total_data.push({
            referee_id,
            totalScore: parseFloat(totalScore.toFixed(2)),
            totalSpendTime: parseFloat(totalSpendTime.toFixed(2))
          })
          referee_id = ele.referee_id
          totalScore = ele.score
          totalSpendTime = ele.spendTime
        }
      } else {
        referee_id = ele.referee_id
        totalScore = totalScore + ele.score
        totalSpendTime = totalSpendTime + ele.spendTime
      }
      sort_total_data.push(ele)
      if (index === data.length -1) {
        sort_total_data.push({
          referee_id,
          totalScore: parseFloat(totalScore.toFixed(2)),
          totalSpendTime: parseFloat(totalSpendTime.toFixed(2))
        })        
      }
    })
    return sort_total_data
  }).flat()
  let totalScore = 0
  let totalSpendTime = 0
  data_by_day_by_sort_by_total.forEach(ele => {
    if (!ele.onTableDate) {
      totalScore = totalScore + ele.totalScore
      totalSpendTime = totalSpendTime + ele.totalSpendTime
    }
  })
  data_by_day_by_sort_by_total.push({
    totalScore: parseFloat(totalScore.toFixed(2)),
    totalSpendTime: parseFloat(totalSpendTime.toFixed(2))
  })
  return data_by_day_by_sort_by_total
}

export { getSaleReportData }