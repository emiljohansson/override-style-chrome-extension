const EventEmitter = require('events')

global.testProps = Object.create(EventEmitter.prototype)

global.testProps.packageDirectoryEntryHelper = (() => {
  let testFound = true
  const listener = cb => {
    cb({
      getFile: (fileName, options, onFound, onNotFound) => {
        if (testFound) onFound()
        else onNotFound()
      }
    })
  }
  return {
    toBeFound: expectFound => {
      testFound = expectFound
    },
    listener
  }
})()

global.testProps.addListener('getPackageDirectoryEntry', global.testProps.packageDirectoryEntryHelper.listener)

global.chrome = {
  tabs: {
    onCreated: {
      addListener: callback => {
        global.testProps.onCreatedCb = callback
      }
    },
    onRemoved: {
      addListener: callback => {
        global.testProps.onRemovedCb = callback
      }
    },
    onUpdated: {
      addListener: callback => {
        global.testProps.onUpdatedCb = callback
      }
    },
    insertCSS: callback => {
      global.testProps.emit('insertCSS', callback)
    }
  },
  runtime: {
    getPackageDirectoryEntry: callback => {
      global.testProps.emit('getPackageDirectoryEntry', callback)
    }
  }
}
