$(document).ready(function(){
  let queryString = window.location.href;
  let username =queryString.split('=')[1];
  console.log(queryString);
  $.ajax({
    url:'https://api.github.com/users/'+username,
    data:{
      client_id:'b9315bcd5a07fcd759d8',
      client_secret:'a2b698bf7e7c02f898197cf136d1a41f704ca8e4'
    }
}).done(function(user){
  $.ajax({
    url:'https://api.github.com/users/'+username+'/repos',
    data:{
      client_id:'b9315bcd5a07fcd759d8',
      client_secret:'a2b698bf7e7c02f898197cf136d1a41f704ca8e4',
      sort: 'created: asc',
      per_page: 5
    }
  }).done(function(repos){
    $.ajax({
      url:'https://api.github.com/users/'+username+'/followers',
      data:{
        client_id:'b9315bcd5a07fcd759d8',
        client_secret:'a2b698bf7e7c02f898197cf136d1a41f704ca8e4',
        sort: 'created: asc',
        per_page: 9

      }
  }).done(function(followers){
      $.each(repos, function(index, repo){
        $('#repos').append(`
          <div class="card">
            <div class="row">
              <div class="col-md-7">
                <strong>${repo.name}</strong>: ${repo.description}
              </div>
              <div class="col-md-3">
                <span class="badge badge-dark">Forks: ${repo.forks_count}</span>
                <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
                <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
              </div>
              <div class="col-md-2">
                <a href="${repo.html_url}" target="_blank" class="btn btn-dark">Repo Page</a>
              </div>
            </div>
          </div>
        `);
      });
    $.each(followers, function(index, foll){
      $('#novi').append(`
          <div id="fo" class="col-md-6">
            <strong>${foll.login}</strong>
            <img class="img-foll" src="${foll.avatar_url}">
          </div>
      </div>
      `);
    });
});

  $('#profile').html(`
    <div class="card border-primary mb-3" style="max-width: 100rem;">
      <div class="card-header"><h3>${user.login}</h3></div>
      <div class="card-body">
        <div class="row">
        <div class="col-md-3">
          <img class="img-thumbnail avatar" src="${user.avatar_url}">
          <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
        </div>
        <div class="col-md-6">
          <span class="badge badge-dark">Public Repos: ${user.public_repos}</span>
          <span class="badge badge-primary">Public Gists: ${user.public_gists}</span>
          <span class="badge badge-success">Followers: ${user.followers}</span>
          <span class="badge badge-info">Following: ${user.following}</span>
          <br><br>
          <ul class="list-group">
            <li class="list-group-item">Company: ${user.company}</li>
            <li class="list-group-item">Website/blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
            <li class="list-group-item">Location: ${user.location}</li>
            <li class="list-group-item">Member Since: ${user.created_at}</li>
          </ul>
          </div>
          
          <div  id="followers" class="col-md-3" > <h1 class="page-header style="align-self: center;">Followers</h1>
          <div id="novi"  style ="display: flex;
          list-style:none;
          flex-wrap: wrap;
          align-items: flex-start;
          justify-content:center;
          flex-basis: 80%;"> </div>
        </div>
        </div>
      </div>
    </div>
    <h3 class="page-header">Latest Repository</h3>
    <div id="repos"></div>
  `);
});
});
});