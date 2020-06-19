const userdb = require('./userSchema');

checkemail = (data) =>{
    return new Promise((resolve,reject)=>{
        userdb.find({Email:data.Email} ,(err,res) => {
            resolve(res[0] != undefined);
        });  
    })    
}

module.exports = {
    userRegister: async (data)=>{
        if (await checkemail(data)){
            return null;
        }else{return new Promise((resolve,reject)=>{
            userdb.create(data,(err,result)=>{
                if(err){
                    reject(err);
                } else{
                    resolve(result);
                }
            })
         })}
    },
    checkUser : (data) => {
        // console.log("checkuser",data);
        return new Promise ((resolve,reject) => {
            userdb.findOne( { Email:data.Email , Password:data.Password},(err,result) => {
                if (err) {
                    reject(err);
                } else {
                    console.log("uerapi",result)
                    resolve(result);
                }
            });
        })
    },   
    forgotPassword : (data) => {
        // console.log("forgot",data);
        return new Promise((resolve,reject) => {
            userdb.findOne( {Email:data.Email},(err,result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            } )
        })
    }
}