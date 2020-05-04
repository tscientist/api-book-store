const DB_URI = '';

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