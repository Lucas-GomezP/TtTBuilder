// En este script se colocara todo el funcionamiento de la seccion de Edicion de Equipo

// Creamos una funcion para corroborar la respuesta de la API en cada promesa realizada
const isResponseOk = (response) => {
    //response.ok va a ser true con respuestas 2xx, esto lo hacemos para poder captar correctamente el error en caso de que se de
    if (!response.ok) {
        throw new Error('Error HTTP: ' + response.status);
    }
    return response.json();
}

// Creamos una funcion que devolvera la informacion desde la url base de la api pero de cada seccion que se le pase, de esta manera podemos reutilizarla para las distintas busquedas
const fetchResult = async searchSection => {
    // La hacemos asincrona ya que debemos corroborar que no se genere ningun error con la busqueda y en caso de que suceda captarlo
    try {
        const response = await fetch(`https://temtem-api.mael.tech/api/${searchSection}`);
        return isResponseOk(response);
    } catch (error) {
        return console.error(error);
    }
}

// BUSCADO POR NOMBRE Y SELECCION DEL TEMTEM<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Obtenemos el espacio donde se mostraran los resultados
const searchResult = document.getElementById('search-result');
let dataResult;

const searchTemtemName = (result, value) => {
    // buscamos las coincidencias dentro del array con el nombre pasado en el input
    let matches = result.filter(temtem => {
        // creamos una expresion regular que coincida con el nombre buscado y como segundo parametro va gi ya que la g es de busqueda global y la i es para que ignore si es mayusculas o minusculas
        const regex = new RegExp(`^${value}`, 'gi');
        return temtem.name.match(regex);
    });

    const searchResults = matches.map(match => `
    <div class="temtem-result number-temtem-${match.number}">
        <h3>${match.name}</h3>
        <img src="${match.wikiRenderStaticUrl}" loading="lazy" tittle="${match.name}">
        <p>#${match.number}</p>
    </div>
    `);

    if (matches.length > 0) {
        searchResult.innerHTML = searchResults;
    } else {
        searcherClarification('notFound');
    }
    // Al ingresar la informacion de la manera anterior al HTML, las comas del array tambien son pasadas y se colocan al final de la tabla por lo que debemos eliminarlas, asique iteraremos sobre los nodos hijos de la tabla y si alguno de es de texto plano lo eliminamos
    searchResult.childNodes.forEach(node => {
        if (node.toString() === '[object Text]') {
            searchResult.removeChild(node);
        }
    });

    // Seleccionamos todos los temtem que coincidieron con la busqueda
    dataResult = document.querySelectorAll('.temtem-result');

    // Les agregamos el evento correspondiente para cuando se seleccionan
    dataResult.forEach(temtem => {
        temtem.addEventListener('click', () => selectTemtemName(matches, temtem));
    });
}

const selectTemtemName = (matches, temtemSelected) => {
    // Obtenemos el slot actual y luego igualamos su informacion a la de los datos guardados
    let slot = getCurrentSlot();
    
    // Primero debemos borrar cualquier informacion que ya contenga el slot en caso de que se este cambiando el temtem seleccionado
    if (slot.eneableEditingStats) {
        const numberSlot = parseInt(slot.teamSlot.substring(19, slot.teamSlot.length));
        resetMemberData(numberSlot);
        // En caso de que si se este cambiando la informacion debemos volver a tomar la referencia del slot actual
        slot = getCurrentSlot();
    }
    
    // Obtenemos el numero del temtem que fue pasado en su clase    
    const numberTemtem = parseInt(temtemSelected.classList[1].substring(14, temtemSelected.classList[1].length));
    
    // Obtenemos el objeto que pertenece a ese numero
    let match;
    matches.forEach(m => {
        if (m.number === numberTemtem) {
            match = m;
        }
    });

    slot.number = match.number;
    slot.name = match.name;
    slot.types = match.types;
    slot.portrait = match.wikiRenderStaticUrl;
    slot.stats = match.stats;
    slot.traits = match.traits;
    slot.techniques = match.techniques;
    slot.wikiUrl = match.wikiUrl;
    slot.eneableEditingStats = true;
    slot.eneableSummary = true;

    // Actualizamos la informacion de los distintos campos
    updateMemberData();
    updateSlotData();
    updateSummaryMembers();

    // Cerramos el buscador
    displayTeamSlots('medium');
}

