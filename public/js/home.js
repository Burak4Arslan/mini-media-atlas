

// Get saved data from sessionStorage
var theUser = sessionStorage.getItem('user');
theUser = JSON.parse(theUser);
writer();

function writer() {
    let posts;
    const re = fetch('/home/posts').then(response=>response.json())
    re.then( (data) => { posts = data}).finally(()=> {
        let i=0;
        let myList='';
        posts= posts.posts;
        for(i=posts.length-1 ; i>-1 ;i--) {
            
            myList += '<ol class="inli">'+
            '<li class="usernameList"><img class="pPicture" width="30px" height="30px" src="'+ posts[i].ppurl +'">' +
            posts[i].username + ' says :</li>';
            myList += '<li class="postList">' + posts[i].post + '</li><small class="fr">'+ posts[i].time +'</small></ol>';
        }
        document.getElementById('ulList').innerHTML = myList; 

    })
    repeater = setTimeout(writer, 1000);
}


document.getElementById('postButton').addEventListener('click',(e)=> {

    const myPost = document.getElementById('postText').value;
    if(!myPost) {
        return;
    }

    fetch('/home', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            post: {
                post: myPost
            },
            user : theUser
        })
    }).then( (response)=> {

        if(response.status==200) {
            document.getElementById('postText').value = '';
            writer();

        } else {

        }

    });
})