// Sistema de mostrado/ocultamiento de la introduccion
const introduction = document.getElementById('introduction');
const introductionButton = document.querySelector('.introduction-button');
const introductionButtonHidden = document.querySelector('.hidden-introduction-button');

// La introduccion se mostrara al clickear sobre el boton y se ocultara de una manera similar
introductionButton.addEventListener('click', () => {
    introduction.classList.remove('introduction-hidden');
});

introductionButtonHidden.addEventListener('click', () => {
    introduction.classList.add('introduction-hidden');
})

/* --------------------------------------------------------------------------------------- */

//Boton de equipo de prueba 
const loadExampleTeamButton = document.querySelector('.example-team');

// Creamos una funcion para cargar un equipo de muestra, que en primer lugar reemplaza la informacion de todo el equipo por la guardada en teamExample, y luego actualiza cada slot con la nueva informacion
loadExampleTeamButton.addEventListener('click', () => {
    for (let i = 0; i < teamMemberInformation.length; i++) {
        teamMemberInformation.splice(i, 1, teamExampleInformation[i])
    }
    teamSlots.forEach(teamSlot => {
        clearActiveClasses(teamSlots, 'active-slot');
        teamSlot.classList.add('active-slot');
        updateSlotData();
        updateSlotsAttacks();
        updateTraits();
        updateGear();
        updateSummaryMembers();
    })
})

/* --------------------------------------------------------------------------------------- */

// NAV
const navButtons = document.querySelectorAll('.nav-button');
const teamBuilderActivator = document.querySelector('.team-builder-activator');
const teamSummaryActivator = document.querySelector('.team-summary-activator');
const teamBuilderSection = document.querySelector('.team-builder-section');
const teamSummarySection = document.querySelector('.team-summary-section');
const summaryWarning = document.getElementById('summary-warning');
const summarySectionContainer = document.getElementById('summary-container');

// Creamos la funcionalidad de los botones para que se vea solo la seccion deseada ya sea de teamBuilder o de teamSummary
teamBuilderActivator.addEventListener('click', () => {
    clearActiveClasses(navButtons, 'section-active');
    teamBuilderActivator.classList.add('section-active');
    if (!teamSummarySection.classList.contains('hidden')) {
        teamSummarySection.classList.add('hidden');
    }
    if (teamBuilderSection.classList.contains('hidden')) {
        teamBuilderSection.classList.remove('hidden');
    }
});

teamSummaryActivator.addEventListener('click', async () => {
    clearActiveClasses(navButtons, 'section-active');
    teamSummaryActivator.classList.add('section-active');
    if (!teamBuilderSection.classList.contains('hidden')) {
        teamBuilderSection.classList.add('hidden');
    }
    if (teamSummarySection.classList.contains('hidden')) {
        teamSummarySection.classList.remove('hidden');
    }
    updateSummaryMembers();
    const result = await fetchResult('weaknesses');
    calculateTeamSummary(result);
    if (checkTeamCompleteForSummary()) {
        summaryWarning.classList = ['hidden'];
        if (summarySectionContainer.classList.contains('hidden')) {
            summarySectionContainer.classList.remove('hidden');
        }
    } else {
        summaryWarning.classList = [''];
        if (!summarySectionContainer.classList.contains('hidden')) {
            summarySectionContainer.classList.add('hidden');
        }
    }
});

/* --------------------------------------------------------------------------------------- */

// Sistema de acomodado de la seccion "team-slots"
const teamSlots = document.querySelectorAll('div[class^="team-slot-container"]');
const teamSlotsDisplay = document.getElementById('team-slots');
const teamSlotsInfo = document.querySelectorAll('.team-slot-info');
const teamSlotsExtraInfo = document.querySelectorAll('.team-slot-info-extra');
const teamEdit = document.getElementById('temtem-edit');
const teamEditClose = document.getElementById('team-edit-close');
const teamSlotClearButton = document.querySelectorAll('button[class^="team-slot-clear"]');


// Creamos una funcion para retirar el "active-slot" de cualquier div que lo tenga
function clearActiveClasses(nodeList, classRemove) {
    nodeList.forEach(node => {
        node.classList.remove(classRemove);
    });
}

// Creamos el evento para que se dispongan el buscador y el editor correctamente dependiendo de cuan grande sea la pantalla
window.addEventListener('resize', () => {
    if (document.querySelector('body').clientWidth <= 1200) {
        if (teamSlotsDisplay.classList[0] === 'display-small') {
            teamEdit.classList = ['hidden'];
            teamSlotsDisplay.classList = ['display-medium'];
            teamSlotsInfo.forEach(info => info.classList.remove('hidden'));
        }
    } else if (document.querySelector('body').clientWidth > 1200 && !searcher.classList.contains('hidden')) {
        teamEdit.classList.remove('hidden');
        teamSlotsInfo.forEach(info => info.classList.add('hidden'));
        teamSlotsDisplay.classList = ['display-small'];
    }
})

