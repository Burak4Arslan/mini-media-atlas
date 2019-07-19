
document.getElementById('signButton').addEventListener("click", (e)=> {

    const signEmail = document.getElementById('signEmail').value;
    const signUsername = document.getElementById('signUsername').value;
    const signPassword = document.getElementById('signPassword').value;

    //check if user is in the data base or not
    checkParamsSign(signEmail,signUsername,signPassword,e);


})

function checkParamsSign(email,username,password,e) {

    if(username == 's' && password == 'b') {

        rightParamsSign('İşlem Başarıyla Gerçekleşti ' + username);

    } else {

        wrongParamsSign('Kullanıcı Adı veya Email Geçersiz');
        e.preventDefault();
    }

}

function wrongParamsSign(message) {

    console.log(message)

}

function rightParamsSign(message) {

    console.log(message)

}