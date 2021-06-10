const fs = require('fs');
const path = require('path');
const loggers = require('./loggers');
const formatters = require('./formatters');

class Monitor {

  constructor(options) {
    this.SEPARATOR = options && options.separator ? options.separator : ',';
  }

  startMonitor(tracker, interval = 1000) {
    return setInterval(() => {
      tracker();
    }, interval);
  }

  validateFields(fields) {
    const validFields = ['rss', 'heapTotal', 'heapUsed', 'external', 'arrayBuffers'];
    fields.forEach((field) => {
      if (!(validFields.includes(field))) {
        throw new Error(`Key ${field} not found in process.memoryUsage()`);
      }
    });
  }

  getRelevantFields(fields, data) {
    let relevantFields = {};
    fields.forEach((field) => {
      relevantFields[field] = data[field];
    });
    return relevantFields;
  }

  createTracker(fields, formatter, logger) {
    this.validateFields(fields);
    const trackMemory = () => {
      let data = process.memoryUsage();
      let relevantData = this.getRelevantFields(fields, data);
      let formattedData = formatter(relevantData, this.SEPARATOR);
      logger(formattedData); 
    }
    return trackMemory;
  }

  createFormatterCSV() {
    return formatters.formatCSV;
  }

  createFormatterJSON() {
    return formatters.formatJSON;
  }

  createFormatterBarGraph(maxValue) {
    return formatters.formatBarGraph.bind(this, maxValue);
  }

  createLoggerConsole(fields) {
    return loggers.createLoggerConsole(fields, this.SEPARATOR);
  }

  createLoggerFile(fields, filePath) {
    return loggers.createLoggerFile(fields, this.SEPARATOR, filePath);
  }


}

module.exports = Monitor;
