import tones from './tones'

export const removeTone = str => {
  Object.keys(tones).forEach(key => {
    if (~str.indexOf(key)) {
      str = str.replace(new RegExp(key, 'g'), tones[key][0])
    }
  })
  return str
}

export const convertToneToNumber = (str, toneToNumberOnly) => {
  const result = str.split(' ')
  result.forEach((val, index) => {
    let thisKey = 0
    Object.keys(tones).forEach(key => {
      if (~val.indexOf(key)) {
        thisKey = key
        result[index] = val.replace(new RegExp(key, 'g'), tones[key][0])
      }
    })
    const tone = thisKey && tones[thisKey][1]
    if (toneToNumberOnly) {
      result[index] = tone
    } else {
      result[index] += tone
    }
  })

  return result.join(' ')
}
