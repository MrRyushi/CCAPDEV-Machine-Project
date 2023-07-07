document.querySelector("#registerBtn").addEventListener("click", (e) => {
    e.preventDefault();
    let emailInput = document.querySelector("#emailInput").value;
    let passwordInput = document.querySelector("#passwordInput").value;
    let accountTypeRadio = document.getElementsByName("account-type");
    let accountType;
    console.log(accountTypeRadio);
    for(let i = 0; i < accountTypeRadio.length; i++){
        if(accountTypeRadio[i].checked){
            accountType = accountTypeRadio[i].value;
    }
}

console.log(emailInput + " " + passwordInput + " " + accountType);
})