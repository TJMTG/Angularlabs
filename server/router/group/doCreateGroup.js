var fs = require('fs');
//this handles the info passed to it from a successful execution of doCreateGroup
//it writes the data to the groups.json file, if there is no match, with the given group name
module.exports = function(req, res){
    let infoOBJ = {
        "name": req.body.name,
        "creator": req.body.creator
    }
    console.log("Inside 'doCreateGroup.js', with values: ", infoOBJ);
    fs.readFile('./server/data/groups.json', 'utf8', function(err, data){
        if (err) throw err;
        let groupArray = JSON.parse(data);
        let i = groupArray.findIndex(group => (
            (group.name == infoOBJ.name)
        ));
        if (i == -1){
            groupArray.push(infoOBJ);
            groupArrayJSON = JSON.stringify(groupArray);
            fs.writeFile('server/data/groups.json', groupArrayJSON, 'utf-8', function(err){
                if (err) throw err;
            });
            let resultMessage = "Group created.";
            res.send({ "ok": true, resultMessage });
        } else {
            let resultMessage = "Group already exists.";
            res.send({ "ok": false, resultMessage });
        }
    });
}