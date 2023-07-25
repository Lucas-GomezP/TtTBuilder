// En este archivo se crearan varias funciones generales necesitadas en varias partes del codigo.

// Creamos una funcion para obtener el slot actual en el que se encuentra el usuario
function getCurrentSlot() {
    // Obtenemos el boton del slot que tenga la clase actual-slot, ademas de esa clase tendra la clase team-slotX donde X el numero del slot correspondiente
    const actualSlot = document.querySelector('.active-slot');
    // Iteramos sobre la informacion de nuestros objetos creados para cada slot e ingresamos al que corresponda al numero del actual-slot para retornarlo
    for (let slot of teamMemberInformation) {
        if (slot.teamSlot === actualSlot.classList[0]) {
            return slot;
        }
    }
}

// Creamos una funcion para actualizar la informacion de los slots
function updateSlotData() {
    const slot = getCurrentSlot();
    const actualEditSlot = document.querySelector(`.active-slot`);    
    
    const teamSlotEditImage = actualEditSlot.children[0].children[0];
    const teamSlotEditName = actualEditSlot.children[1].children[0];
    const teamSlotEditTypes = actualEditSlot.children[1].children[1];
    const teamSlotEditClearButton = document.querySelectorAll('button[class^="team-slot-clear"]');

    teamSlotEditImage.setAttribute('src',slot.portrait);
    teamSlotEditImage.setAttribute('title',slot.name);
    teamSlotEditImage.setAttribute('alt',slot.name);
    teamSlotEditName.innerHTML = slot.name;
    let imagesTypeHTML = '';
    for (let i = 0; i < slot.types.length; i++) {
        imagesTypeHTML += `<img src="https://temtem-api.mael.tech/images/icons/types/${slot.types[i]}.png" alt=${slot.types[i]} title=${slot.types[i]} loading="lazy">`;
    }
    teamSlotEditTypes.innerHTML = imagesTypeHTML;

    for (let i = 0; i < teamMemberInformation.length; i++) {
        if (teamMemberInformation[i].name !== '[Search TemTem]') {
            teamSlotEditClearButton[i].classList.remove('hidden');
        } else {
            teamSlotEditClearButton[i].classList.add('hidden');
        }
    }
}

// Creamos otra funcion para actualizar la informacion pero de la seccion de edit
function updateMemberData() {
    const slot = getCurrentSlot();

    // Obtenemos todos los campos de la seccion de edicion de equipo
    const temtemEditImage = document.getElementById('temtem-image');
    const temtemEditName = document.getElementById('temtem-name');
    const temtemEditNumber = document.getElementById('temtem-number');
    const temtemEditTypes = document.getElementById('temtem-types');
    const temtemEditBaseStats = document.querySelectorAll('input[class^="base-stat"]');
    const temtemEditTvsStats = document.querySelectorAll('input[class^="tvs-stat"]');
    const temtemEditWiki = document.querySelector('.temtem-wiki-url');
    
    // Editamos la informacion en la seccion de edicion de equipo
    temtemEditImage.setAttribute('src',slot.portrait);
    temtemEditImage.setAttribute('title',slot.name);
    temtemEditImage.setAttribute('alt',slot.name);
    temtemEditName.innerHTML = slot.name;
    temtemEditNumber.innerHTML = `#${slot.number}`;
    let imagesTypeHTML = '';
    for (let i = 0; i < slot.types.length; i++) {
        imagesTypeHTML += `<img src="https://temtem-api.mael.tech/images/icons/types/${slot.types[i]}.png" alt=${slot.types[i]} title=${slot.types[i]} loading="lazy">`;
    }
    temtemEditTypes.innerHTML = imagesTypeHTML;
    // Actualizamos la informacion de las stats
    let i = 0;
    for (let stat in slot.stats) {
        temtemEditBaseStats[i].value = slot.stats[stat];
        if (i < temtemEditTvsStats.length) {
            temtemEditTvsStats[i].value = slot.tvs[stat];
        }
        i++;
    }
    temtemEditWiki.setAttribute('href', slot.wikiUrl);

    // Actualizamos los input de los stats totales
    calculateTotalStat();
    updateTotalStatsData();
}

// Creamos una funcion para actualizar la informacion de los ataques
function updateAttacks() {
    const slot = getCurrentSlot();

    const temtemEditAttacks = document.querySelectorAll('input[class^="temtem-attack"]');

    let i = 0;
    for (let attack in slot.actualTechniques) {
        temtemEditAttacks[i].value = slot.actualTechniques[attack][0];
        temtemEditAttacks[i].classList.replace(temtemEditAttacks[i].classList[1],`type-${slot.actualTechniques[attack][1]}`);
        temtemEditAttacks[i].setAttribute('title', `${slot.actualTechniques[attack][1]} type attack`);
        i++;
    }
}

