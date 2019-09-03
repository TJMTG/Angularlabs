var fs = require('fs');
//this handles the info passed to it from a successful execution of doCreateChannel
//it adds a channel to channels.json, if there is not a match
module.exports = function(req, res){
    let infoOBJ = {
        "groupname": req.body.groupname,
        "name": req.body.name,
        "creator": req.body.creator
    }
    console.log("Inside 'doCreateChannel.js', with values: ", infoOBJ);
    fs.readFile('./server/data/groups.json', 'utf8', function(err, data){
        if (err) throw err;
        let groupArray = JSON.parse(data);
        let i = groupArray.findIndex(group => (
            (group.name == infoOBJ.groupname)
        ));
        if (i == -1){
            let resultMessage = "Group not found.";
            res.send({ "ok": false, resultMessage });
        } else {
            fs.readFile('./server/data/channels.json', 'utf8', function(err, data){
                if (err) throw err;
                let channelArray = JSON.parse(data);
                let i = channelArray.findIndex(channel => (
                    (channel.groupname == infoOBJ.groupname && channel.name == infoOBJ.name)
                ));
                if (i == -1){
                    channelArray.push(infoOBJ);
                    channelArrayJSON = JSON.stringify(channelArray);
                    fs.writeFile('server/data/channels.json', channelArrayJSON, 'utf-8', function(err){
                        if (err) throw err;
                    });
                    let resultMessage = "Channel created.";
                    res.send({ "ok": true, resultMessage });
                } else {
                    let resultMessage = "Channel already exists.";
                    res.send({ "ok": false, resultMessage });
                }
            });
        }
    });
    
}