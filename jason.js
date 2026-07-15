modeSelector()
catchInput()
let globalAppState = {}
function modeSelector() {
  const navList = document.getElementById('navList');
  const overlay = document.getElementById('howItWorksOverlay');
  const closeCard = document.getElementById('closeCardBtn');
  const queryTheme = document.getElementById('themeSwitch');
  const body = document.body;
  const titleArea = document.getElementById('titleArea');
  const renderCard = document.getElementById('pdfArea')
  
  titleArea.classList.remove('hidden')

  navList.addEventListener('click', function (event) {
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

function extractSurname(fullName) {
  if (!fullName) return "";

  const partsOfTheName = fullName.trim().split(/\s+/);
  
  if (partsOfTheName.length < 2) {
    return "";
  }

  return partsOfTheName[partsOfTheName.length -1]
}

function buildingData(users) {
  const total = parseFloat(users.length)
  const sortdAges = users.map(user => Number(user.idade)).sort((a, b) => a - b);

  const population = {};
  const frequencySurname = {};
  const surnameByCity = {};

  users.forEach(user => {
    const city = user.cidade;
    const surname = extractSurname(user.nome)
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
  
  const topSurname = Object.entries(frequencySurname).sort((a, b) => b[1] - a[1]);

  const populationPercentage = [];
  let currentCity = Object.entries(population)

    for (let i = 0; i < currentCity.length; i++) {
     
      const citie = currentCity[i][0]
      const percentage = parseFloat(((currentCity[i][1] / total) * 100).toFixed(1))
      
      populationPercentage.push([citie, percentage])
    }  

    populationPercentage.sort((a, b) => b[1] - a[1])
    
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
    surnameByCity: surnameByCity,
    averageAge: averageAge,
    medianAge: medianAge,
    ages: sortdAges,
    mostPopulousCity: mostPopulousCity,
    amountPopulation: amountPopulation,
    topSurname: topSurname
  };
}

function renderDashboard(data) {
  const container = document.getElementById("container");
   const titleArea = document.getElementById('titleArea');
   titleArea.classList.add('hidden');
  if (!container) return;

  listTopSurnameHTML = []

  data.topSurname.forEach(([surname, count]) => {

    let championCity = "";
    let bigerPercentage = 0;
    let bigerCount = 0;

    Object.keys(data.surnameByCity).forEach(city => {

      const cityCount = data.surnameByCity[city].filter(s => s === surname).length;
      if (cityCount > bigerCount) {
        bigerCount = cityCount;
        championCity = city;
      }

    });
    let topSurnameHTML = `
      <div id="frequencyCard" class="dashboard-row">
        <p> mais encontrando em <strong>${championCity}</strong> (${bigerCount.toLocaleString('pt-BR')})</p>
      </div>
    `;
    listTopSurnameHTML.push(topSurnameHTML);
  });

  let citiesHTML = "";
  
    data.populationByCity.forEach(item => {
    
    citiesHTML += `
      <div id="frequencyByCity" class="dashboard-row">
        <span>${item[0]}</span>
        <span class="badge">${item[1]} %</span>
      </div>
    `;
  });

  let topSurnamesHTML = "";
  const maxItems = Math.min(data.topSurname.length, 5);
  
  for (let i = 0; i < maxItems; i++) {
    const [surname, count] = data.topSurname[i];
    
    topSurnamesHTML += `
      <div id="listSurname" class="dashboard-row">
          <div id="top-card-list-surame">
              <span id="surname">${surname}</span>
              <span id="count-tag">${count.toLocaleString('pt-BR')} usuários</span>
          </div>
          <span>${listTopSurnameHTML[i] || ""}</span>
      </div>
    `;
  }

  content.innerHTML = `
  <div id="pdfArea" class="dashboard-grid">
    <div id="dashboard-header">
        <div id="totalUsersCard" class="header-card">
            <h3 class="card-title">TOTAL DE USUÁRIOS</h3>
            <p class="big-number">${data.totalPopulation.toLocaleString('pt-BR')}</p>
            <p class="small-text">Cadastrados</p>
        </div>
        <div id="ageMetricsCard" class="header-card">
            <h3 class="card-title">MÉTRICAS DE IDADE</h3>
            <div id="metrics">
                <div class="stat-item">
                    <p class="small-text">MÉDIA:</p>
                    <span class="big-number">${data.averageAge} anos</span>
                </div>
                <div class="stat-item">
                    <p class="small-text">MEDIANA:</p>
                    <span class="big-number">${data.medianAge} anos</span>
                </div>
            </div>
        </div>
        <div id="mostPopulousCityCard" class="header-card">
            <h3 class="card-title">CIDADE MAIS POPULOSA</h3>
            <p class="big-number">${data.mostPopulousCity}</p>
            <p class="small-text">(${data.amountPopulation.toLocaleString('pt-BR')} usuários)</p>
        </div>
    </div>
    <div id="dashboard-footer">
        <div id="cityDistributionCard" class="dashboard-card">
            <h3>DISTRIBUIÇÃO POR CIDADE</h3>
            <div id="list-footer-card-row">
                <p>Cidade</p>
                <p>Porcentagem</p>
            </div>
            <div id="cityList" class="list-container">
                ${citiesHTML}
            </div>
        </div>
        <div id="topSurnamesCard" class="dashboard-card">
            <h3>SOBRENOME PREDOMINANTE POR REGIÃO</h3>
            <div id="topSurnamesList" class="list-container">
                ${topSurnamesHTML}
            </div>
        </div>
    </div>
</div>`;
  //initPdfExport();
}