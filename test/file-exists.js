import test from 'ava'
import fileExists from '../src/file-exists'

test('found', t => {
  global.testProps.packageDirectoryEntryHelper.toBeFound(true)
  fileExists('styles/github.com.css', found => {
    t.true(found)
  })
})

test('not found', t => {
  global.testProps.packageDirectoryEntryHelper.toBeFound(false)
  fileExists('styles/github.com.css', found => {
    t.false(found)
  })
})
