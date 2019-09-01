var fs = require('fs');
//this handles the info passed to it from a sucsefful execution of doLoginSTART
//it writes the data to the extendedUsers.json file
module.exports = function(req, res){
    let userOBJ = {
        "username": req.body.username,
        //"pwd": req.body.pwd,
        "email": req.body.email,
        "role": req.body.role,
        "valid": req.body.valid
    }
    let userArray = [];
    fs.readFile('./server/data/extendedUsers.json', 'utf8', function(err, data){
        if (err) throw err;
        let userArray = JSON.parse(data);
        userArray.push(userOBJ);
        userArrayJSON = JSON.stringify(userArray);
        fs.writeFile('server/data/extendedUsers.json', userArrayJSON, 'utf-8', function(err){
            if (err) throw err;
            res.send(userArray);
        });
    });
}