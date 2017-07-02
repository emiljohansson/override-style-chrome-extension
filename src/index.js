import fileExists from './file-exists'
import getPath from './get-path'
import { create, remove, update } from './tabs-manager'

chrome.tabs.onCreated.addListener(create)

chrome.tabs.onRemoved.addListener(remove)

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  update(tabId, changeInfo.status, callback => {
    const path = getPath(tab)
    fileExists(path, found => {
      if (!found) {
        return
      }
      callback(path)
    })
  })
})
