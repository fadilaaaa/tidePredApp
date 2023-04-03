export default function parseDate(date){
  let month = date.getMonth() + 1
  let day = date.getDate()
  return ''+ date.getFullYear() +
            '-' +
            ((month<10)? '0'+month:month) +
            '-' +
            ((day<10)? '0'+day:day)
}