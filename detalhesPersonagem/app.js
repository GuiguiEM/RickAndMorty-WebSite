const params = new URLSearchParams(window.location.search)
const charId = params.get('id')
const API = 'https://rickandmortyapi.com/api/character'
const detailsContainer = document.getElementById('character-details')

let currentPage = 1
const episodesPerPage = 5
let characterEpisodes = []

async function getCharacter(id) {
  const response = await fetch(`${API}/${id}`)
  const character = await response.json()
  return character
}

async function getEpisodes(episodeUrls) {
  const episodes = await Promise.all(episodeUrls.map(url => fetch(url).then(res => res.json())))
  return episodes
}

function renderEpisodes(episodes, page) {
  const start = (page - 1) * episodesPerPage
  const end = start + episodesPerPage
  const paginated = episodes.slice(start, end)

  let html = '<h2>Episódios</h2><ul>'
  paginated.forEach(ep => {
    html += `<li><strong>${ep.episode}</strong>: ${ep.name}</li>`
  })
  html += '</ul>'

  // Navegação
  html += `
    <div class="pagination">
      <button ${page === 1 ? 'disabled' : ''} id="prev">Anterior</button>
      <button ${end >= episodes.length ? 'disabled' : ''} id="next">Próximo</button>
    </div>
  `

  return html
}

async function renderCharacter() {
  const character = await getCharacter(charId)
  characterEpisodes = await getEpisodes(character.episode)

  detailsContainer.innerHTML = `
    <div class="character">
              <img src="${character.image}" alt="${character.name}" />
              <h1>${character.name}</h1>
            </div>
            <div class="separacao">
              <div class="details">
                <h2>Informations</h2>
                <p><strong>Espécie:</strong> ${character.species}</p>
                <p><strong>Status:</strong> ${character.status}</p>
                <p><strong>Gênero:</strong> ${character.gender}</p>
                <p><strong>Origem:</strong> ${character.origin.name}</p>
                <p><strong>Localização Atual:</strong> ${character.location.name}</p>
              </div>
              <div id="episodes-container">
                ${renderEpisodes(characterEpisodes, currentPage)}
              </div>
            </div>
  `

  addPaginationEvents()
}

function addPaginationEvents() {
  const prevBtn = document.getElementById('prev')
  const nextBtn = document.getElementById('next')

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--
        updateEpisodes()
      }
    })
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if ((currentPage * episodesPerPage) < characterEpisodes.length) {
        currentPage++
        updateEpisodes()
      }
    })
  }
}

function updateEpisodes() {
  const episodesContainer = document.getElementById('episodes-container')
  episodesContainer.innerHTML = renderEpisodes(characterEpisodes, currentPage)
  addPaginationEvents()
}

renderCharacter()
