

const DB_URI = 'mongodb://admin:admin12@ds233278.mlab.com:33278/workshopnodejs2019';

module.exports = {
    connect: () => {
        return mongoose.createConnection(DB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
         })
    }
}