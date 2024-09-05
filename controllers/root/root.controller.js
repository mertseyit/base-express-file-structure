const rootAPI = () => {
  console.log(`Server listen on http://localhost:${process.env.API_PORT}/${process.env.API_VERSION_1}`);
}

module.exports = { rootAPI }