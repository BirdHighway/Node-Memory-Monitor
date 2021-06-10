# Node Memory Monitor

A simple way to monitor node memory usage.

![Logging Bar Graph to Console](https://github.com/BirdHighway/Node-Memory-Monitor/blob/master/images/console-log-example.png)

## Supported Formatters
* CSV - Monitor.createFormatterCSV()
* JSON - Monitor.createFormatterJSON()
* Bar Graph - Monitor.createFormatterBarGraph(maxValueMB)

## Supported Loggers
* Console - Monitor.createLoggerConsole(fieldsToLog)
* File - Monitor.createLoggerFile(fieldsToLog, filePath)

## Options

The constructor accepts an options object which currently has just one field: `separator`, specifying which separator to use when joining fields. Default separator value is a comma - `,`.

## Usage

```javascript
// bring in the module
const Monitor = require('/path/to/monitor');

// create an instance
const monitor = new Monitor();

// specify the fields you want to track
const fields = ['rss', 'heapTotal'];

// create a formatter
const maxSizeMB = 20;
const formatter = monitor.createFormatterBarGraph(maxSizeMB);

// create a logger
const logger = monitor.createLoggerConsole(fields);

// create the tracker
const tracker = monitor.createTracker(fields, formatter, logger);

// start the tracker
const interval = 1000;
const intervalId = monitor.startMonitor(tracker, interval);

// stop the tracker
clearInterval(intervalId);

```