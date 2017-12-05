const fs = require('fs');
const path = require('path');

const bo = require('@angular-devkit/build-optimizer');
const sourceMapLib = require('source-map');

// paths
const jsFilePath = path.join(process.cwd(), 'app.component.js');
const jsMapPath = path.join(process.cwd(), 'app.component.js.map');
const tmpJsFilePath = path.join(process.cwd(), 'app.component.ngo.js');
const tmpJsMapPath = path.join(process.cwd(), 'app.component.ngo.js.map');

// read the files, create source map object from original source map file content
const jsContent = fs.readFileSync(jsFilePath).toString();
const mapContent = fs.readFileSync(jsMapPath);
const sourceMap = JSON.parse(mapContent);


// run build optimizer
const output = bo.buildOptimizer({
  content: jsContent,
  emitSourceMap: true
});
const generatedSourceMap = output.sourceMap;

// chain back to original source map
// lifted from here https://github.com/angular/devkit/blob/master/packages/angular_devkit/build_optimizer/src/build-optimizer/webpack-loader.ts#L50-L65

// chain back the source maps
generatedSourceMap.sources = sourceMap.sources;
const consumer = new sourceMapLib.SourceMapConsumer(generatedSourceMap);
const generator = sourceMapLib.SourceMapGenerator.fromSourceMap(consumer);
generator.applySourceMap(new sourceMapLib.SourceMapConsumer(sourceMap));
const updatedSourceMap = generator.toJSON();

// write the files to disk for future inspection
fs.writeFileSync(tmpJsFilePath, output.content);
fs.writeFileSync(tmpJsMapPath, JSON.stringify(updatedSourceMap, null, 2));


// okay, do some basic validation
var smc = new sourceMapLib.SourceMapConsumer(fs.readFileSync(tmpJsMapPath, 'utf8'));

// hardcode the position of the known line
// from the app.component.ngo.js file
const orig = smc.originalPositionFor({
  line: 11,
  column: 9
});

console.log(orig);