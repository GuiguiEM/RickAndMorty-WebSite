const locationsContainer = document.querySelector('.locations-container');
const loadMoreButton = document.querySelector('#load-more-locations');

const API = 'https://rickandmortyapi.com/api/location';
let page = 1;

async function getLocations(page = 1) {
  const res = await fetch(`${API}?page=${page}`);
  const data = await res.json();
  return data.results;
}

function renderLocations(locations) {
  locations.forEach(location => {
    locationsContainer.innerHTML += `
      <div class="location">
        <h3>${location.name}</h3>
        <span><strong>Tipo:</strong> ${location.type}</span>
        <span><strong>Dimensão:</strong> ${location.dimension}</span>
      </div>
    `;
  });
}

async function loadLocations() {
  const locations = await getLocations(page);
  renderLocations(locations);
}

loadMoreButton.addEventListener('click', async () => {
  page++;
  await loadLocations();
});

loadLocations();
