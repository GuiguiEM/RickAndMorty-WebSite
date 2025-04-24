const episodesContainer = document.querySelector('.episodes-container');
const loadMoreButton = document.querySelector('#load-more-episodes');

const API = 'https://rickandmortyapi.com/api/episode';
let page = 1;

async function getEpisodes(page = 1) {
  const res = await fetch(`${API}?page=${page}`);
  const data = await res.json();
  return data.results;
}

function renderEpisodes(episodes) {
  episodes.forEach(episode => {
    episodesContainer.innerHTML += `
      <div class="episode">
        <h3>${episode.name}</h3>
        <span><strong>Data:</strong> ${episode.air_date}</span>
        <span><strong>Episódio:</strong> ${episode.episode}</span>
      </div>
    `;
  });
}

async function loadEpisodes() {
  const episodes = await getEpisodes(page);
  renderEpisodes(episodes);
}

loadMoreButton.addEventListener('click', async () => {
  page++;
  await loadEpisodes();
});

loadEpisodes();
