# mongoose-uuid-parser

UUID support for Mongoose (and MongoDB)

## Motivation

There isn't an easy way to work with UUID and MongoDB in Javascript. Unless you use UUID as string, you will find yourself in trouble. This library offers some tools to set you free of this problem! :)

## Getting started

```
yarn add mongoose-uuid-parser

npm install --save mongoose-uuid-parser
```

The easiest way to use it with mongoose is by injecting the UUID type to Schema Types. You can do it in some config file in your application.

```js
const mongoose = require("mongoose");
const { injectUUID } = require("mongoose-uuid-parser");

injectUUID(mongoose);
```

And then in your Schema:

```js
const schema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.UUID,
      default: util.v4 // generate new UUID V4
    },
    title: String,
    description: String,
    likedBy: [mongoose.Schema.Types.UUID]
  },
  { versionKey: false }
);

const Post = new mongoose.model("post", schema);

async function create(post) {
  return await new Post(post).save();
}

async function find(id) {
  return await Post.find({ _id: id });
}

async function execute() {
  const post = await create({
    title: "How to use UUID",
    description: "Lorem...",
    likedBy: [
      "c98b3119-2833-4d30-9e6d-182f3bd64301", 
      "02d79f3a-91d4-4c33-8db2-391cf4eaddd2"
    ]
  });

  console.log(post._id);
  // Binary

  console.log(post._id.toString());
  // b2d239fe-7de2-4eee-85f6-a216fa3d7bb6

  console.log(post.id);
  // b2d239fe-7de2-4eee-85f6-a216fa3d7bb6

  const result = await find(post.id);

  console.log(result[0].likedBy);
  //["c98b3119-2833-4d30-9e6d-182f3bd64301","02d79f3a-91d4-4c33-8db2-391cf4eaddd2"]
}

execute();
```

## Getter and Setter

Alternatively, instead of relying on UUID type, you can use the getter and setter provided by this library. 

The example below shows how to use it in depth.

```js
const mongoose = require('mongoose');
const { getUUID, setUUID, util } = require('mongoose-uuid-parser');

const schema = new mongoose.Schema(
  {
    _id: {
      type: Object,
      get: getUUID,
      set: setUUID,
      default: util.v4 // generate new UUID V4
    },
    title: String,
    description: String,
    likedBy: {
      type: [Object],
      get: getUUID,
      set: setUUID
    }
  },
  { versionKey: false }
);

const Post = new mongoose.model("post", schema);

async function create(post) {
  return await new Post(post).save();
}

async function find(id) {
  // Should cast the id to search
  return await Post.find({ _id: util.toBinaryUUID(id) });
}

async function execute() {
  const post = await create({
    title: "How to use UUID",
    description: "Lorem...",
    likedBy: [
      "c98b3119-2833-4d30-9e6d-182f3bd64301", 
      "02d79f3a-91d4-4c33-8db2-391cf4eaddd2"
    ]
  });

  console.log(post._id);
  // bae01115-c571-4bdc-9c0a-daa03c500030

  console.log(post.id);
  // b2d239fe-7de2-4eee-85f6-a216fa3d7bb6

  const result = await find(post.id);

  console.log(result[0].likedBy);
  //["c98b3119-2833-4d30-9e6d-182f3bd64301","02d79f3a-91d4-4c33-8db2-391cf4eaddd2"]
}

execute();
```

## Extra utilities

Although you can find some useful tools for mongoose, all the conversion methods are available to use inside the `util` object, so you can use it with the official mongoDB library.

```js
const { util } = require('mongoose-uuid-parser');

// Generate new UUID
let uuid;

uuid = util.v1();
console.log(uuid); // Binary
console.log(uuid.toString()) // UUID String

uuid = util.v4();
console.log(uuid) // Binary
console.log(uuid.toString()) // UUID String

// Transform Binary to UUID String
// Useful when you need to manually convert a Binary
// Coming from MongoDB
const binary = util.v4();
const str = util.toStringUUID(uuid);

console.log(str) // UUID String

// Transform UUID String to Binary
// Useful when you need to manually convert a string UUID
const strUUID = util.v4().toString();
const binaryUUID = util.toBinaryUUID();

console.log(binaryUUID) // Binary
console.log(binaryUUID.toString()) // UUID String
```

# Contribute

You are welcome to send your PR! 