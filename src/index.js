import dictionary1 from './dictionary/dictionary_1'
import dictionary2 from './dictionary/dictionary_2'
import dictionary3 from './dictionary/dictionary_3'
import dictionary4 from './dictionary/dictionary_4'
import dictionary5 from './dictionary/dictionary_5'
import dictionary6 from './dictionary/dictionary_6'
import surnames from './dictionary/surnames'
import { removeTone, convertToneToNumber } from './utils'

const REGEXP = /[\u4E00-\u9FA5]/g

const dictionarys = [
  dictionary1,
  dictionary2,
  dictionary3,
  dictionary4,
  dictionary5,
  dictionary6,
  surnames
]

export default (str, options = {}) => {
  let result = str.match(REGEXP).join('')

  let i = 0
  let lens = dictionarys.length
  for (; i < lens; i += 1) {
    let complete = false
    for (let key of Object.keys(dictionarys[i])) {
      if (~result.indexOf(key)) {
        result = result.replace(new RegExp(key, 'g'), dictionarys[i][key])
        if (!REGEXP.test(result)) {
          complete = true
          break
        }
      }
    }

    if (complete) {
      break
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
