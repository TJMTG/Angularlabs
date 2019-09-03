var fs = require('fs');

module.exports = function(username){
    console.log("Inside 'doFindUser.js', with value: ", username);
    fs.readFile('./server/data/users.json', 'utf8', function(err, data){
        if (err) throw err;
        let userArray = JSON.parse(data);
        let i = userArray.findIndex(user => (
            (user.username == username)
        ));
        if (i == -1){
            let resultMessage = "User not found.";
            res.send({ "result": false, resultMessage  })
        } else {
            let resultMessage = "User found."
            res.send({ "result": true, resultMessage })
        }
    });
}