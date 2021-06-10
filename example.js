// NOTE: example.js MUST be run with the --expose-gc flag
// e.g. node --expose-gc example.js
// this exposes the garbage collector, which we force by calling gc()

const Monitor = require('./index.js');

// create an instance
const monitor = new Monitor();

// specify the fields you want to track
const fields = ['rss', 'heapTotal'];

// create a formatter
const maxSizeMB = 100;
const formatter = monitor.createFormatterBarGraph(maxSizeMB);

// create a logger
const logger = monitor.createLoggerConsole(fields);

// create the tracker
const tracker = monitor.createTracker(fields, formatter, logger);

// start the tracker
const interval = 1500;
const intervalId = monitor.startMonitor(tracker, interval);


// create a large array
let obj = {}
obj.array = [];

// add 20,000 values every 100 ms
let intId = setInterval(() => {
  let addition = new Array(20000).fill(0).map((v, i) => i);
  obj.array = obj.array.concat(addition);
}, 100);

// stop adding values after 5 seconds
setTimeout(() => {
  clearInterval(intId);
}, 5000);

// delete the array after 6 seconds
setTimeout(() => {
  delete obj.array;
}, 6000);


// force garbage collection after 7 seconds
setTimeout(() => {
  gc();
}, 7000);

