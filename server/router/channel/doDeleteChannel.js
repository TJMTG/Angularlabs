var fs = require('fs');
//this handles the info passed to it from a successful execution of doDeleteChannel
//it removes a channel from channels.json, if there is a match
module.exports = function(req, res){
    let infoOBJ = {
        "groupname": req.body.groupname,
        "name": req.body.name,
    }
    console.log("Inside 'doDeleteChannel.js', with values: ", infoOBJ);
    fs.readFile('./server/data/channels.json', 'utf8', function(err, data){
        if (err) throw err;
        let channelArray = JSON.parse(data);
        let i = channelArray.findIndex(channel => (
            (channel.groupname == infoOBJ.groupname && channel.name == infoOBJ.name)
        ));
        if (i == -1){
            let resultMessage = "Channel not found.";
            res.send({ "ok": false, resultMessage });
        } else {
            channelArray.splice(i, 1);
            channelArrayJSON = JSON.stringify(channelArray);
            fs.writeFile('server/data/channels.json', channelArrayJSON, 'utf-8', function(err){
                if (err) throw err;
            });
            let resultMessage = "Channel deleted."
            res.send({ "ok": true, resultMessage });
        }
    });
}