//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
export let checkName = (strVal, varName) =>{
    if(!strVal){
        throw `you must provide a ${varName}`;
    }
    if(typeof strVal !== "string"){
        throw `${varName} should be a string`;
    }
    strVal = strVal.trim();
    if(strVal.length < 2 || strVal.length > 25){
        throw `${varName} should be at least 2 characters long with a max of 25 characters`;
    }
    if (!isNaN(strVal))
      throw `${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
}

export let checkEmail = (strVal, varName) =>{
    if(!strVal){
        throw `${varName} is not provided`;
    }
    strVal = strVal.trim();
    if(typeof strVal !== "string" || strVal.length === 0){
        throw `${varName} is not strings or is empty strings`;
    }
    let validEmail = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;
    if(!validEmail.test(strVal)){
        throw `${varName} is not a valid email address`;
    }
    strVal = strVal.toLowerCase();
    return strVal;
}

export let checkPassword = (strVal, varName)=>{
    if(!strVal){
        throw `${varName} is not provided`;
    }
    strVal = strVal.trim();
    if(typeof strVal !== "string" || strVal.length === 0){
        throw `${varName} is not strings or is empty strings`;
    }
    if(strVal.length < 8){
        throw `${varName} should be a minimum of 8 characters long`;
    }
    if(!/A-Z/){
        throw `${varName} needs to be at least one uppercase character`;
    }
    if(!/\d/){
        throw `${varName} needs to be at least one number `;
    }
    if(!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(strVal)){
        throw `${varName} needs to be at least one special character`;
    }
    for(let i = 0; i < strVal.length; i++){
        if(strVal.charAt(i) == ''){
            throw `${varName} shouldn't have spaces`;
        }
    }
    return strVal;
}


export let checkRole = (strVal, varName) =>{
    if(!strVal){
        throw `${varName} is not provided`;
    }
    strVal = strVal.trim();
    if(typeof strVal !== "string" || strVal.length === 0){
        throw `${varName} is not strings or is empty strings`;
    }
    strVal = strVal.toLowerCase();
    if(strVal !== "admin" && strVal !== "user"){
        throw `${varName} the ONLY two valid values are "admin" or "user"`;
    }
    return strVal;
}