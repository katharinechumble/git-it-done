var getUserRepos = function(user) {
//format githut api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

// make request to url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

getUserRepos("katharinechumble");