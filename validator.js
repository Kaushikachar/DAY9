const isValid = function(value){
    if(typeof value === "undefined" || value === null)return false;
    if(typeof value === "string" && value.trim().length === 0)return false;
    if(typeof vlaue === Number && value.trim().length === 0)return false;
    return true;

};
let isValidBody = function(body){
    return Object.keys(body).length>0;

};
let isValidName =  /^[a-z ,.'-]+$/i ;
;

let isValidEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ ;

let isValidMobile = /^(\+\d{1,3}[- ]?)?\d{10}$/ ;

module.exports = {isValid,isValidBody,isValidName,isValidEmail,isValidMobile};