/* @type {object} */ const data = require("./db.json")
const { promises: fsp } = require("fs")

exports.data = data

exports.save = () => {
  fsp.writeFile("db.json", JSON.stringify(data, null, 2))
}

exports.touch = (key) => {
  if (key in data) {
    return data[key]
  } else {
    data[key] = {}
  }
}