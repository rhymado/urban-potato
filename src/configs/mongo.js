const { mongoPass } = require("./environment");

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://admin-kopi:${mongoPass}@kopi-toko.vvodqmh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = {
  client,
  comments: client.db("sample_mflix").collection("comments"),
  error: client.db("log").collection("error"),
};
