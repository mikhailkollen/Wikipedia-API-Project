import get from "./getElement.js";

const url =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=21&format=json&origin=*&srsearch=";

const form = get(".form");
const input = get(".form-input");
const resultsDOM = get(".results");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;
  if (!value) {
    resultsDOM.innerHTML =
      '<div class="error"> please enter valid search term</div>';
    return;
  }
  fetchPages(value);
});

const fetchPages = async (searchValue) => {
  resultsDOM.innerHTML = '<div class="loading"></div>';
  try {
    const response = await fetch(`${url}${searchValue}`);
    const data = await response.json();
    console.log(data);
    const results = data.query.search;
    if (results.length < 1) {
      resultsDOM.innerHTML =
        '<div class="error">No matching results. Please try again.</div>';
      return;
    }
    renderResults(results);
  } catch (error) {
    resultsDOM.innerHTML =
      '<div class="error"> there was an error loading the articles</div>';
  }
};

const renderResults = (list) => {
  const cardsList = list
    .map((item) => {
      const { title, snippet, pageid } = item;
      return `<a href="http://en.wikipedia.org/?curid=${pageid}" target="_blank">
            <h4>${title}</h4>
            <p>${snippet}</p>
          </a>`;
    })
    .join("");
  resultsDOM.innerHTML = `<div class ="articles">${cardsList}</div>`;
};
