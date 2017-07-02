import test from 'ava'
import { create, remove, update } from '../src/tabs-manager'

const url = 'https://github.com/'
const path = 'domain/github.com'

const packageDirEntryListener = cb => {
  cb({
    getFile: (fileName, options, onFound, onNotFound) => {
      onFound()
    }
  })
}

test('create new css when new tab is created', t => {
  t.plan(1)
  const listener = () => {
    t.pass()
  }
  const tab = {
    id: 1,
    url
  }
  global.testProps.addListener('insertCSS', listener)
  create(tab)
  update(tab.id, 'complete', callback => {
    callback(path)
  })
})

test('create new css when url is changed', t => {
  t.plan(1)
  const listener = () => {
    t.pass()
  }
  const tab = {
    id: 2,
    url
  }
  const onCssFileFound = callback => {
    callback(path)
  }
  global.testProps.addListener('insertCSS', listener)
  update(tab.id, 'loading', onCssFileFound)
  update(tab.id, undefined, onCssFileFound)
  update(tab.id, 'complete', onCssFileFound)
})

test('remove tab manager when tab is closed', t => {
  t.plan(1)
  const listener = () => {}
  const tab = {
    id: 2,
    url
  }
  const onCssFileFound = callback => {
    callback(path)
  }
  global.testProps.addListener('insertCSS', listener)
  update(tab.id, 'loading', onCssFileFound)
  update(tab.id, undefined, onCssFileFound)
  update(tab.id, 'complete', onCssFileFound)

  remove(tab.id)

  try {
    update(tab.id, 'complete', onCssFileFound)
  } catch (e) {
    t.pass()
  }
})
