
const FormHandler = (function() {
    const southAmericaCountries={
        Colombia:57,
        Ecuador:593,
        Paraguay:595,
        Peru:51,
        Brasil:55,
        Argentina:54,
        Chile:56,
        Venezuela:58,
        Bolivia:591,
        Uruguay:598,
    }
    let currentCountry
    let pW

    function init() {
        const form = document.querySelector('.form');
        form.addEventListener('input', handleInputChange);
        form.addEventListener('submit', submitForm);
    }
    function submitForm(e){
        console.log(isEmpty()== false)
        if(isEmpty()== false){
            alert('Data submited successfully!')
        }else{
            e.preventDefault()
            isEmpty()
        }
        
    }
    function handleInputChange(e){
        
        switch (e.target.id){
            case 'email':
                validateEmail(e.target)
                break
            case 'country':
                currentCountry=validateCountry(e.target)
                break
            case 'code':
                validatePostalCode(e.target, currentCountry)
                break
            case 'password':
                pW= validatePassword(e.target)
                break
            case 'password2':
                confirmPassword(e.target, pW)
                break
        }
    }
    function isEmpty(){
        const inputs = document.querySelectorAll('input')
        inputs.forEach(target=>{
            target.setCustomValidity("");
            if(target.value.length == 0){
                //target.className='invalid'
                target.setCustomValidity(`Enter a valid ${target.name}`);
                target.reportValidity();
                return true
            }
        })
        return false
    }
    function validateEmail(email){
        email.setCustomValidity("");
        
        if (!email.checkValidity()) {
            email.setCustomValidity('Invalid email address');
            email.reportValidity();
        }
        
    }
    function validateCountry(country){
        country.setCustomValidity("");
        const countryName = country.value;
        if(southAmericaCountries[countryName]){
            let obj={[country.value]: southAmericaCountries[country.value]}
            return obj
        }else {
            country.setCustomValidity('Not a South American country');
            country.reportValidity();
        }
    }
    function validatePostalCode(code, currentCountry){
        console.log(currentCountry)
        code.setCustomValidity("");
        
        if(currentCountry== undefined){
            code.setCustomValidity(`Enter country first`);
            code.reportValidity();
            code.value = ''
        }else{
            if(code.value != Object.values(currentCountry)){
                code.setCustomValidity("");
                const countryName = Object.keys(currentCountry)[0];
                code.setCustomValidity(`Not ${countryName}'s postal code`);
                code.reportValidity();
            }
        }
    }
    function  validatePassword(password){
        password.setCustomValidity("");
        const isUpperCase = string => /\p{Lu}/u.test(string)
        const isChar = string => string.match(/\W/)? true: false

        if(password.value.length < 8){
            password.setCustomValidity('Password must be 8 characters or more');
            password.reportValidity();
        }else if(isUpperCase(password.value)== false){
            password.setCustomValidity('Password must contain at least 1 upper-case letter');
            password.reportValidity();
        }else if (isChar(password.value) == false){
            password.setCustomValidity('Password must contain at least 1 special character');
            password.reportValidity();
        } 
        return password.value
        
    }
    function confirmPassword(password2, pW){
        password2.setCustomValidity("");
        if (password2.value !== pW) {
            password2.setCustomValidity("Passwords don't match");
            password2.reportValidity();
        }
    }
    return { init,};
})();
FormHandler.init()