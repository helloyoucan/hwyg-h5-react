/**
 * 金额转换
 */

/** 处理金钱，数据返回的金金额单位都是’分‘，需要转化为元，若小数位0，则忽略小数
 * @param {Number} money 金额
 * @returns {Number} *100并保留两位小数的金额，整数部分每隔三位用逗号分隔
 * */
/*export function money(money:number):string {
    if (isNaN(money)) {
      return ''
    }
    let result = ((money / 100).toFixed(2) * 1)
    if (parseInt(result, 10) > 1000) {
      // ie10下：parseInt(0,10).toLocaleString('en-US')=".00"
      result = result.toLocaleString('en-US').toString()
    } else {
      result = result.toString()
    }
    if (result.indexOf('.00')) {
      result = result.replace('.00', '')
    }
    
    return result
  }*/