module.exports = function(db, app){
    //Route to delete a single item
    app.post('api/deleteItem', function(req, res){
        if (!req.body){
            return res.sendStatus(400)
        }
        productID = req.body.productID;
        //create a new monfo Object ID from the passed in _id
        var objectID = new objectID(productID);
        const collection = db.collection('products');
        //Delete a single item based in its unique ID
        collection.deleteOne({_id:productID}, (err, docs)=>{
            //get a new listing of all items in the database and return to client
            collection.find({}).toArray((err, dbres)=>{
                console.log('data: ', data)
                res.send(data);
            });
        });
    });
}