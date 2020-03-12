const app = require('./index')
const port = process.env.PORT || 8081;

// Start server
app.listen(port, function () {
  console.log('Server listening on port ' + port)
})