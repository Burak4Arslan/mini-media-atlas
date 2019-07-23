
let newpppath;
var isPhoto = false; 
window.addEventListener('keyup',(e)=> {
    newpppath = document.getElementById('inputpp').value;
    var pos = newpppath.indexOf("http");
    if(pos>-1) {
        console.log(document.getElementById('inputPicture').src = newpppath);
        document.getElementById('inputPicture').style.display = 'initial';
        document.getElementById('inputPicture').style.width = '100px';
        document.getElementById('inputPicture').style.height = '100px';
        isPhoto = true;
    } else {
        document.getElementById('inputPicture').style.display = 'none';
        document.getElementById('inputPicture').style.width = '100px';
        document.getElementById('inputPicture').style.height = '100px';
        isPhoto = false;
    }
})

document.getElementById('changepp').addEventListener('click',()=> {

    if(!isPhoto) {
        const alert = document.getElementById('myAlerter')
        alert.style.display = 'initial';

        setTimeout(()=>{alert.style.display = 'none'} ,2000);

        return;

    }
    document.getElementById('load').style.display = 'initial';
    fetch('/home/pp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pp: {
                pppath: newpppath
            }
        })
    }).then((response)=> {
        console.log(response);
        if(response.status==200) {
            document.getElementById('load').style.display = 'none';
            window.location.href = '/home';

        } else {

        }

    });

})