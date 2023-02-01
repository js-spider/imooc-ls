#!/usr/local/bin/node

const fs = require('fs')
const { isList, isAll } = require('./parseArgs')
const auth  = require('./auth')

const dir = process.cwd()

let files = fs.readdirSync(dir)

let realFiles = files.filter(file => {
  return isAll ? true : !file.startsWith('.')
})

let output = ''
let empty = '      '

realFiles.forEach((f, index) => {
  if(isList){
    const result = []
    const state = fs.statSync(f)
    const authResult = auth(state)
    const updateTime = new Date(state.mtime).toLocaleDateString()
    result.push(authResult)
    result.push(updateTime.length === 10 ? updateTime : (new Array(10-updateTime.length).fill(' ').join('')) + updateTime )
    result.push(f)
    output += result.join(empty)
    output += ( index === realFiles.length -1 ? '' : '\n')
  }else{
    output += ( f + empty)
  }
})


console.log(output)
