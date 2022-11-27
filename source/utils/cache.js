const NodeCache = require("node-cache");

const config = { stdTTL: 84000, maxKeys: 2000, };
const cache = new NodeCache(config);

module.exports = cache;
