import dictionary from './dictionary'
import { removeTone, convertToneToNumber } from './utils'

const SPACE = ' '
const EMPTY = ''
const REGEXP = /[\u4E00-\u9FA5]/g

const keys = Object.keys(dictionary)

export default (str, options = {}) => {
  let result = str.match(REGEXP)
  if (!result) {
    return str
  }

  result = result.join(EMPTY)

  for (const key of keys) {
    if (~result.indexOf(key)) {
      result = result.replace(new RegExp(key, 'g'), `${SPACE}${options.firstCharacter ? dictionary[key].split(SPACE).map(t => t.substring(0, 1)).join(SPACE) : dictionary[key]}`)
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

  if (options.keepRest && options.removeSpace) {
    result = result.split(SPACE)
    result = str.replace(REGEXP, () => result.shift())
  } else if (options.keepRest && !options.removeSpace) {
    result = result.split(SPACE)
    result = str.replace(REGEXP, (__match, offset) => {
      REGEXP.lastIndex = 0
      return `${REGEXP.test(str[offset - 1]) ? SPACE : EMPTY}${result.shift()}`
    })
  } else if (!options.keepRest && options.removeSpace) {
    result = result.replace(new RegExp(SPACE, 'g'), EMPTY)
  }

  return result
}
