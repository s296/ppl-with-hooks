const db = require('./postSchema');

module.exports = {
    getPosts : (data) => {
        return new Promise ((resolve,reject) => {
            db.find({}).sort({_id:-1}).exec(function(err, docs) 
            {
                if(err){
                    reject (err);
                }else{
                    resolve(docs);
                } 
            });
        })
    },
    uploadPost : (data) => {
        return new Promise ( (resolve,reject) => {
            db.create(data,(err,result) => {
                if (err){
                    reject(err);
                }else{
                    db.findOne({UserName: data.UserName},(err,result)=>{
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(result);
                        }
                    })
                }
            })
        })
    },
    myuploads : (data) => {
        return new Promise ( (resolve,reject) => {
            db.find({UserName:data.UserName}).sort({_id:-1}).exec(function(err, docs) 
            {
                if(err){
                    reject (err);
                }else{
                    resolve(docs);
                } 
            });
        } )
    },
    singlepost : (data) => {
        return new Promise ( (resolve,reject) => {
            db.find({_id:data.Id}).exec(function(err, docs) 
            {
                if(err){
                    console.log("err",err);
                    reject (err);
                }else{
                    // console.log("docs",docs);
                    resolve(docs);
                } 
            });
        } )
    },
    addcomment : async(data) => {
        return new Promise ( (resolve,reject) => {
             db.updateOne({'_id':data.id},{'$push':{'Comment':{'User':data.UserComment,'Comment':data.Comment}}}).exec(function(err,docs)
             {
                if(err){
                    console.log("err",err);
                    reject (err);
                }else{
                    // console.log("docs",docs,data.comment);
                    resolve(docs);
                } 
             });

        } )
    },
    getcomment : (data) => {
        return new Promise ( (resolve,reject) => {
           db.find({_id:data.id}).exec(function(err,docs)
             {
                if(err){
                    console.log("err",err);
                    reject (err);
                }else{
                    console.log("docs",docs,data.Comment);
                    resolve(docs);
                } 
             });
        } )
    },
    addlike : (data) => {
        return new Promise ( (resolve,reject) => {
            
            db.find({'_id':data.id,Likes: {$elemMatch :{'User':data.UserComment}}}).exec(function(err,documents){
                console.log(documents,"doc");
                if (documents.length == 0){
                    db.updateOne({'_id':data.id},{'$inc':{'TotalLikes':1}}).exec(function(err,docs){
                        console.log("inc",docs)
                    })
                    db.updateOne({'_id':data.id},{'$push':{'Likes':{'User':data.UserComment,'Likes':1}}}).exec(function(err,docs){
                        console.log("push ",docs);
                        db.find({'_id':data.id}).exec(function(err,doc){
                            console.log("no",doc)
                            resolve(doc);
                        })
                    })
                }else{
                    db.find({'_id':data.id,Likes: {$elemMatch :{'User':data.UserComment,'Likes':0}}}).exec(function(err,d){
                    console.log("d",d.length);
                        if(d.length==0){
                            db.updateOne({'_id':data.id},{'$inc':{'TotalLikes':-1}}).exec(function(err,docs){
                                console.log("inc",docs)
                            })
                            db.updateOne({'_id':data.id},{'$set':{'Likes.$[elem].Likes':0}},{arrayFilters:[{'elem.User':data.UserComment}]}).exec(function(err,docs){
                                console.log("already",docs);
                                db.find({'_id':data.id}).exec(function(err,doc){
                                    console.log("like0",doc);
                                    resolve(doc);
                                })
                            })
                        }else{
                            db.updateOne({'_id':data.id},{'$inc':{'TotalLikes':1}}).exec(function(err,docs){
                                console.log("inc",docs)
                            })
                            db.updateOne({'_id':data.id},{'$set':{'Likes.$[elem].Likes':1}},{arrayFilters:[{'elem.User':data.UserComment}]}).exec(function(err,docs){
                                console.log("already",docs);
                                db.find({'_id':data.id}).exec(function(err,doc){
                                    console.log("like1",doc);
                                    resolve(doc);
                                })
                            })
                        }
                    })
                }
            })
        })
    },
    postofcategory : (data) => {
        return new Promise ( (resolve,reject) => {
            db.find({Category:data.Category}).exec(function(err, docs) 
            {
                if(err){
                    reject (err);
                }else{
                    resolve(docs);
                } 
            });
        })
    }
}