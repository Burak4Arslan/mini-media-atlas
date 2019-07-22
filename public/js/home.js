

writer();

function writer() {
    let posts;
    const re = fetch('/home/posts').then(response=>response.json())
    re.then( (data) => { posts = data}).finally(()=> {
        let i=0;
        let myList='';
        posts= posts.posts;
        for(i=posts.length-1 ; i>-1 ;i--) {
            
            myList += '<ol class="inli"><li class="usernameList">' + posts[i].username + ' says :</li>';
            myList += '<li class="postList">' + posts[i].post + '</li></ol>';
        }
        document.getElementById('ulList').innerHTML = myList; 

    })
    
}


document.getElementById('postButton').addEventListener('click',(e)=> {

    const myPost = document.getElementById('postText').value;

    fetch('/home', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            post: {
                post: myPost
            }
        })
    }).then( (response)=> {

        if(response.status==200) {

            window.location.href = '/home';

        } else {

        }

    });
})