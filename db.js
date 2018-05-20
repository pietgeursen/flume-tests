// db.js
var Flume = require('flumedb')
var OffsetLog = require('flumelog-offset')
var codec = require('flumecodec')

var size = 100E3
var valuesToWrite = new Array(size)

for (var i = 0; i < size; i++) {
  valuesToWrite[i] = {value: i}
}

var log = OffsetLog('./test', {codec: codec.json})

var db = Flume(log)

valuesToWrite.forEach(val => db.append(val, function () {
}))
