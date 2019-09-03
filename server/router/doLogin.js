var fs = require('fs');

module.exports = function(req, res){
    var u = req.body.username;
    //var p = req.body.pwd;
    fs.readFile('./server/data/users.json', 'utf8', function(err, data){
        if (err) throw err;
        let userArray = JSON.parse(data);
        var i = userArray.findIndex(user => (
            (user.username == u) //&& (user.pwd == p)
        ));
        if (i == -1){
            res.send({ "ok": false });
        } else {
            var result = {
                "username": userArray[i].username, 
                "email": userArray[i].email, 
                "role": userArray[i].role
            };
            res.send({ "ok": true, result});
        }
    });
}