var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var languageButtonsEl = document.querySelector("#language-buttons");

var formSubmitHandler = function(event) {
    event.preventDefault();
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
    console.log(event);
};
userFormEl.addEventListener("submit", formSubmitHandler);

var getUserRepos = function(user) {
//format github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

// make request to url
    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
        response.json().then(function(data) {
            displayRepos(data, user);
        });
        } else {
            alert("Error: GitHub User Not Found");
        }
    })
    .catch(function(error) {
        //This `.catch()` gets chained onto the end of the `.then()`
        alert("Unable to connect to GitHub");
    });
};

getUserRepos();

var displayRepos = function(repos, searchTerm) {
    console.log(repos);
    console.log(searchTerm);
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create container for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        //create spen element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container
        repoEl.appendChild(titleEl);

        // create status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        if (repos[i].open_issues_count > 0) {
            statusEl.innterHTML =
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-cquare status-icon icon-success'></i>";
        }
        repoEl.appendChild(statusEl);

        //append container to the dom
        repoContainerEl.appendChild(repoEl);
    }
}
// featured repos function
//var getFeaturedRepos = function(language) {
  //  var apiUrl = "https://api.github.com/search/respositories?q=" + language + "+is:featured&sort=help-wanted-issues";
   // fetch(apiUrl);
//};

var getFeaturedRepos = function(language) {
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";
  
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayRepos(data.items, language);
            });
        } else {
            alert('Error: GitHub User Not Found');
        }
    });
  };

  // language buttons
  var buttonClickHandler = function(event) {
      var language = event.target.getAttribute("data-language");
      console.log(language);
      if (language) {
          getFeaturedRepos(language);
        //clear old content
        repoContainerEl.textContent = "";
      }
  }
  languageButtonsEl.addEventListener("click", buttonClickHandler);