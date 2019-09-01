import dictionary from './dictionary'
import { removeTone, convertToneToNumber } from './utils'

const REGEXP = /[\u4E00-\u9FA5]/g

const keys = Object.keys(dictionary)

export default (str, options = {}) => {
  let result = str.match(REGEXP)
  if (!result) {
    return str
  }

  result = result.join('')

  for (let key of keys) {
    if (~result.indexOf(key)) {
      result = result.replace(new RegExp(key, 'g'), ` ${options.firstCharacter ? dictionary[key].split(' ').map(t => t.substring(0, 1)).join(' ') : dictionary[key]}`)
      REGEXP.lastIndex = 0
      if (!REGEXP.test(result)) {
        break
      }
    }
  }

  result = result.trim()

  if (options.toneToNumber || options.toneToNumberOnly) {
    result = convertToneToNumber(result, options.toneToNumberOnly)
  } else if (options.removeTone) {
    result = removeTone(result)
  }

  if (options.keepRest) {
    result = result.split(' ')
    result = str.replace(REGEXP, () => ` ${result.shift()} `)
  }

  return result
}
