const mongoose = require('mongoose')

const database = "users_db"

mongoose.set("strictQuery", false)
mongoose.set('runValidators', true);
mongoose.connect(`mongodb://localhost/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Established a connection to the database'))
    .catch(err => console.log('Something went wrong when connecting to the database ', err));