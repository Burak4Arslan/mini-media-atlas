

document.getElementById('loginButton').addEventListener("click", ()=> {

    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;

    //check if user is in the data base or not
    checkParamsLogin(loginUsername,loginPassword);


})

function checkParamsLogin(username,password) {

    if(username == 'a' && password == 'b') {

        rightParamsLogin('Hoşgeldiniz ' + username);

    } else {

        wrongParamsLogin('Kullanıcı Adı veya Şifre Yanlış')

    }

}

function wrongParamsLogin(message) {

    console.log(message)

}

function rightParamsLogin(message) {

    console.log(message)

}