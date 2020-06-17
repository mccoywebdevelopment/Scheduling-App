function nameValidation(inputtxt){
    if(inputtxt.length<1){
        return "This field is required.";
    }
    var letters = /^[A-Za-z]+$/;
    if(inputtxt.match(letters)){
        return "";
    }else{
        return "Please enter a valid name.";
    }
}
function validateEmail(email){
    if(email.length<1){
        return "This field is required.";
    }
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email)){
        return ""
    }else{
        return "Please enter a valid email."
    }
}
function phonenumberValidator(inputtxt){
    if(inputtxt.length<1){
        return "This field is required."
    }
    var phoneno = /^\d{10}$/;
    if(inputtxt.match(phoneno)){
        return "";
    }else{
        return "Please enter a valid phone number.";
    }
}
function streetAddressValidator(c) {
    if(c.length<1){
        return "This field is required.";
    }else{
        return "";
    }
}
function cityValidator(city){
    if(city.length<1){
        return "This field is required.";
    }else{
        return "";
    }
}
function stateValidator(city){
    if(city.length<1){
        return "This field is required.";
    }else{
        return "";
    }
}
function zipValidator(city){
    if(city.length<1){
        return "This field is required.";
    }else if(/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(city)){
        return "";
    }else{
        return "Please enter a valid zip";
    }
}
module.exports = { nameValidation , validateEmail , phonenumberValidator , streetAddressValidator,
     cityValidator , stateValidator , zipValidator}