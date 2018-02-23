const index = (req, res) => {
  res.json({
    message: 'OK',
  });
};

module.exports = {
  index: index,
};
