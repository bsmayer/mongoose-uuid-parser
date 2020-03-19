const mongoose = require("mongoose");
const uuidUtil = require("./uuid-util");

function UUID(key, options) {
  mongoose.SchemaType.call(this, key, options, "UUID");
}

UUID.prototype = Object.create(mongoose.SchemaType.prototype);

UUID.prototype.cast = function(val) {
  if (val instanceof mongoose.Types.Buffer.Binary) return uuidUtil.toStringUUID(val);
  if (typeof val === "string") return uuidUtil.toBinaryUUID(val);
  if (typeof val === "object" && val.buffer) return val;
  throw new Error("Unable to cast value to UUID");
};

function injectUUID(mongooseInstance) {
  mongooseInstance.SchemaTypes.UUID = mongooseInstance.Schema.Types.UUID = UUID;
}

module.exports = {
  injectUUID,
  UUID
};
