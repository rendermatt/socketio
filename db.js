/* @type {object} */ const data = require("./db.json")
const { promises: fsp } = require("fs")

exports.data = data

exports.save = () => {
  fsp.writeFile("db.json", JSON.stringify(data))
}

exports.touch = (key) => {
  if (key in data) {
    return data[key]
  } else {
    return data[key] = {}
  }
}