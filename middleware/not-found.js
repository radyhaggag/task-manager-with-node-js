const notFound = (req, res) => {
  res.status(404).send("Route dose Not Found");
};

module.exports = notFound;
