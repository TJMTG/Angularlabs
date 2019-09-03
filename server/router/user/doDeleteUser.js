var fs = require('fs');
//this handles the info passed to it from a successful execution of doDeleteUser
//it removes a user with the given username, if a match is found
module.exports = function(req, res){
    let infoOBJ = {
        "username": req.body.username,
    }
    console.log("Inside 'doDeleteUser.js', with values: ", infoOBJ);
    fs.readFile('./server/data/users.json', 'utf8', function(err, data){
        if (err) throw err;
        let userArray = JSON.parse(data);
        let i = userArray.findIndex(user => (
            (user.username == infoOBJ.username)
        ));
        if (i == -1){
            let resultMessage = "User doesn't exist."
            res.send({ "ok": false, resultMessage});
        } else {

            //
            //need to delete any group pairs first
            //

            //
            //need to delete any channel pairs first
            //

            //
            //need to delete any assisAdmin pairs first
            //

            userArray.splice(i, 1);
            userArrayJSON = JSON.stringify(userArray);
            fs.writeFile('server/data/users.json', userArrayJSON, 'utf-8', function(err){
                if (err) throw err;
                res.send(userArray);
            });
            let resultMessage = "User deleted."
            res.send({ "ok": false, resultMessage })
        }
    });
}