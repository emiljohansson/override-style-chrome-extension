import getHostname from './get-hostname'

export default tab => {
  if (!tab.url) {
    return ''
  }
  const hostname = getHostname(tab)
  return `styles/${hostname}.css`
}
