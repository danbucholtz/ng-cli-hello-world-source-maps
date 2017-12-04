var fs = require('fs');
var path = require('path');
var sourceMap = require('source-map');

var filePath = path.join(process.cwd(), 'dist', 'main.d957a67d3c38309ee91a.bundle.js.map');
var smc = new sourceMap.SourceMapConsumer(fs.readFileSync(filePath, 'utf8'));

var orig = smc.originalPositionFor({
  line: 1,
  column: 407149
});

console.log(orig);

//var src = smc.sourceContentFor(orig.source);
//console.log(src);