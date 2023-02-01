const fs  = require('fs')


const getType = (state) => {
  let type = ''
  switch(true){
    case  state.isDirectory():
      type += 'd'
      break;
    case state.isFile():
      type += '-'
      break;
  }
  return type
}

const getAuth = (state) => {
  let auth = ''
  const mode = state.mode
  // 读取用户权限
  const userRead = mode & fs.constants.S_IRUSR
  const userWrite = mode & fs.constants.S_IWUSR
  const userExec = mode & fs.constants.S_IXUSR
  userRead ? auth += 'r' : auth += '-'
  userWrite ? auth += 'w' : auth += '-'
  userExec ?  auth += 'x' : auth += '-'

  // 读取用户组权限
  const groupRead = mode & fs.constants.S_IRGRP
  const groupWrite = mode & fs.constants.S_IWGRP
  const groupExec = mode & fs.constants.S_IXGRP
  groupRead ? auth += 'r' : auth += '-'
  groupWrite ? auth += 'w' : auth += '-'
  groupExec ?  auth += 'x' : auth += '-'

  // 读取其他组权限
  const otherRead = mode & fs.constants.S_IROTH
  const otherWrite = mode & fs.constants.S_IWOTH
  const otherExec = mode & fs.constants.S_IXOTH
  otherRead ? auth += 'r' : auth += '-'
  otherWrite ? auth += 'w' : auth += '-'
  otherExec ?  auth += 'x' : auth += '-'
  return auth
}

module.exports = (state) => {
  let fileTypeAddAuth = ''
  fileTypeAddAuth += getType(state)
  fileTypeAddAuth += getAuth(state)
  return fileTypeAddAuth
}
