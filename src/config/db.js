const mongoose = require('mongoose')

const db = async() => {
    try {
        await mongoose.connect('mongodb+srv://conganhdz:2308@cluster0.da9qk.mongodb.net/simple-blog?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log('Connect successfully')
    }catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = db