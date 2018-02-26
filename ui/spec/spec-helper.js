window.then = function(cb, done) {
  window.setTimeout(function() {
    cb()
    if (typeof done === 'function') {
      done()
    }
  }, 0)
}

const chai = require('chai')

global.expect = chai.expect
