import test from 'ava'
import createTabManager from '../src/tab-manager'

test('require a path', t => {
  let wasCalled = false
  const callback = () => {
    wasCalled = true
    t.fail()
  }
  const expected = false
  const instance = createTabManager(callback)
  instance.loadCss()
  t.is(wasCalled, expected)
})

test('create a css file', t => {
  t.plan(1)
  const expected = 'my-file.css'
  const instance = createTabManager((tab, options) => {
    t.is(options.file, expected)
  })
  instance.loadCss(expected)
})