// Creamos otra funcion para actualizar toda la informacion de ataques de todos los slots
function updateSlotsAttacks() {
    const teamSlotEditAttacks = document.querySelectorAll('input[class^="team-slot-attack"]');

    let i = 0;
    for (let slot of teamMemberInformation) {
        for (let technique in slot.actualTechniques) {
            teamSlotEditAttacks[i].value = slot.actualTechniques[technique][0];
            teamSlotEditAttacks[i].classList.replace(teamSlotEditAttacks[i].classList[1],`type-${slot.actualTechniques[technique][1]}`);
            teamSlotEditAttacks[i].setAttribute('title', `${slot.actualTechniques[technique][1]} type attack`);
            i++;
        }
    }
}

// Creamos otra funcion para actualizar la informacion del trait tanto de los slots como del editor
function updateTraits() {
    const slot = getCurrentSlot();

    const temtemEditTrait = document.getElementById('temtem-trait');
    const teamEditTrait = document.querySelectorAll('.team-slot-trait');

    temtemEditTrait.value = slot.selectedTrait;
    
    for (let i = 0; i < teamEditTrait.length; i++) {
        teamEditTrait[i].innerHTML = `Trait: ${teamMemberInformation[i].selectedTrait}`;
    }
}

// Creamos otra funcion para actualizar la informacion del gear tanto de los slots como del editor
function updateGear() {
    const slot = getCurrentSlot();

    const temtemEditGear = document.getElementById('temtem-gear');
    const teamEditGear = document.querySelectorAll('.team-slot-gear');

    temtemEditGear.value = slot.gear;
    
    for (let i = 0; i < teamEditGear.length; i++) {
        teamEditGear[i].innerHTML = `Gear: ${teamMemberInformation[i].gear}`;
    }
}

// Creamos una funcion para actualizar la informacion en el HTML del total de cada stat
function updateTotalStatsData() {
    const slot = getCurrentSlot();
    const remainingTvsInput = document.querySelector('.tvs-remaining');
    const allTvs = document.querySelectorAll('input[class^="tvs-stat"]');

    const temtemEditTotalStats = document.querySelectorAll('input[class^="total-stat"]');

    let i = 0;
    if (slot.eneableEditingStats) {
        for (let stat in slot.total) {
            temtemEditTotalStats[i].value = slot.total[stat];
            i++;
        }
    } else {
        for (let stat in slot.total) {
            temtemEditTotalStats[i].value = 0;
            i++;
        }
    }

    let remainingTotlaTvs = 1000;
    allTvs.forEach(tv => {
        remainingTotlaTvs -= parseInt(tv.value);
    });
    remainingTvsInput.value = remainingTotlaTvs;
}

function updateSummaryMembers() {
    const summaryMembers = document.querySelectorAll('.summary-member');
    for (let i = 0; i < teamMemberInformation.length; i++) {
        summaryMembers[i].setAttribute('src', `${teamMemberInformation[i].portrait}`);
        summaryMembers[i].setAttribute('alt', `${teamMemberInformation[i].name}`);
        summaryMembers[i].setAttribute('title', `Disable ${teamMemberInformation[i].name} for the summary`);
    }
}

// Creamos una funcion para actualizar la informacion del objeto de su stat final con toda la matematica implicada
function calculateTotalStat() {
    // Obtenemos un slot en particular
    const slot = getCurrentSlot();

    /** Hay en total 3 formulas para calcular las stats, una para el HP, otra para la STA y una tercera para las restantes, a continuacion se dispondra de las 3 formulas:
     * >>> HP :
     * (((1.5 x Base) + SV + (TV/5)) x Level)   (SV x Base x Level)
     * (------------------------------------) + (-----------------) + Level + 15
     * (                  80                )   (      20000      )
     * 
     * >>> STA :
     * (Base)                      (SV x Level x Base)   (TV x Level x Base)
     * (----) + (Level^0.35) x 6 + (-----------------) + (-----------------)
     * (  4 )                      (      20000      )   (      30000      )
     * 
     * >>> Resto de stats :
     * (((1.5 x Base) + SV + (TV/5)) x Level)   (SV x Base x Level)
     * (------------------------------------) + (-----------------) + 10
     * (                 100                )   (      25000      )
     * 
     * 'Level' = 100
     * 'SV' = 50
     * 'Base' = stat base
     * 'TV' = Tv actual (que son los que ingresan a esta funcion)
     * >>>TODOS LOS RESULTADOS SE REDONDEAN HACIA ABAJO<<<
     */

    for (let stat in slot.total) {
        if (stat === 'hp') {
            let value = (((1.5*slot.stats[stat])+50+(slot.tvs[stat]/5))*100/80)+(50*slot.stats[stat]*100/20000)+100+15;
            slot.total[stat] = Math.floor(value);
        } else if (stat === 'sta') {
            let value = (slot.stats[stat]/4)+(Math.pow(100,0.35))*6+(50*100*slot.stats[stat]/20000)+(slot.tvs[stat]*100*slot.stats[stat]/30000);
            slot.total[stat] = Math.floor(value);
        } else {
            let value = (((1.5*slot.stats[stat])+50+(slot.tvs[stat]/5))*100/100)+(50*slot.stats[stat]*100/25000)+10;
            slot.total[stat] = Math.floor(value);
        }
    }
}

