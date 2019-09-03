var fs = require('fs');
//this handles the info passed to it from a successful execution of doCreateUser
//it adds a user to the users.json file, with the given username, email, and role, if there is no match
module.exports = function(req, res){
    let infoOBJ = {
        "username": req.body.username,
        "email": req.body.email,
        "role": req.body.role
    }
    console.log("Inside 'doCreateUser.js', with values: ", infoOBJ);
    fs.readFile('./server/data/users.json', 'utf8', function(err, data){
        if (err) throw err;
        let userArray = JSON.parse(data);
        let i = userArray.findIndex(user => (
            (user.username == infoOBJ.username)
        ));
        if (i == -1){
            let userArray = JSON.parse(data);
            userArray.push(infoOBJ);
            userArrayJSON = JSON.stringify(userArray);
            fs.writeFile('server/data/users.json', userArrayJSON, 'utf-8', function(err){
                if (err) throw err;
            });
            let resultMessage = "User created."
            res.send({ "ok": true, resultMessage});
        } else {
            let resultMessage = "User already exists."
            res.send({ "ok": false, resultMessage })
        }
    });
}

