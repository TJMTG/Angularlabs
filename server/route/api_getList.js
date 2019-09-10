module.exports = function(db, app){
    //Route to get list of all items from the database
    app.get('api/getList', function(req, res){
        const collection = db.collection('products');
        collection.find({}).toArray((err, dbres)=>{
            res.send({'num':num, err: null})
        })
    });
}