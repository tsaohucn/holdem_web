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
          totalScore += ele.score
          totalSpendTime += ele.spendTime
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
        totalScore += ele.score
        totalSpendTime += ele.spendTime
      }
      sort_total_data.push(ele)
      if (index === data.length -1) {
        sort_total_data.push({
          totalScore: parseFloat(totalScore.toFixed(2)),
          totalSpendTime: parseFloat(totalSpendTime.toFixed(2)),
          referee_id
        })        
      }
    })
    return sort_total_data
  }).flat()
  let totalScore = 0
  let totalSpendTime = 0
  data_by_day_by_sort_by_total.forEach(ele => {
    if (!ele.onTableDate) {
      totalScore += ele.totalScore
      totalSpendTime += ele.totalSpendTime
    }
  })
  data_by_day_by_sort_by_total.push({
    totalScore: parseFloat(totalScore.toFixed(2)),
    totalSpendTime: parseFloat(totalSpendTime.toFixed(2))
  })
  return data_by_day_by_sort_by_total
}

const getDateRange = (startDate,endDate) => {
  const moment = extendMoment(Moment)
  const start = moment(startDate, 'YYYY-MM-DD')
  const end   = moment(endDate, 'YYYY-MM-DD')
  const date_range = Array.from(moment.range(start, end).by('day', { excludeEnd: false })).map(m => m.format('YYYY/MM/DD'))
  return date_range
}

const getRefereeReportData = async (data,referee_id,db,dateRange) => {
  const referee_total_data_promise = data.map(referee_day_data => getRefereeDayReportData(referee_day_data,referee_id,db))
  const referee_total_data = await Promise.all(referee_total_data_promise)
  const referee_final_data = referee_total_data.map((referee_day_data,index) => {
    let referee_rb = 0
    let referee_st = 0
    referee_day_data.forEach(data => {
      referee_rb += data.referee_rb
      referee_st += data.referee_st
    })
    return({
      referee_report_date: dateRange[index],
      referee_rb,
      referee_st,
      returnClub: parseFloat((referee_st - referee_rb).toFixed(4))
    })   
  })
  return referee_final_data
}

const getRefereeDayReportData = async (data,referee_id,db) => {
  let data_by_table = {}
  data.forEach(ele => {
    if (data_by_table[ele.table_id]) {
      data_by_table[ele.table_id]['totallPlayerSpendTime'] += ele.spendTime
      data_by_table[ele.table_id]['totalPlayerFinallyChip'] += ele.finalChip
      data_by_table[ele.table_id]['member_rb'] += (ele.rbPercentage/100)*ele.spendTime
    } else {
      data_by_table[ele.table_id] = {
        table_key: ele.table_key,
        referee_day_report_table_id: ele.table_id,
        table_referee_id: ele.table_referee_id,
        totallPlayerSpendTime: ele.spendTime,
        totalPlayerFinallyChip: ele.finalChip,
        member_rb: (ele.rbPercentage/100)*ele.spendTime
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
  const tables_data = origin_tables_data.map((ele,index) => {
    const average = new_tables_data[index]['average']
    const returnT = referee_id === ele.table_referee_id ? new_tables_data[index]['t'] : 0
    const returnI = referee_id === ele.table_referee_id ? new_tables_data[index]['i']*0.2 : 0
    const referee_rb = average*ele.member_rb
    return Object.assign({},ele,{
      totalTableFinallyChip: new_tables_data[index]['finalChip'],
      totalTableSpendTime: new_tables_data[index]['spendTime'],
      c: new_tables_data[index]['i'] - new_tables_data[index]['t'],
      i: new_tables_data[index]['i'],
      t: new_tables_data[index]['t'],
      returnT,
      returnI: parseFloat(returnI.toFixed(2)),
      average: parseFloat(average.toFixed(4)),
      referee_rb: parseFloat(referee_rb.toFixed(4)),
      referee_st: parseFloat((ele.totallPlayerSpendTime + referee_rb + returnT + returnI).toFixed(4))
    })})
  return tables_data
}

const getMemberReportData = async (data,db) => {
  const table_keys = data.map(ele => ele.table_key)
  const tables_promise = table_keys.map(key => db.collection('tables_reports').doc(key).get())
  const tables = await Promise.all(tables_promise)
  const tables_data = tables.map((table_doc,index) => {
    if (table_doc.exists) {
      const table = table_doc.data()
      return Object.assign({},data[index],{
        member_rk: parseFloat((table.average*data[index].spendTime).toFixed(2)),
        rb: parseFloat((table.average*(data[index].rbPercentage/100)*data[index].spendTime).toFixed(2))
      })
    } else {
      return {}
    }
  })
  return tables_data
}
export { getSaleReportData, getRefereeReportData, getRefereeDayReportData, getMemberReportData, getDateRange }