
let newpppath;

window.addEventListener('keyup',(e)=> {
    newpppath = document.getElementById('inputpp').value;
    try {
        console.log(document.getElementById('inputPicture').src = newpppath);
        document.getElementById('inputPicture').style.display = 'initial';
        document.getElementById('inputPicture').style.width = '100px';
        document.getElementById('inputPicture').style.height = '100px';
        console.log('tryladım');
    } catch(e) {
        console.log('catchledim');
        document.getElementById('inputPicture').style.display = 'none';
        document.getElementById('inputPicture').style.width = '100px';
        document.getElementById('inputPicture').style.height = '100px';
        e.preventDefault();
    }
})

document.getElementById('changepp').addEventListener('click',()=> {


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

            window.location.href = '/home';

        } else {

        }

    });

})