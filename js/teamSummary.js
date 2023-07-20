// En este archivo se manejara toda la logica de la seccion de Team Summary
const summaryThead = document.querySelector('.summary-types-thead');
const summaryTbody = document.querySelector('.summary-types-tbody');

const checkTeamCompleteForSummary = () => {
    for (let teamMember of teamMemberInformation) {
        if (teamMember.eneableEditingStats) {
            continue;
        } else {
            return false;
        }
    }
    return true;
}

const calculateTeamSummary = result => {

    let theadHTML = '<th>Attacker</th>';
    
    for (let teamMember of teamMemberInformation) {
        if (teamMember.eneableSummary) {   
            // Agregamos el nombre al head de la tabla para crear la columna propia de cada temtem
            theadHTML += `<th>${teamMember.name}<div>`;
            // Agregamos los tipos del temtem al thead
            for (let typeMember of teamMember.types) {
                theadHTML += `<img src="img/types/${typeMember}.png" alt="${typeMember}" title="${typeMember} type" loading="lazy">`;
            }
            theadHTML += '</div></th>';
        }
    }

    // Añadimos la informacion del header a final al head de la tabla
    theadHTML += '<th>Total Weaknesses</th><th>Total Resistances</th>';
    summaryThead.innerHTML = theadHTML;
    
    
    let tbodyHTML = '';
    
    // Debemos iterar sobre los tipos que obtenemos del resultado de la api que almacenan las debilidades y eficiencias
    for (let typeActual in result) {
        // Abrimos una fila
        tbodyHTML += '<tr>';

        // Agregamos la imagen del tipo como primera columna
        tbodyHTML += `<td><img src="img/types/${typeActual}.png" alt="${typeActual}" title="${typeActual}" loading="lazy"></td>`;

        let totalWeakness = 0;
        let tottalResistances = 0;
        // Iteramos sobre los miembros del equipo
        for (let teamMember of teamMemberInformation) {
            // Si estan habilitados para el resumen
            let typeEfficiency = 1;
            if (teamMember.eneableSummary) {   
                // Chequeamos las debilidades y fortalezas contra su o sus tipos
                for (let typeMember of teamMember.types) {
                    typeEfficiency *= result[typeActual][typeMember];

                    if (result[typeActual][typeMember] > 1) {
                        totalWeakness += 1;
                    } else if (result[typeActual][typeMember] < 1) {
                        tottalResistances += 1;
                    }
                }
                // Agregamos la informacion obtenida a la tabla
                tbodyHTML += `<td class="attacker-${typeEfficiency*100}">${typeEfficiency}</td>`
            }
        }
        // Luego agregamos la informacion de los totales a la tabla
        tbodyHTML += `<td class="weaknes-leve-${Math.floor(totalWeakness/2)}">${totalWeakness}</td>`
        tbodyHTML += `<td class="resistances-leve-${Math.floor(tottalResistances/2)}">${tottalResistances}</td>`

        // Cerramos la fila
        tbodyHTML += '</tr>';
    }
    // Agregamos toda la informacion a la tabla
    summaryTbody.innerHTML = tbodyHTML;



    // Creamos un array con 6 objetos, uno para cada stat obviando la stat STA
    const dataStats = [
        {worse : 999, best : 0, average : 0},
        {worse : 999, best : 0, average : 0},
        {worse : 999, best : 0, average : 0},
        {worse : 999, best : 0, average : 0},
        {worse : 999, best : 0, average : 0},
        {worse : 999, best : 0, average : 0}
    ];

    teamMemberInformation.forEach(teamSlot => {
        // Chequeamos si esta habilitado para ponerse en el resumen
        if (teamSlot.eneableSummary) {
            // Corroboramos cual es el menor y cual es el mayor y su promedio
            let i = 0;
            for (let stat in teamSlot.total) {
                if (stat !== 'sta') {
                    if(teamSlot.total[stat] < dataStats[i].worse) {
                        dataStats[i].worse = teamSlot.total[stat];
                    }
                    if(teamSlot.total[stat] > dataStats[i].best) {
                        dataStats[i].best = teamSlot.total[stat];
                    }
                    i++;
                }
            }
            for (let i = 0; i < dataStats.length; i++) {
                dataStats[i].average = (dataStats[i].worse + dataStats[i].best) / 2;
            }
        }
    });

    // Creamos las opciones de nuestros graficos
    const barOptions = {
        axisY : {
            low : 0,
            high : 450
        },
        width : 700
    };

    const dotOptions = {
        axisX : {
            showLabel : false,
            showGrid : false
        },
        axisY : {
            showLabel : false,
            showGrid : false,
            low : 0,
            high : 450
        },
        chartPadding: {
            left: 63
        },
        width : 752,
        showLine: false
    }

    // Creamos el grafico de barras para el promedio
    new Chartist.Bar(
        '.ct-average-chart', {
            // Nombres y valores de las barras
            labels : ['hp', 'spd', 'atk', 'def', 'spatk', 'spdef'],
            series : [
                dataStats.map(stat => stat.average)
            ]
        } , barOptions
    );

    // Creamos los graficos de linea para el mejor y peor puntaje de cada habilidad
    new Chartist.Line(
        '.ct-worse-best-chart', {
            labels : ['hp', 'spd', 'atk', 'def', 'spatk', 'spdef'],
            series : [
                dataStats.map(stat => stat.worse),
                dataStats.map(stat => stat.best)
            ]
        } , dotOptions
    );
}