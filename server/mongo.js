const mongoose = require('mongoose')
const DatabaseConnectionError = require('./utils/DatabaseError').DatabaseConnectionError
const DatabaseRequestError = require('./utils/DatabaseError').DatabaseRequestError
const EmptyResultError = require('./utils/DatabaseError').EmptyResultError

let open = (path) => {
  return new Promise((resolve, reject) => {
    // Database connection
    try {
      mongoose.connect('mongodb://localhost/pfe', { useNewUrlParser: true })
      this.database = mongoose.connection;
      this.database.once('open', function () {
        console.log("Connected to the database")
        resolve(path + ' opened')
      });
    } catch (e) {
      reject(new DatabaseConnectionError(path, 'Could not open database'))
    }
  })
}

// Insert one
let insert = (name, query) => {
  return new Promise((resolve, reject) => {
    try {
      this.database.db.collection(name, function (err, collection) {
        if (err) { reject(new DatabaseRequestError(JSON.stringify(query), err)) }

        collection.insertOne(query, function(error, result) {
          if (error) { reject(new DatabaseRequestError(JSON.stringify(query), error)) }
          resolve(result.ops[0])
        });
      });
    } catch (e) {
      reject(new DatabaseRequestError(JSON.stringify(query), e.message))
    }
  })
}

// Update one
let update = (name, id, query) => {
  return new Promise((resolve, reject) => {
    try {
      this.database.db.collection(name, function (err, collection) {
        if (err) { reject(new DatabaseRequestError(JSON.stringify(query), err)) }

        collection.findOneAndUpdate(id, { $set: query }, { upsert: true }, function(error, result) {
          if (error) { reject(new DatabaseRequestError(JSON.stringify(query), error)) }
          resolve(result.value)
        });
      });
    } catch (e) {
      reject(new DatabaseRequestError(JSON.stringify(query), e.message))
    }
  })
}

// Delete one
let remove = (name, query) => {
  return new Promise((resolve, reject) => {
    try {
      this.database.db.collection(name, function (err, collection) {
        if (err) { reject(new DatabaseRequestError(JSON.stringify(query), err)) }

        collection.deleteOne(query, function(error, result) {
          if (error) { reject(new DatabaseRequestError(JSON.stringify(query), error)) }
          resolve(result)
        });
      });
    } catch (e) {
      reject(new DatabaseRequestError(JSON.stringify(query), e.message))
    }
  })
}

// first row read
let get = (name, query) => {
  return new Promise((resolve, reject) => {
    try {
      this.database.db.collection(name, function (err, collection) {
        if (err) { reject(new DatabaseRequestError(JSON.stringify(query), err)) }

        collection.findOne(query, function(error, result) {
          if (error) { reject(new DatabaseRequestError(JSON.stringify(query), error)) }
          // if (!result) { reject(new EmptyResultError(JSON.stringify(query))) }
          resolve(result)
        });
      });
    } catch (e) {
      reject(new DatabaseRequestError(JSON.stringify(query), e.message))
    }
  })
}

// set of rows read
let all = (name, query) => {
  return new Promise((resolve, reject) => {
    try {
      this.database.db.collection(name, function (err, collection) {
        if (err) { reject(new DatabaseRequestError(JSON.stringify(query), err)) }

        collection.find(query).toArray(function(error, result) {
          if (error) { reject(new DatabaseRequestError(JSON.stringify(query), error)) }
          // if (!result.length) { reject(new EmptyResultError(JSON.stringify(query))) }
          resolve(result)
        });
      });
    } catch (e) {
      reject(new DatabaseRequestError(JSON.stringify(query), e.message))
    }
  })
}

try {
  process.nextTick(() => open(process.env.DATABASE_PATH))
} catch (err) {
  throw err
}

module.exports = {
  all, get, insert, update, remove
}
