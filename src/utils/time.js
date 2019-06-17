/**
 * 解析时间
 * @param {string | Date} time 时间
 * @param {string} cFormat 时间格式
 * @returns {string} 解析后的时间字符串
 */
export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
      return null
    }
    if (time === null) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('the time is null')
      }
      return '无'
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if ((`${time}`).length === 10) {
        time = parseInt(time, 10) * 1000
      }
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getUTCDay()
    }
    const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      if (key === 'a') return ['日', '一', '二', '三', '四', '五', '六'][value]
      if (result.length > 0 && value < 10) {
        value = `0${value}`
      }
      return value || 0
    })
    return timeStr
  }
  
  /**
   * 格式化时间类型
   * @param {Number | Date} time 时间戳/Date对象
   * @param {string} option 时间格式
   * @returns {string} 格式化后的时间字符串
   */
  export function formatTime(time, option) {
    // time = +time * 1000
    const d = new Date(time)
    const now = Date.now()
  
    const diff = (now - d) / 1000
  
    if (diff < 30) {
      return '刚刚'
    } else if (diff < 3600) { // less 1 hour
      return `${Math.ceil(diff / 60)}分钟前`
    } else if (diff < 3600 * 24) {
      return `${Math.ceil(diff / 3600)}小时前`
    } else if (diff < 3600 * 24 * 2) {
      return '1天前'
    }
    if (option) {
      return parseTime(time, option)
    }
    return `${d.getMonth() + 1}月${d.getDate()}日${d.getHours()}时${d.getMinutes()}分`
  }
  
  const ADAY = 24 * 60 * 60 // 一天的秒数
  const AHOUR = 60 * 60 // 一小时的秒数
  const AMINUTE = 60 // 一分钟的秒数
  /**
   * 解析时间戳
   * @param {Number} timestamp 时间戳
   * @return {Object} {{d: number, h: number, i: number, s: number}}日、时、分、秒
   */
  export function parseTimestamp(timestamp) {
    timestamp = parseInt(timestamp / 1000)
    const d = parseInt(timestamp / ADAY, 10)
    timestamp -= d * ADAY
    const h = parseInt(timestamp / AHOUR, 10)
    timestamp -= h * AHOUR
    const i = parseInt(timestamp / AMINUTE, 10)
    timestamp -= i * AMINUTE
    return {
      d, h, i, s: timestamp
    }
  }
  