let isAll = false
let isList = false

const params = process.argv.slice(2)

if(params.includes('-a')){
  isAll = true
}
if(params.includes('-l')){
  isList = true
}
if(params.includes('-al') || params.includes('-la')){
  isAll = true
  isList = true
}
module.exports = {
  isAll: isAll,
  isList
}
