let storageRootEntry

const initStorageRootEntry = callback => {
  if (storageRootEntry) {
    callback()
    return
  }
  chrome.runtime.getPackageDirectoryEntry(_storageRootEntry => {
    storageRootEntry = _storageRootEntry
    callback()
  })
}

export default (fileName, callback) => {
  initStorageRootEntry(() => {
    storageRootEntry.getFile(fileName, {
      create: false
    }, () => {
      callback(true)
    }, () => {
      callback(false)
    })
  })
}