// Creamos una funcion para actualizar los datos de los TVs en el objeto
function updateStatsData(input) {
    const slot = getCurrentSlot();

    // Obtenemos la stat que se esta modificando gracias a las clases puestas
    const actualStat = input.classList[1];

    // Actualizamos la informacion con el dato actual
    slot.tvs[actualStat] = parseInt(input.value);
    
    // Actualizamos a su vez el calculo final del total de stats
    calculateTotalStat();
    updateTotalStatsData();
}

// Creamos una funcion para poder borrar por completo algun slot del equipo
function resetMemberData(numberContainer) {
    // Creamos el modelo base de nuestros slots
    const baseInfoSlot = {
        teamSlot : `team-slot-container${numberContainer}`,
        number : '???',
        name : '[Search TemTem]',
        types : ['Unknown','Unknown'],
        portrait : 'img/Unknown.webp',
        stats : {
            hp : 0,
            sta : 0,
            spd : 0,
            atk : 0,
            def : 0,
            spatk : 0,
            spdef : 0,
            total : 0
        },
        tvs : {
            hp : 0,
            sta : 0,
            spd : 0,
            atk : 0,
            def : 0,
            spatk : 0,
            spdef : 0
        },
        total : {
            hp : 0,
            sta : 0,
            spd : 0,
            atk : 0,
            def : 0,
            spatk : 0,
            spdef : 0
        },
        traits : [],
        selectedTrait : '[Select one]',
        techniques : [],
        actualTechniques : {
            attackTemtem1 : ['[Select one]', 'none'],
            attackTemtem2 : ['[Select one]', 'none'],
            attackTemtem3 : ['[Select one]', 'none'],
            attackTemtem4 : ['[Select one]', 'none']
        },
        gear : '[Select one]',
        wikiUrl : '',
        eneableEditingStats : false,
        eneableSummary : false
    }

    // Reemplazamos la infomacion actual del slot por la informacion base
    teamMemberInformation.splice(numberContainer - 1, 1, baseInfoSlot)

    updateMemberData();
    updateAttacks();
    updateSlotsAttacks();
    updateTraits();
    updateGear();
}

// Creamos una funcion para que aparezca un loader hasta que se obtengan las respuestas de la API en el buscador
function searcherLoader() {
    const searcher = document.getElementById('searcher-bar');
    const searchResult = document.getElementById('search-result');

    searcher.setAttribute('disabled', '');
    searchResult.innerHTML = `
    <div class="loader-container">
        <img src="img/loaderGanki.webp" alt="loader" title="loading...">
    </div>
    `;
}

// Creamos una funcion para darle informacion al usuario si es que no se encuentra un resultado o si debe elegir un temtem antes
function searcherClarification(state) {
    const searcher = document.getElementById('searcher-bar');
    const searchResult = document.getElementById('search-result');

    if (state === 'noTemtemSelected') {
        searcher.setAttribute('disabled', '');
        searchResult.innerHTML = `
        <h3>Select a TemTem first...</h3>
        `;
    } else if (state === 'notFound') {
        searchResult.innerHTML = `
        <h3>Not found or does not exist</h3>
        `;
    }
}

// Creamos una funcion para limpiar toda la informacion previa del buscador
function searcherCleaner() {
    const searcher = document.getElementById('searcher-bar');
    const searchResult = document.getElementById('search-result');

    searcher.removeAttribute('disabled');
    searcher.value = '';
    searchResult.innerHTML = '';
}