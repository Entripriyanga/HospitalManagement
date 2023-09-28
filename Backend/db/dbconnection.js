const mongoose = require('mongoose');
const DB=process.env.DB_CON;

mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})   
