modeSelector()
catchInput()
let globalAppState = {}
function modeSelector() {
  const howItWorks = document.getElementById('navList');
  const overlay = document.getElementById('howItWorksOverlay');
  const closeCard = document.getElementById('closeCardBtn');
  const queryTheme = document.getElementById('themeSwitch');
  const body = document.body;
  const titleArea = document.getElementById('titleArea');
  titleArea.classList.remove('hidden')

  howItWorks.addEventListener('click', function (event) {
    const target = event.target
    if(target.name === 'navHowItWorks')
    overlay.classList.remove("hidden")
  })
  
  closeCard.addEventListener('click', function () {
    overlay.classList.add('hidden')
  })

  queryTheme.addEventListener('click', function (event) {
    const target = event.target
    if (target.id === "modeLight") {
      body.classList.add('lightMode')
    } else if (target.id === 'modeDark') {
      body.classList.remove("lightMode")
    }
  })
 
}

function catchInput() {
  const fileInput = document.getElementById("fileSection")
  fileInput.addEventListener('change', async (event) => {
    const target = event.target
    if(target) {
    const pureData = target.files[0]
    const transformingData = await pureData.text();
    const dataUsers = JSON.parse(transformingData)
    globalAppState = buildingData(dataUsers)
    } 
    renderDashboard(globalAppState)
  })
}

function buildingData(users) {
  const total = users.length;
  const sortdAges = users.map(user => Number(user.idade)).sort((a, b) => a - b);

  const population = {};
  const frequencySurname = {};
  const surnameByCity = {};

  users.forEach(user => {
    const city = user.cidade;
    const surname = user.nome.split(" ")[1] || "";

    population[city] = (population[city] || 0) + 1;

    if (surname) {
      frequencySurname[surname] = (frequencySurname[surname] || 0) + 1;
    }

    if (!surnameByCity[city]) {
      surnameByCity[city] = [];
    }
    if (surname) {
      surnameByCity[city].push(surname);
    }
  });

  const topSurname = Object.entries(frequencySurname).sort((a, b) => b - a);

  const populationPercentage = {};
  Object.keys(population).forEach(city => {
    const percentage = (population[city] / total) * 100;
    populationPercentage[city] = percentage.toFixed(1) + " %";
  });

  const mostPopulousCity = Object.keys(population).sort((a, b) => population[b] - population[a])[0];
  const amountPopulation = population[mostPopulousCity]

  const sumAges = sortdAges.reduce((sum, age) => sum + age, 0);
  const averageAge = total > 0 ? (sumAges / total).toFixed(1) : 0;

  let medianAge = 0;
  if (total > 0) {
    const mid = Math.floor(total / 2);
    if (total % 2 !== 0) {
      medianAge = sortdAges[mid];
    } else {
      medianAge = ((sortdAges[mid - 1] + sortdAges[mid]) / 2).toFixed(1);
    }
  }

  return {
    totalPopulation: total,
    populationByCity: populationPercentage,
    frequencySurname: frequencySurname,
    surnameByCity: surnameByCity,
    averageAge: averageAge,
    medianAge: medianAge,
    ages: sortdAges,
    mostPopulousCity: mostPopulousCity,
    amountPopulation: amountPopulation
  };
}

function renderDashboard(data) {
  const container = document.getElementById("container");
   const titleArea = document.getElementById('titleArea');
   titleArea.classList.add('hidden');
  if (!container) return;

  let citiesHTML = "";
  for (const city in data.populationByCity) {
    const percentage = data.populationByCity[city];
    
    citiesHTML += `
      <div class="dashboard-row">
        <span>${city}</span>
        <span class="badge">${percentage}</span>
      </div>
    `;
  }

  const surnamesList = Object.entries(data.frequencySurname);
  surnamesList.sort((a, b) => b[1] - a[1]);

  let topSurnamesHTML = "";
  const maxItems = Math.min(surnamesList.length, 5);
  
  for (let i = 0; i < maxItems; i++) {
    const [surname, count] = surnamesList[i];
    
    topSurnamesHTML += `
      <div class="dashboard-row">
        <span>${surname}</span>
        <span class="count-tag">${count} usuários</span>
      </div>
    `;
  }

  container.innerHTML = `
    <div id="pdfArea" class="dashboard-grid">   
      <div class="dashboard-header">   
        <div class="dashboard-card-hero-card">
          <h3 class="card-title">Total de Usuários</h3>
          <p class="big-number">${data.totalPopulation}</p>
          <p class="small-text">Cadastrados</p>
        </div>
        <div class="ages-card">
          <h3 class="card-title">MÉTRICAS DE IDADE</h3>          
          <div class="stat-item">
            <p class="big-number">MÉDIA:</p>
            <span class="big-number">${data.averageAge} anos</span>
          </div>
          <div class="stat-item">
              <p class="small-text">MEDIANA:</p>
              <span class="big-number">${data.medianAge} anos</span>
          </div>
        </div>
        <div class="city-card">
          <h3 class="card-title">CIDADE MAIS POPULOSA</h3>
          <p class="big-number">${data.mostPopulousCity}</p>
          <p class="small-text">(${data.amountPopulation} usuários)</p>
        </div>
      </div>
      <div class="dashboard-footer">
        <div class="dashboard-card">
          <h3>Distribuição por Cidade</h3>
          <div>
            <p>Cidade</p>
            <p>Porcentagem</p>
          <div class="list-container">
            ${citiesHTML}
          </div>
        </div>
        <div class="dashboard-card">
          <h3>SOBRENOME PREDOMINANTE POR REGIÃO</h3>
          <div class="list-container">
            ${topSurnamesHTML}
          </div>
        </div>
      </div>
    </div>
  `;
  //initPdfExport();
}