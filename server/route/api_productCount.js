
module.exports = function(db, app){
    //Route to get list of all items from the database
    app.get('api/productCount', function(req, res){
        if (!req.body){
            return res.sendStatus(400)
        }
        const collection = db.collection('products');
        collection.find({}).count((err, count)=>{
            res.send({'count': count})
        })
    });
}