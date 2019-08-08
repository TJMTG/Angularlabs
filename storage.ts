


if (typeof(Storage) !== "undefined"){

    console.log('Storage ready');

    var loginInfoObj = {
            "Username":"Bobalicious",
            "Birthdate":"01/01/01",
            "Age":"1018",
            "Email":"food@email.com"
        }

    let stringifiedUsername = JSON.stringify(loginInfoObj[0].Username);
    sessionStorage.setItem("username", stringifiedUsername);

    let stringifiedBirthdate = JSON.stringify(loginInfoObj[0].Birthdate);
    sessionStorage.setItem("birthdate", stringifiedBirthdate);

    let stringifiedAge = JSON.stringify(loginInfoObj[0].Age);
    sessionStorage.setItem("age", stringifiedAge);

    let stringifiedEmail = JSON.stringify(loginInfoObj[0].Email);
    sessionStorage.setItem("email", stringifiedEmail);

    if (true == true){
        console.log("Username: ", sessionStorage.getItem("username")); //capital i (in getItem) or not?
        console.log("Birthdate: ", sessionStorage.getItem("birthdate"));
        console.log("Age: ", sessionStorage.getItem("age"));
        console.log("Email: ", sessionStorage.getItem("email"));
    }

} else {
    console.log("No Storage Support");
}
//sessionStorage.clear(); to clear all items from storage