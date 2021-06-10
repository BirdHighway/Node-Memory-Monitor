const formatBytes = (bytes) => {
  const megabytes = bytes / 1024 / 1024;
  return megabytes.toFixed(1);
};

const formatCSV = (data, separator) => {
  let valuesArray = [];
  for (let field in data) {
    const bytes = data[field];
    const megabytes = formatBytes(bytes);
    valuesArray.push(megabytes);
  }
  return valuesArray.join(separator);
};

const formatJSON = (data) => {
  return JSON.stringify(data);
};

const formatSingleBar = (max, name, bytes) => {
  const nameFormatted = name.padStart(12, ' ');
  const megabytes = bytes / 1024 / 1024;
  const megabytesFormatted = formatBytes(bytes).padStart(6, ' ');
  const fraction = megabytes / max;
  const hashesCount = Math.round(fraction * 100);
  const hashes = ('#').repeat(hashesCount);
  return `${nameFormatted}:${megabytesFormatted} ${hashes}\n`;
};

const formatBarGraph = (max, data) => {
  let graph = '-'.repeat(19) + '\n';
  for (let field in data) {
    const bar = formatSingleBar(max, field, data[field]);
    graph += bar;
  }
  return graph;
}

module.exports = {
  formatCSV,
  formatJSON,
  formatBarGraph
};
