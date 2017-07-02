import test from 'ava'
import app from '../src'

const url = 'https://google.com/'

test('listeners initialized', t => {
  const expected = 'function'
  t.is(typeof global.testProps.onCreatedCb, expected)
  t.is(typeof global.testProps.onRemovedCb, expected)
  t.is(typeof global.testProps.onUpdatedCb, expected)
})

test('update should create a css file', t => {
  t.plan(1)
  global.testProps.packageDirectoryEntryHelper.toBeFound(true)
  const onCssFileCreated = () => {
    t.pass()
  }
  const tab = {
    id: Math.floor(Math.random() * 100),
    url
  }
  global.testProps.addListener('insertCSS', onCssFileCreated)
  global.testProps.onUpdatedCb(tab.id, {
    status: 'loading'
  }, tab)
  global.testProps.onUpdatedCb(tab.id, {
    status: 'complete'
  }, tab)
})

test('update should do nothing if css file not found', t => {
  t.plan(0)
  global.testProps.packageDirectoryEntryHelper.toBeFound(false)
  const onCssFileCreated = () => {
    t.fail()
  }
  const tab = {
    id: Math.floor(Math.random() * 100),
    url
  }
  global.testProps.addListener('insertCSS', onCssFileCreated)
  global.testProps.onUpdatedCb(tab.id, {
    status: 'loading'
  }, tab)
  global.testProps.onUpdatedCb(tab.id, {
    status: 'complete'
  }, tab)
})
