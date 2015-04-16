function validateUsername(textbox) {
    
    if (textbox.value == '') {
        textbox.setCustomValidity('Username is required');
    }
    else if(textbox.validity.patternMismatch){
        textbox.setCustomValidity('Please enter a valid username (5-20 characters or integers)');
    }
    else {
        textbox.setCustomValidity('');
    }
    return true;
}

function validateEmail(textbox) {
 
    if(textbox.validity.patternMismatch){
        textbox.setCustomValidity('Please enter a valid email');
    }
    else {
        textbox.setCustomValidity('');
    }
    return true;
}

function validatePassword(){
  if($("#password").val() != $("#confirm_password").val()) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}