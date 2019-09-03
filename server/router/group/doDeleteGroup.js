var fs = require('fs');
//this handles the info passed to it from a successful execution of doDeleteGroup
//it removes a group with the given name from the groups.json file, if there is a match
module.exports = function(req, res){
    let infoOBJ = {
        "name": req.body.name,
    }
    console.log("Inside 'doDeleteGroup.js', with values: ", infoOBJ);
    fs.readFile('./server/data/groups.json', 'utf8', function(err, data){
        if (err) throw err;
        let groupArray = JSON.parse(data);
        let i = groupArray.findIndex(group => (
            (group.name == infoOBJ.name)
        ));
        if (i == -1){
            let resultMessage = "Group not found.";
            res.send({ "ok": false, resultMessage });
        } else {

            //
            //need to delete any child channels pairs first
            //

            //
            //need to delete any assisAdmin pairs first
            //

            //
            //need to delete any user pairs first
            //

            //if (JSON.parse(req.body.exeRole) == 'groupAdmin' && userArray[i].role != ('superAdmin' || 'groupAdmin')){
            groupArray.splice(i, 1);
            groupArrayJSON = JSON.stringify(groupArray);
            fs.writeFile('server/data/groups.json', groupArrayJSON, 'utf-8', function(err){
                if (err) throw err;
            });
            let resultMessage = "Group deleted."
            res.send({ "ok": true, resultMessage });
            //} else {
                // let resultMessage = "Invalid permissions to perform this action.";
                //res.send({ "ok": false, resultMessage});
            //}
        }
    });
}