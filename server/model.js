const mongoose = require('mongoose')
const schema = mongoose.Schema;

// Schema definition
const userSchema = new schema({
  username :{type: String, unique: true, required: true},
  password :{type: String, required: false},
  teamID   :{type: mongoose.Schema.ObjectId, ref: 'teams', required: false},
  jobID    :{type: mongoose.Schema.ObjectId, ref: 'jobs', required: true}
}, { collection: 'users' })

const teamSchema = new schema({
  name   :{type: String, unique: true, required: true}
}, { collection: 'teams' })

const jacketSchema = new schema({
  userID    :{type: mongoose.Schema.ObjectId, ref: 'users', required: true},
  identifier:{type: String, unique: true, required: true}
}, { collection: 'jackets' })

const jobSchema = new schema({
  name   :{type: String, unique: true, required: true},
  level  :{type: Number, unique: true, required: true}
}, { collection: 'jobs' })

const sensorsSchema = new schema({
  type   :{type: String, unique: true, required: true},
  active :{type: Boolean, required: true}
})

const coordinateSchema = new schema({
  x:{type: String, required: true},
  y:{type: String, required: true},
  z:{type: String, required: true},
}, { collection: 'sensors' })

const dataSchema = new schema({
  sensorID   :{type: mongoose.Schema.ObjectId, ref: 'sensors', required: true},
  userID     :{type: mongoose.Schema.ObjectId, ref: 'users', required: true},
  date       :{type: Date, required: true},
  coordinates:[coordinateSchema]
}, { collection: 'data' })

// Model definition
const modelUser       = mongoose.model("users", userSchema, "users");
const modelTeam       = mongoose.model("teams", teamSchema, "teams");
const modelJacket     = mongoose.model("jackets", jacketSchema, "jackets");
const modelJob        = mongoose.model("jobs", jobSchema, "jobs");
const modelSensor     = mongoose.model("sensors", sensorsSchema, "sensors");
const modelData       = mongoose.model("data", dataSchema, "data");

let users = (d) => {
  return new modelUser(d);
}

let teams = (d) => {
  return new modelTeam(d);
}

let jackets = (d) => {
  return new modelJacket(d);
}

let jobs = (d) => {
  return new modelJob(d);
}

let sensors = (d) => {
  return new modelSensor(d);
}

let data = (d) => {
  return new modelData(d);
}

module.exports = {
  modelUser, modelTeam, modelJob, modelSensor, modelData, modelJacket,
  users, teams, jobs, sensors, data, jackets
}
