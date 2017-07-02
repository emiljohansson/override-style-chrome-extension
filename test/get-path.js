import test from 'ava'
import getPath from '../src/get-path'

test('handle falsy arguments', t => {
  const tests = [undefined, null, false, '']
  t.plan(tests.length)
  tests.forEach(url => {
    t.is(getPath({
      url
    }), '')
  })
})

test('path based on url', t => {
  const url = 'https://github.com/'
  t.is(getPath({
    url
  }), 'styles/github.com.css')
})
