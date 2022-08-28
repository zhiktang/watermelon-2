var submit = document.getElementById('button');
console.log(submit.id);
//???????????
console.log("script works lol");
submit.addEventListener('click', ()=> {
    console.log("click");
    var username = document.getElementById('username-input').value;
    document.getElementById('opener').style.visibility = 'hidden';
    console.log(username);
    document.getElementById('username-display').innerHTML = username;
    document.getElementById('sus-surround').hidden = false;
    document.getElementById('sus').hidden = false;
    document.getElementById('sus-surround').style.zIndex = '1';
    console.log("script works lol");
});