export default insertCSS => {
  const instance = {}

  instance.loadCss = path => {
    if (!path) {
      return
    }
    insertCSS(undefined, {
      file: path
    })
  }

  return instance
}
