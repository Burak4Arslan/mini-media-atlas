

document.getElementById('signButton').addEventListener("click", ()=> {

    const signEmail = document.getElementById('signEmail').value;
    const signUsername = document.getElementById('signUsername').value;
    const signPassword = document.getElementById('signPassword').value;

    //check if user is in the data base or not
    checkParamsSign(signEmail,signUsername,signPassword);


})

function checkParamsSign(email,username,password) {

    if(email && username && password) {

        fetch('/sign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    email: email,
                    username: username,
                    password: password
                }
            })
        }).then( (response)=> {

            if(response.status==200) {

                window.location.href = '/';

            } else {

                document.getElementById('alertAlreadyDiv').style.display = "initial";

                setTimeout(()=> {document.getElementById('alertAlreadyDiv').style.display = "none";},2000)

            }

        });

    }

}
