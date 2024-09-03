
let stickynavbar = document.querySelector('.hihihi');
window.addEventListener('scroll', function () {
  if (window.pageYOffset > 20) {
    stickynavbar.classList.add('sticky');
  }
  else stickynavbar.classList.remove('sticky')
})

let APIkey = `5b25c48ee7724f2a8a594a66f59fb57d`;
let apiUrl = `https://newsapi.org/v2/everything?q=`;

window.addEventListener('load', () => {
  fatchNews('World');
})

async function fatchNews(query) {
  const res = await fetch(`${apiUrl}${query}&apiKey=${APIkey}`)
  const data = await res.json();
  // console.log(data);
  bindData(data.articles);
}

function bindData(articles) {
  const section = document.querySelector('.firstSection');
  const newsTemplate = document.querySelector('#news-card-template');

  section.innerHTML = '';
  articles.forEach(article => {
    if (!article.urlToImage) return;
    const cardclone = document.importNode(newsTemplate.content, true);
    fillDataInCard(cardclone, article);
    section.appendChild(cardclone);
  })
}

function fillDataInCard(cardclone, article) {
  const newsimage = cardclone.querySelector('.newsImage');
  const heading = cardclone.querySelector('.heading');
  const description = cardclone.querySelector('.description');
  const publishedAt = cardclone.querySelector('.time');

  newsimage.src = article.urlToImage;
  heading.innerHTML = article.title;
  description.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString('en-US', { timeZone: "Asia/Jakarta" });
  publishedAt.innerHTML = `${article.source.name} ${date}`;

  cardclone.firstElementChild.addEventListener('click', () => {
    window.open(article.url, "_blank");
  })
}


document.addEventListener('DOMContentLoaded', () => {
  const searchIcon = document.getElementById('searchIcon');
  const searchBtn = document.querySelector('.searchBtn');

  searchIcon.addEventListener('click', () => {
    searchInput.classList.add('show');
    searchBtn.classList.add('show');
    if (searchInput.classList.contains('show')) {
      searchInput.focus();
    }
    if (searchBtn.classList.contains('show')) {
      searchBtn.focus();
    }
  });
});

const searchBtn = document.querySelector('.searchBtn')
const searchInput = document.getElementById('searchInput');

searchBtn.addEventListener('click', () => {
  const query = searchInput.value;
  // console.log(query);
  if (!query) return;
  fatchNews(query);
})

let curselnav = null;

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');

  navbar.addEventListener('click', (event) => {
    const clickedElement = event.target.closest('li');

    if (clickedElement) {
      const id = clickedElement.id;
      // console.log(id)
      handleNavClick(id);
    }

    // curselnav?.classList.remove('active');
    // curselnav = clickedElement;
    // curselnav.classList.add('active');
  });

  function handleNavClick(id) {
    fatchNews(id);
  }
});

