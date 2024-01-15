// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!
let checkName = (strVal) =>{
    if(!strVal){
    }
    if(typeof strVal !== "string"){
        throw `name should be a string`;
    }
    strVal = strVal.trim();
    if(strVal.length < 2 || strVal.length > 25){
        throw `name should be at least 2 characters long with a max of 25 characters`;
    }
    if (!isNaN(strVal))
      throw `${strVal} is not a valid value for name as it only contains digits`;
}

let checkEmail = (strVal) =>{
    if(!strVal){
        throw `email is not provided`;
    }
    strVal = strVal.trim();
    if(typeof strVal !== "string" || strVal.length === 0){
        throw `email is not strings or is empty strings`;
    }
    let validEmail = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;
    if(!validEmail.test(strVal)){
        throw `email is not a valid email address`;
    }
    strVal = strVal.toLowerCase();
}

let checkPassword = (strVal)=>{
    if(!strVal){
        throw `password is not provided`;
    }
    strVal = strVal.trim();
    if(typeof strVal !== "string" || strVal.length === 0){
        throw `password is not strings or is empty strings`;
    }
    if(strVal.length < 8){
        throw `password should be a minimum of 8 characters long`;
    }
    if(!/A-Z/){
        throw `password needs to be at least one uppercase character`;
    }
    if(!/\d/){
        throw `password needs to be at least one number `;
    }
    if(!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(strVal)){
        throw `password needs to be at least one special character`;
    }
    for(let i = 0; i < strVal.length; i++){
        if(strVal.charAt(i) == ''){
            throw `password shouldn't have spaces`;
        }
    }
}

let checkConfirm = (code1,code2) =>{
    if(code1!=code2)
        throw "the confirmpassword does not match the password";
}


let checkRole = (strVal) =>{
    if(!strVal){
        throw `role is not provided`;
    }
    strVal = strVal.trim();
    if(typeof strVal !== "string" || strVal.length === 0){
        throw `role is not strings or is empty strings`;
    }
    strVal = strVal.toLowerCase();
    if(strVal !== "admin" && strVal !== "user"){
        throw `role the ONLY two valid values are "admin" or "user"`;
    }
}


var valid1=false;
$('#clienterror').hide()
$('#registration-form').submit((event)=>{
    if(!valid1)
    {
        event.preventDefault();
        try{
            if($('#firstNameInput').length)
                checkName($('#firstNameInput').val())
            if($('#lastNameInput').length)
                checkName($('#lastNameInput').val())
            if($('#emailAddressInput').length)
                checkEmail($('#emailAddressInput').val());
            if($('#passwordInput').length)
                checkPassword($('#passwordInput').val());
            if($('#confirmPasswordInput').length)
                checkConfirm($('#passwordInput').val(),$('#confirmPasswordInput').val())
            if($('roleInput').length)
                checkRole($('roleInput').val())
            valid1=true;
            $('#registration-form').submit();
            valid1=false;
        }catch(e){
            const errorinfo=`<p>${e}</p>`
            $('#clienterror').text(e);
            $('#clienterror').show();
        }
        }
    })
    
    var valid2=false;
    $('#clienterror2').hide()
    $('#login-form').submit((event)=>{
        if(!valid2)
        {
            event.preventDefault();
            try{
                if($('#emailAddressInput').length)
                    checkEmail($('#emailAddressInput').val());
                if($('#passwordInput').length)
                    checkPassword($('#passwordInput').val());
                valid2=true;
                $('#login-form').submit();
                valid2=false;
            }catch(e){
                const errorinfo=`<p>${e}</p>`
                $('#clienterror2').text(e);
                $('#clienterror2').show();
            }
            }
        })