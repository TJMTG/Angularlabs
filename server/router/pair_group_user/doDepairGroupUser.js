var fs = require('fs');
//this handles the info passed to it from a successful execution of doDepairGroupUser
//it removes a pair from group_user_pair.js if the pair exists
module.exports = function(req, res){
    let infoOBJ = {
        "groupname": req.body.groupname,
        "username": req.body.username
    }
    fs.readFile('./server/data/group_user_pair.json', 'utf8', function(err, data){
        if (err) throw err;
        let pairArray = JSON.parse(data);
        let i = pairArray.findIndex(pair => (
            (pair.groupname == infoOBJ.groupname && pair.username == infoOBJ.username)
        ));
        if (i == -1){
            let resultMessage = "User is not in that group."
            res.send({ "ok": false, resultMessage });
        } else {
            pairArray.splice(i, 1);
            pairArrayJSON = JSON.stringify(pairArray);
            fs.writeFile('server/data/group_user_pair.json', pairArrayJSON, 'utf-8', function(err){
                if (err) throw err;
            });
            let resultMessage = "User removed from group.";
            res.send({ "ok": true, resultMessage });
        }
    });
}