// Creamos una funcion para la manipulacion de los tamaños y disposicion de la informacion en el DOM
function displayTeamSlots(display) {
    if (document.querySelector('body').clientWidth <= 1200) {
        if (display === 'small') {
            teamEdit.classList = ['hidden'];
        }
    } else {
        if (display === 'small') {
            teamSlotsInfo.forEach(info => info.classList.add('hidden'));
            teamSlotsDisplay.classList = ['display-small'];
        }
    }
    if (display === 'big') {
        teamEdit.classList.add('hidden');
        searcher.classList.add('hidden');
        teamSlotsDisplay.classList = ['display-big'];
        teamSlotsInfo.forEach(info => info.classList.remove('hidden'));
        teamSlotsExtraInfo.forEach(extraInfo => extraInfo.classList.remove('hidden'));
        clearActiveClasses(teamSlots, 'active-slot');
        teamSlotClearButton.forEach(clearSlot => {
            if (!clearSlot.classList.contains('hidden')) {
                clearSlot.classList.add('hidden');
            }
        });
    }
    else if (display === 'medium') {
        searcher.classList = ['hidden'];
        teamSlotsDisplay.classList = ['display-medium'];
        teamSlotsInfo.forEach(info => info.classList.remove('hidden'));
        teamSlotsExtraInfo.forEach(extraInfo => extraInfo.classList.add('hidden'));
        teamEdit.classList.remove('hidden');
        updateSlotData();
    }
    else if (display === 'small') {
        searcher.classList.remove('hidden');
        updateSlotData();
    }
}

// Cuando se clickee sobre un slot, el cual sera el "active-slot", significa que se trabajara en los atributos del mismo, por lo tanto, los cambios en la disposicion de la pagina en si, se deben realizar aqui
teamSlots.forEach(teamSlot => {
    teamSlot.addEventListener('click', () => {
        clearActiveClasses(teamSlots, 'active-slot');
        teamSlot.classList.add('active-slot');
        displayTeamSlots('medium');
        updateMemberData();
        updateAttacks();
        updateTraits();
        updateGear();
    });
});

// Creamos una funcion para que se pueda limpiar el campo una vez que se tenga un temtem cargado
teamSlotClearButton.forEach(clearSlot => {
    clearSlot.addEventListener('click', () => {
        const slotNumber = clearSlot.classList[0].substring(15, clearSlot.classList[0].length);
        resetMemberData(slotNumber);
        updateSlotData();
    })
});

// Creamos la funcionalidad del boton de cerrado de la seccion de edit
teamEditClose.addEventListener('click', () => {
    displayTeamSlots('big');
});

/* --------------------------------------------------------------------------------------- */

// Sistema del buscador
const searcher = document.getElementById('searcher');
const searcherClose = document.getElementById('searcher-close');
const temtemInfo = document.querySelector('.temtem-info');
const temtemAttacks = document.querySelectorAll('input[class^="temtem-attack"]');
const temtemTrait = document.getElementById('temtem-trait');
const temtemGear = document.getElementById('temtem-gear');
const temtemTvs = document.querySelectorAll('input[class^="tvs-stat"]');

// Creamos una funcion que nos obtendra el nodo de busqueda, se realiza de esta manera ya que el mismo input se usa para todas las funciones de busqueda por lo cual debemos quitarle los eventos previos para que no se superpongan y creando un clon del mismo y reemplazandolo es la manera mas sencilla
function obtainSearchNode() {
    // Obtenemos nuestro input del buscador ya que de su valor obtendremos la busqueda en si
    const searchInput = document.getElementById('searcher-bar');
    // Hacemos la copia del nodo pero este sin los eventos
    const searchClone = searchInput.cloneNode(true);
    // Reemplazamos el nodo de busqueda
    searchInput.parentNode.replaceChild(searchClone, searchInput);
    // lo retornamos para utilizarlo en las funciones
    return searchClone;
}

temtemInfo.addEventListener('click', async () => {
    displayTeamSlots('small');
    searcherLoader();
    const result = await fetchResult('temtems');
    const searchInput = obtainSearchNode();
    searcherCleaner();
    // Primero llamamos a la funcion en si para que muestre todos los resultados y luego la pasamos como evento del input de busqueda
    searchTemtemName(result, '');
    searchInput.addEventListener('input', () => searchTemtemName(result, searchInput.value));
});

temtemAttacks.forEach(temtemAttack => {
    temtemAttack.addEventListener('click', async () => {
        displayTeamSlots('small');
        searcherLoader();
        const result = await fetchResult('techniques');
        const searchInput = obtainSearchNode();
        searcherCleaner();
        searchTemtemAttacks(result, '', temtemAttack);
        searchInput.addEventListener('input', () => searchTemtemAttacks(result, searchInput.value, temtemAttack))
    });
});

temtemTrait.addEventListener('click', async () => {
    displayTeamSlots('small');
    searcherLoader();
    const result = await fetchResult('traits');
    const searchInput = obtainSearchNode();
    searcherCleaner();
    searchTemtemTraits(result, '');
    searchInput.addEventListener('input', () => searchTemtemTraits(result, searchInput.value));
});

temtemGear.addEventListener('click', async () => {
    displayTeamSlots('small');
    searcherLoader();
    const result = await fetchResult('gear');
    const searchInput = obtainSearchNode();
    searcherCleaner();
    searchTemtemGear(result, '');
    searchInput.addEventListener('input', () => searchTemtemGear(result, searchInput.value));
});

searcherClose.addEventListener('click', () => {
    displayTeamSlots('medium');
});

temtemTvs.forEach(tv => {
    tv.addEventListener('change', () => changeTvsStat(tv));
})


/* --------------------------------------------------------------------------------------- */

// SUMMARY
const summaryMembers = document.querySelectorAll('.summary-member');

// Creamos una funcion para determinar cuales seran los temtems habilitados para el resumen y que ademas eso se refleje en la informacion propia del equipo
summaryMembers.forEach(member => {
    member.addEventListener('click', async () => {
        member.classList.toggle('summary-enabled');
        const memberNumber = member.classList[1].substring(6, member.classList[1].length);
        teamMemberInformation[memberNumber - 1].eneableSummary = !teamMemberInformation[memberNumber - 1].eneableSummary;
        const result = await fetchResult('weaknesses');
        calculateTeamSummary(result);
    });
});