var fs = require('fs');
//this handles the info passed to it from a successful execution of doPairGroupUser
//it writes the pair (a user and a group name) to the grou_user_pair.json file, if both the user and group exist
module.exports = function(req, res){
    let infoOBJ = {
        "groupname": req.body.groupname,
        "channelname": req.body.channelname,
        "username": req.body.username
    }
    console.log("Inside 'doPairGroupChannelUser.js', with values: ", infoOBJ);
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
                    fs.readFile('./server/data/channels.json', 'utf8', function(err, data){
                        if (err) throw err;
                        let channelArray = JSON.parse(data);
                        let i = channelArray.findIndex(channel => (
                            (channel.groupname == infoOBJ.groupname && channel.name == infoOBJ.channelname)
                        ));
                        if (i == -1){
                            let resultMessage = "Channel not found.";
                            res.send({ "ok": true, resultMessage });
                        } else {
                            fs.readFile('./server/data/group_user_pair.json', 'utf8', function(err, data){
                                if (err) throw err;
                                let pairArray = JSON.parse(data);
                                let i = pairArray.findIndex(pair => (
                                    (pair.groupname == infoOBJ.groupname && pair.username == infoOBJ.username)
                                ));
                                if (i == -1){
                                    let resultMessage = "User not added to group.";
                                    res.send({ "ok": false, resultMessage });
                                } else {
                                    fs.readFile('./server/data/channel_user_pair.json', 'utf8', function(err, data){
                                        if (err) throw err;
                                        let pairArray = JSON.parse(data);
                                        let i = pairArray.findIndex(pair => (
                                            (pair.groupname == infoOBJ.groupname && pair.channelname == infoOBJ.channelname && pair.username == infoOBJ.username)
                                        ));
                                        if (i == -1){
                                            pairArray.push(infoOBJ);
                                            console.log("infoOBJ is: ", infoOBJ);
                                            console.log("pairArray is: ", pairArray)
                                            pairArrayJSON = JSON.stringify(pairArray);
                                            fs.writeFile('server/data/channel_user_pair.json', pairArrayJSON, 'utf-8', function(err){
                                                if (err){
                                                    console.log("error!!!!!");
                                                }
                                                if (err) throw err;
                                            });
                                            let resultMessage = "User added to channel.";
                                            res.send({ "ok": true, resultMessage });
                                        } else {
                                            let resultMessage = "User already added to channel."
                                            res.send({ "ok": false, resultMessage });
                                        }
                                    });
                                }
                            });
                        }
                    });
                    
                }
            });
        }
    });  
}