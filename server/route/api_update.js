
module.exports = function(db, app, ObjectID){
    //Route to update a single item
    var result;
    app.post('api/update', function(req, res){
        if (!req.body){
            return res.sendStatus(400)
        }
        product = req.body;
        console.log(req)
        var objectID = new ObjectID(product.objID);
        const collection = db.collection('products');
        collection.updateOne(
            {_id:objectID},
            {$set:{
                    name:product.name,
                    description: product.description,
                    price: product.price,
                    units: product.units
                }
            }, ()=>{
                //Return a response to the client to let the mknow the delete was successful
                res.send({"ok": product.objID})
            })
    });
}