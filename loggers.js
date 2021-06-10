const defaultFormatHeader = (fields, separator) => {
  return fields.join(separator) + '\n';
}

const createLoggerConsole = (fields, separator, formatHeader = defaultFormatHeader ) => {
  const header = formatHeader(fields, separator);
  console.log(header);
  const logConsole = (data) => {
    console.log(data);
  };
  return logConsole;
};

const createLoggerFile = (fields, separator, filePath, formatHeader = defaultFormatHeader) => {
  const stream = fs.createWriteStream(filePath, {flags: 'a'});
  const header = formatHeader(fields, separator);
  stream.write(header);
  const logFile = (data) => {
    stream.write(data + '\n');
  };
  return logFile;
};

module.exports = {
  createLoggerConsole,
  createLoggerFile
};
