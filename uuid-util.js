const uid = require("uuid");
const { Binary } = require("bson");

function toBinaryUUID(uuid) {
  if (uuid && typeof uuid === "string") {
    const normalize = uuid.replace(/-/g, "");
    const buffer = Buffer.from(normalize, "hex");
    const binary = new Binary(buffer, Binary.SUBTYPE_UUID);

    binary.toString = () => {
      return toStringUUID(binary);
    };

    return binary;
  }
  return uuid;
}

function toStringUUID(binary) {
  if (binary) {
    const { buffer } = binary;
    return [
      buffer.toString("hex", 0, 4),
      buffer.toString("hex", 4, 6),
      buffer.toString("hex", 6, 8),
      buffer.toString("hex", 8, 10),
      buffer.toString("hex", 10, 16)
    ].join("-");
  }
}

function v4() {
  const uuid = uid.v4();
  return toBinaryUUID(uuid);
}

function v1() {
  const uuid = uid.v1();
  return toBinaryUUID(uuid);
}

module.exports = {
  toBinaryUUID,
  toStringUUID,
  v1,
  v4
};
