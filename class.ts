

class Users {
    username: String;
    birthdate: String;
    age: number;
    email: String
    password: String
    valid: Boolean;

    constructor(
        username: String, 
        birthdate: String, 
        age: number, 
        email: String, 
        password: String,
        valid: Boolean
        ){
            this.username = username;
            this.birthdate = birthdate;
            this.age = age;
            this.email = email;
            this.password = password;
            this.valid = valid;
    }
}