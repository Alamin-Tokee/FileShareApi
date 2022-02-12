require("dotenv").config;
const mongoose = require('mongoose');
function connectDB(){
    mongoose.connect(process.env.MONGO_CONNECTION_URL, {
        useNewUrlParser: true, 
        // useCreateIndex:true, 
        useUnifiedTopology: true, 
        // useFindAndModify : true ,
    });
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log('Database connected 🥳🥳🥳🥳');
    }).on('error', function (err) {
        console.log('Connection failed ☹️☹️☹️☹️');
        console.log(err);
    })
    // mongoose
    // .connect(process.env.MONGO_CONNECTION_URL, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    // })
    // .then(() => console.log("database connection successful!"))
    // .catch((err) => console.log(err));
}


// require('dotenv').config();
// const mongoose = require('mongoose');
// function connectDB() {
//     // Database connection 🥳
//     mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
//     const connection = mongoose.connection;
//     connection.once('open', () => {
//         console.log('Database connected 🥳🥳🥳🥳');
//     }).catch(err => {
//         console.log('Connection failed ☹️☹️☹️☹️');
//     });
// }

// mIAY0a6u1ByJsWWZ

module.exports = connectDB;