const { MongoClient } = require('mongodb')

// to connect express with mongodb atlas

module.exports = {

  selectedDb: {},

  async Connect() {
    try {
      const client = await MongoClient.connect('mongodb+srv://mentor:BVJTLsZbBW668yRK@cluster0.n7jmf.mongodb.net/?retryWrites=true&w=majority');
      this.selectedDb = client.db('MentorStudent')
    }
    catch (err) {
      console.log(err)
    }
  }


}