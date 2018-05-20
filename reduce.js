// db.js
var Flume = require('flumedb')
var OffsetLog = require('flumelog-offset')
var codec = require('flumecodec')
var Reduce = require('flumeview-reduce')

var log = OffsetLog('./test', {codec: codec.json})

console.time('time to reduce')
var db = Flume(log)
  .use('stats', Reduce(
    1, // version
    (sum, val) => {
      if (typeof sum === 'number') {
        return sum + val
      }
      return val
    }, // reducer
    function (data) { return data.value } // map
  ))

db.stats.get((err, sum) => {
  console.log('sum was: ', sum)
  console.timeEnd('time to reduce')
})
