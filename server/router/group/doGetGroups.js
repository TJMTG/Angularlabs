var fs = require('fs');
//this handles the info passed to it from a successful execution of doCreateGroup
//it writes the data to the groups.json file, if there is no match, with the given group name
module.exports = function(req, res){
    let infoOBJ = {
        "name": req.body.name,
    }
    console.log("Inside 'doGetGroups.js', with values: ", infoOBJ);
    fs.readFile('./server/data/groups.json', 'utf8', function(err, data){
        if (err) throw err;
        res.send({ "ok": true, data }); 
    });
}