// SELECCIONADO DE ATAQUES<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const searchTemtemAttacks = (result, value, slotAttack) => {
    const slot = getCurrentSlot();

    // Obtenemos los nombres de los ataques del temtem seleccionado
    const techniquesNames = slot.techniques.map(technique => technique.name);

    // Creamos un array donde almacenaremos nuestras coincidencias
    const matches = [];
    // Iteramos sobre nuestros resultados para buscar la informacion completa de cada nombre de ataque que puede aprender el temtem seleccionado
    result.forEach(technique => {
        if (techniquesNames.includes(technique.name)) {
            matches.push(technique);
        }
    });

    // Luego filtramos por lo que busca el usuario
    const filterMatches = matches.filter(tech => {
        const regex = new RegExp(`^${value}`, 'gi');
        return tech.name.match(regex);
    });

    const searchResults = filterMatches.map(match => `
    <article class="attack-result number-attack-${matches.indexOf(match)}">
        <header class="attack-header">
            <div class="attack-type-container">
                <img src="https://temtem-api.mael.tech/images/icons/types/${match.type}.png" alt="${match.type}" title="${match.type}" loading="lazy">
            </div>
            <h3>${match.name}</h3>
            <div class="attack-class-container">
                <img src="https://temtem-api.mael.tech/images/icons/technique/${match.class}.png" alt="${match.class}" title="${match.class}" loading="lazy">
            </div>
        </header>
        <main class="attack-main">
            <div class="attack-info-basic">
                <h4>Basic attack</h4>
                <div class="attack-basic-data">
                    <p class="attack-damage">Damage: ${match.damage}</p>
                    <p class="attack-description">${match.effectText}</p>
                </div>                            
            </div>
            <div class="attack-info-synergy">
                <div class="attack-synergy-container">
                    <img src="img/types/${match.synergy}.png" alt="${match.synergy}" title="${match.synergy}" loading="lazy">
                </div>
                <h4>Synergy</h4>
                <div class="attack-synergy-data">
                    <p class="attack-synergy-description">${match.synergyText}</p>
                </div>
            </div>
        </main>
        <footer class="attack-footer">
            <div class="attack-end-data">
                <p class="attack-stamina">STA: ${match.staminaCost}</p>
                <p class="attack-hold">Hold: ${match.hold}</p>
                <p class="attack-target">Target: ${match.targets}</p>
            </div>
            <div class="attack-priority-container">
                <img src="https://temtem-api.mael.tech/images/icons/priority/${match.priority}.png" alt="${match.priority}" title="${match.priority}" loading="lazy">
            </div>
            <div class="attack-wiki-container">
                <a href="${match.wikiUrl}" target="_blank"><img src="img/wiki.webp" alt="${match.name} wiki" title="${match.name} wiki" loading="lazy"></a>
            </div>
        </footer>
    </article>
    `);

    if (filterMatches.length > 0) {
        searchResult.innerHTML = searchResults;
    } else if (slot.name === '[Search TemTem]') {
        searcherClarification('noTemtemSelected');
    } else {
        searcherClarification('notFound');
    }
    
    searchResult.childNodes.forEach(node => {
        if (node.toString() === '[object Text]') {
            searchResult.removeChild(node);
        }
    });

    // Seleccionamos todos los temtem que coincidieron con la busqueda
    dataResult = document.querySelectorAll('.attack-result');

    // Les agregamos el evento correspondiente para cuando se seleccionan
    dataResult.forEach(attack => {
        attack.addEventListener('click', () => selectTemtemAttack(matches, attack, slotAttack));
    });
}

const selectTemtemAttack = (matches, attack, slotAttack) => {
    const slot = getCurrentSlot();
    
    // Obtenemos el indice del ataque que fue pasado como nombre de clase
    const attackActual = parseInt(attack.classList[1].substring(14, attack.classList[1].length));
    const actualSlotAttack = slotAttack.classList[0].substring(13, slotAttack.classList[0].length);

    const nameActualTechnique = `${matches[attackActual].name}(S:${matches[attackActual].staminaCost} D:${matches[attackActual].damage})`;

    // Creamos un sistema de control que verificara si el ataque no se encuentra ya en alguno de los slots
    let control = 0;
    for (let attack in slot.actualTechniques) {
        if (slot.actualTechniques[attack][0] !== nameActualTechnique) {
            control++;
        }
    }

    // Solo si ese ataque no esta repetido lo colocamos en el objeto, en caso contrario se le avisara al usuario que ya esta en uso
    if (control === 4) {
        slot.actualTechniques[`attackTemtem${actualSlotAttack}`] = [];
        slot.actualTechniques[`attackTemtem${actualSlotAttack}`].push(nameActualTechnique);
        slot.actualTechniques[`attackTemtem${actualSlotAttack}`].push(matches[attackActual].type);
        updateAttacks();
        updateSlotsAttacks();
    } else {
        updateAttacks();
        updateSlotsAttacks();
    }

    // Cerramos el buscador
    displayTeamSlots('medium');
}

