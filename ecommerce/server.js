const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database')


connectDatabase();

dotenv.config({path:"config/config.env"});

app.listen(process.env.PORT,()=>{
    console.log(`server listening to the port ${process.env.PORT} in ${process.env.NODE_ENV}`);
})


process.on('unhandledRejection',(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`shutting down the due to unhandled rejection`);
    server.close(()=>{
        process.exit(1)
    })
})

process.on('uncaughtException',(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`shutting down the due to uncaughtException`);
    server.close(()=>{
        process.exit(1)
    })
})