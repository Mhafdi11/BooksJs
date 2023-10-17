const mongoose = require('mongoose');


mongoose.connect("mongodb://127.0.0.1:27017/mydb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(()=>{
    console.log('mongoodb connected');
})
.catch((e) => {
    console.log('Connection failed: ' + e.message);
});

const Schema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const Collection=new mongoose.model('user',Schema)

module.exports=Collection