// SELECCIONADO DE TRAITS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const searchTemtemTraits = (result, value) => {
    const slot = getCurrentSlot();
    
    const matches = [];

    result.forEach(trait => {
        if (slot.traits.includes(trait.name)) {
            matches.push(trait);
        }
    });

    const filterMatches = matches.filter(tr => {
        const regex = new RegExp(`^${value}`, 'gi');
        return tr.name.match(regex);
    });

    const searchResults = filterMatches.map(match => `
    <div class="trait-result number-trait-${matches.indexOf(match)}">
        <h3>${match.name}</h3>
        <div class="trait-wiki-container">
            <a href="${match.wikiUrl}" target="_blank"><img src="img/wiki.webp" alt="${match.name} wiki" title="${match.name} wiki" loading="lazy"></a>
        </div>
        <p><b>Description:</b> ${match.description}</p>
    </div>
    `);

    if (filterMatches.length > 0) {
        searchResult.innerHTML = searchResults;
    } else if (slot.name === '[Search TemTem]') {
        searcherClarification('noTemtemSelected');
    } else {
        searcherClarification('notFound');
    }
    
    searchResult.childNodes.forEach(node => {
        if (node.toString() === '[object Text]') {
            searchResult.removeChild(node);
        }
    });
    
    dataResult = document.querySelectorAll('.trait-result');

    dataResult.forEach(trait => {
        trait.addEventListener('click', () => selectTemtemTrait(matches, trait));
    });
}

const selectTemtemTrait = (matches, trait) => {
    const slot = getCurrentSlot();

    // Obtenemos el indice del trait que fue pasado como nombre de clase
    const traitActual = parseInt(trait.classList[1].substring(13, trait.classList[1].length));

    slot.selectedTrait = matches[traitActual].name;

    updateTraits();

    // Cerramos el buscador
    displayTeamSlots('medium');
}

// SELECCIONADO DE GEAR<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const searchTemtemGear = (result, value) => {
    // buscamos las coincidencias dentro del array con el nombre pasado en el input
    let matches = result.filter(gear => {
        const regex = new RegExp(`^${value}`, 'gi');
        return gear.name.match(regex);
    });

    const searchResults = matches.map(match => `
    <div class="gear-result number-gear-${matches.indexOf(match)}">
        <div class="gear-title-container">
            <h3>${match.name}</h3>
            <div class="gear-image-container">
                <img src="https://temtem.wiki.gg${match.wikiIconUrl}" alt="${match.name}" title="${match.name}" loading="lazy">
            </div>
        </div>
        <p>Description not available, API under development... (Check the wiki)</p>
        <div class="gear-wiki-container">
            <a href="${match.wikiUrl}" target="_blank"><img src="img/wiki.webp" alt="${match.name} wiki" title="${match.name} wiki" loading="lazy"></a>
        </div>
    </div>
    `);


    if (matches.length > 0) {
        searchResult.innerHTML = searchResults;
    } else {
        searcherClarification('notFound');
    }
    
    searchResult.childNodes.forEach(node => {
        if (node.toString() === '[object Text]') {
            searchResult.removeChild(node);
        }
    });

    // Seleccionamos todos los temtem que coincidieron con la busqueda
    dataResult = document.querySelectorAll('.gear-result');

    // Les agregamos el evento correspondiente para cuando se seleccionan
    dataResult.forEach(gear => {
        gear.addEventListener('click', () => selectTemtemGear(matches, gear));
    });
}

const selectTemtemGear = (matches, gear) => {
    const slot = getCurrentSlot();

    // Obtenemos el indice del gear que fue pasado como nombre de clase
    const gearActual = parseInt(gear.classList[1].substring(12, gear.classList[1].length));

    slot.gear = matches[gearActual].name;

    updateGear();

    // Cerramos el buscador
    displayTeamSlots('medium');
}

// MODIFICACION DE STATS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const remainingTvsInput = document.querySelector('.tvs-remaining');
const allTvs = document.querySelectorAll('input[class^="tvs-stat"]');

const changeTvsStat = tvActualInput => {
    // Creamos dos variables que sean directamente el valor pero como int para evitar posibles errores de tipos
    let tvActual = parseInt(tvActualInput.value);
    let actualTotalTvs = parseInt(remainingTvsInput.value);

    // Primero corroboramos que el input actual no se pase de 500 ni sea menor que 0
    if (tvActual >= 500) {
        tvActualInput.value = 500;
    }
    if (tvActual < 0) {
        tvActualInput.value = 0;
    }
    
    // Ahora calculamos cuantos son los TVs restantes en base a cuantos tiene asignado cada stat
    let remainingTotlaTvs = 1000;
    allTvs.forEach(tv => {
        remainingTotlaTvs -= parseInt(tv.value);
    })

    // Corroboramos los diferentes casos para que no de error
    if (remainingTotlaTvs >= 0) {
        remainingTvsInput.value = remainingTotlaTvs;
    } else if (actualTotalTvs === 0 && remainingTotlaTvs < 0) {
        tvActualInput.value = 0;
    } else if (remainingTotlaTvs < 0) {
        tvActualInput.value = actualTotalTvs;
        remainingTvsInput.value = 0;
    }

    // Actualizamos la informacion en el editor
    updateStatsData(tvActualInput);
}