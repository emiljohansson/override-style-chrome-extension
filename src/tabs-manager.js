import createTabManager from './tab-manager'

let initialized = {}

const newTab = tabId => {
  if (initialized[tabId]) {
    return
  }
  initialized[tabId] = createTabManager(chrome.tabs.insertCSS)
}

export const create = tab => {
  newTab(tab.id)
}

export const remove = tabId => {
  delete initialized[tabId]
}

export const update = (tabId, state, onCssFileFound) => {
  if (state === 'loading') {
    newTab(tabId)
    return
  }
  if (state !== 'complete') {
    return
  }
  onCssFileFound(path => {
    initialized[tabId].loadCss(path)
  })
}
