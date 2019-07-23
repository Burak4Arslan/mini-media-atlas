
var theUser;

document.getElementById('loginButton').addEventListener("click", ()=> {

    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;

    //check if user is in the data base or not
    checkParamsLogin(loginUsername,loginPassword);


})

function checkParamsLogin(username,password) {

    if(username && password) {

        fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password
                }
            })
        }).then(function(response) {

            if(response.status=200) {
                return response.json();
            } else {
                document.getElementById('alertAlreadyDiv').style.display = "initial";
                setTimeout(()=> {document.getElementById('alertAlreadyDiv').style.display = "none";},2000)
                return -1;
            }

          }).then(function(data) {
            if(data != -1) {
                theUser = data;
                // Save data to sessionStorage
                sessionStorage.setItem('user', JSON.stringify(theUser));
                window.location.href = '/home';
            }

          });

        // 

    }


}