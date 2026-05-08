const services = require("../Models/service");

async function getAllServices() {
  try {
    const allServices = await services.find();
    return allServices;
  } catch (error) {
    return error;
  }
}

module.exports = getAllServices;
