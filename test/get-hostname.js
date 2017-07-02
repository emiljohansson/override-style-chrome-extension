import test from 'ava'
import getHostname from '../src/get-hostname'

test('domain name from url', t => {
  const url = 'https://github.com/'
  const actual = getHostname({
    url
  })
  const expected = 'github.com'
  t.is(actual, expected)
})
