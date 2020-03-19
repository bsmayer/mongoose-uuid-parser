const { Binary } = require("bson");
const { injectUUID, UUID } = require("./uuid-type");
const { toBinaryUUID, toStringUUID, v1, v4 } = require("./uuid-util");

function getUUID(value) {
  if (!value) return null;
  if (Array.isArray(value) && value.length) return value.map(binary => toStringUUID(binary));
  return toStringUUID(value);
}

function setUUID(value) {
  if (value instanceof Binary) return value;
  if (Array.isArray(value)) return value.map(uuid => toBinaryUUID(uuid));
  return toBinaryUUID(value);
}

module.exports = {
  getUUID,
  setUUID,
  injectUUID,
  UUID,
  v1,
  v4,
  util: {
    v1,
    v4,
    toBinaryUUID,
    toStringUUID
  }
};
