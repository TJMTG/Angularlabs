var fs = require('fs');
//this handles the info passed to it from a successful execution of doPairGroupUser
//it writes the pair (a user and a group name) to the grou_user_pair.json file, if both the user and group exist
module.exports = function(req, res){
    let infoOBJ = {
        "groupname": req.body.groupname,
        "username": req.body.username
    }
    console.log("Inside 'doPairGroupUser.js', with values: ", infoOBJ);
    fs.readFile('./server/data/users.json', 'utf8', function(err, data){
        if (err) throw err;
        let userArray = JSON.parse(data);
        let i = userArray.findIndex(user => (
            (user.username == infoOBJ.username)
        ));
        if (i == -1){
            let resultMessage = "User not found.";
            res.send({ "ok": false, resultMessage  })
        } else {
            fs.readFile('./server/data/groups.json', 'utf8', function(err, data){
                if (err) throw err;
                let groupArray = JSON.parse(data);
                let i = groupArray.findIndex(group => (
                    (group.name == infoOBJ.groupname)
                ));
                if (i == -1){
                    let resultMessage = "Group not found.";
                    res.send({ "ok": false, resultMessage  })
                } else {
                    fs.readFile('./server/data/group_user_pair.json', 'utf8', function(err, data){
                        if (err) throw err;
                        let pairArray = JSON.parse(data);
                        let i = pairArray.findIndex(pair => (
                            (pair.groupname == infoOBJ.groupname && pair.username == infoOBJ.username)
                        ));
                        if (i == -1){
                            pairArray.push(infoOBJ);
                            pairArrayJSON = JSON.stringify(pairArray);
                            fs.writeFile('server/data/group_user_pair.json', pairArrayJSON, 'utf-8', function(err){
                                if (err) throw err;
                            });
                            let resultMessage = "User added to group.";
                            res.send({ "ok": true, resultMessage });
                        } else {
                            let resultMessage = "User already added to group."
                            res.send({ "ok": false, resultMessage });
                        }
                    });
                }
            });
        }
    });  
}