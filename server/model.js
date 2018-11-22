const mongoose = require('mongoose')
const schema = mongoose.Schema;

// Schema definition
const user = new schema({
  idUser   :{type: String, required: true},
  giletid  :{type: String, required: false},
  password :{type: String, required: false},
  job      :{type: String, required: true},
  idManager:{type: String, required: false}
}, { collection: 'users' })

const sensorSchema = new schema({
  x1:{type: String, required: true},
  y1:{type: String, required: true},
  z1:{type: String, required: true},
  x2:{type: String, required: true},
  y2:{type: String, required: true},
  z2:{type: String, required: true}
})

const dataSchema = new schema({
  idUser :{type: String, required: true},
  date   :{type: String, required: true},
  typeId :{type: String, required: true},
  sensors:[sensorSchema]
}, { collection: 'data' })

const sensorsSchema = new schema({
  typeId:{type: String, required: true},
  name  :{type: String, required: true}
}, { collection: 'sensors' })

// Model definition
const modelData = mongoose.model("data", dataSchema);
const modelUser = mongoose.model("users", user);
const modelSensor = mongoose.model("sensors", sensorsSchema);

let data = (d) => {
  return new modelData(d);
}

let users = (d) => {
  return new modelUser(d);
}

let sensors = (d) => {
  return new modelSensor(d);
}

module.exports = {
  data, users, sensors
}
