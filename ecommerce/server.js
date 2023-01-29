const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database')


connectDatabase();

dotenv.config({path:"config/config.env"});

app.listen(process.env.PORT,()=>{
    console.log(`server listening to the port ${process.env.PORT} in ${process.env.NODE_ENV}`);
})