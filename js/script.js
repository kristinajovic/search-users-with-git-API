const ul = document.getElementById('authors');
const username = document.getElementById("searchUser");

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

async function getGithubData() {
  let data = await fetch('https://api.github.com/users?since=135&access_token=d9abc9fe10d3f2639292833611f6bd925923c371');
  let arr = await data.json();

  for (var i = 0; i < 30; i++) {
    let li = createNode('li'),
    span = createNode('span'),
    img = createNode('img'),
    link = createNode('a');
    span.innerHTML = arr[i].login;
    img.src = arr[i].avatar_url;
    link.href = 'user.html?username=' + arr[i].login;

    append(link, img);
    append(li, link);
    append(li, span);
    append(ul, li);

  }

}
async function getGithubDataForUser() {
 
  $(ul).empty();
  debugger;

  
  let data = await fetch('https://api.github.com/users/' + username.value);
  let oneUser = await data.json();
 
  let li = createNode('li'),
    span = createNode('span'),
    img = createNode('img'),
    link = createNode('a');
  span.innerHTML = oneUser.login;
  img.src = oneUser.avatar_url;
  link.href = 'user.html?username=' + oneUser.login;

  if(oneUser.login==undefined) {
    alert('There is no user with that username!');
    return;
  }

  append(link, img);
  append(li, link);
  append(li, span);
  append(ul, li);

}
function searchSingleUser() {
  if(username.value=="") {
    alert('Please insert correct username!');
    return;
  } 

  getGithubDataForUser();

}
