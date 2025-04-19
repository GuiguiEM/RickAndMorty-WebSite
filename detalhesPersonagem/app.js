const params = new URLSearchParams(window.location.search)
const charId = params.get('id')
const API = 'https://rickandmortyapi.com/api/character'
const detailsContainer = document.getElementById('character-details')

async function getCharacter(id) {
  const response = await fetch(`${API}/${id}`)
  const character = await response.json()
  return character
}

async function renderCharacter() {
  const character = await getCharacter(charId)
  detailsContainer.innerHTML = `
    <h1>${character.name}</h1>
    <img src="${character.image}" alt="${character.name}" />
    <p><strong>Espécie:</strong> ${character.species}</p>
    <p><strong>Status:</strong> ${character.status}</p>
    <p><strong>Gênero:</strong> ${character.gender}</p>
    <p><strong>Origem:</strong> ${character.origin.name}</p>
    <p><strong>Localização Atual:</strong> ${character.location.name}</p>
  `
}

renderCharacter()
