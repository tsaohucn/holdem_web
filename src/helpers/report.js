import Moment from 'moment'
import { extendMoment } from 'moment-range'

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

const getRefereeReportData = (data,startDate,endDate) => {
  const moment = extendMoment(Moment)
  const start = moment(startDate, 'YYYY-MM-DD')
  const end   = moment(endDate, 'YYYY-MM-DD')
  const range = Array.from(moment.range(start, end).by('day', { excludeEnd: false })).map(m => m.format('YYYY/MM/DD'))
  const range_data = range.map(date => ({
    referee_report_date: date,
    referee_rk: 0,
    referee_rk50: 0,
    referee_st: 0
  }))
  return range_data
}

const getRefereeDayReportData = async (data,referee_id,db) => {
  let data_by_table = {}
  data.forEach(ele => {
    if (data_by_table[ele.table_id]) {
      data_by_table[ele.table_id]['totallPlayerSpendTime'] += ele.spendTime
      data_by_table[ele.table_id]['totalPlayerFinallyChip'] += ele.finalChip
    } else {
      data_by_table[ele.table_id] = {
        table_key: ele.table_key,
        referee_day_report_table_id: ele.table_id,
        table_referee_id: ele.table_referee_id,
        totallPlayerSpendTime: ele.spendTime,
        totalPlayerFinallyChip: ele.finalChip,
      }
    }
  })
  const origin_tables_data = Object.values(data_by_table)
  const table_keys = origin_tables_data.map(ele => ele.table_key)
  const tables_promise = table_keys.map(key => db.collection('tables_reports').doc(key).get())
  const tables = await Promise.all(tables_promise)
  const new_tables_data = tables.map(table_doc => {
    if (table_doc.exists) {
      return table_doc.data()
    } else {
      return {}
    }
  })
  const tables_data = origin_tables_data.map((ele,index) => Object.assign({},ele,{
    totalTableFinallyChip: new_tables_data[index]['finalChip'],
    totalTableSpendTime: new_tables_data[index]['spendTime'],
    c: new_tables_data[index]['i'] - new_tables_data[index]['t'],
    i: new_tables_data[index]['i'],
    t: new_tables_data[index]['t'],
    returnT: referee_id === ele.table_referee_id ? new_tables_data[index]['t'] : 0,
    returnI: referee_id === ele.table_referee_id ? new_tables_data[index]['i']*0.2 : 0,
    average: new_tables_data[index]['average']
  }))
  return tables_data
}
export { getSaleReportData, getRefereeReportData, getRefereeDayReportData }