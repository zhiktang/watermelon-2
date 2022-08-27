var submit = document.getElementById('button');
console.log(submit.id);
//???????????
console.log("script works lol");
submit.addEventListener('click', ()=> {
    console.log("click");
    var username = document.getElementById('username-input').value;
    document.getElementById('opener').style.visibility = 'hidden';
    console.log(username);
    document.getElementById('sus').innerHTML = username;
    document.getElementById('sus').style.visibility = 'visible';
});