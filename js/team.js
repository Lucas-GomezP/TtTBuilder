// En este archivo se guardara la informacion del equipo que sera consultado reiteradamente en los demas scripts

// Creamos un array que contendra objetos, estos ultimos tendran la informacion de cada uno de los temtems seleccionados para cada slot
const teamMemberInformation = [
    {
        teamSlot : 'team-slot-container1',
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
        wikiUrl : 'https://temtem.wiki.gg/wiki/Temtem_Wiki',
        eneableEditingStats : false,
        eneableSummary : false
    },
    {
        teamSlot : 'team-slot-container2',
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
        wikiUrl : 'https://temtem.wiki.gg/wiki/Temtem_Wiki',
        eneableEditingStats : false,
        eneableSummary : false
    },
    {
        teamSlot : 'team-slot-container3',
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
        wikiUrl : 'https://temtem.wiki.gg/wiki/Temtem_Wiki',
        eneableEditingStats : false,
        eneableSummary : false
    },
    {
        teamSlot : 'team-slot-container4',
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
        wikiUrl : 'https://temtem.wiki.gg/wiki/Temtem_Wiki',
        eneableEditingStats : false,
        eneableSummary : false
    },
    {
        teamSlot : 'team-slot-container5',
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
        wikiUrl : 'https://temtem.wiki.gg/wiki/Temtem_Wiki',
        eneableEditingStats : false,
        eneableSummary : false
    },
    {
        teamSlot : 'team-slot-container6',
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
        wikiUrl : 'https://temtem.wiki.gg/wiki/Temtem_Wiki',
        eneableEditingStats : false,
        eneableSummary : false
    },
    {
        teamSlot : 'team-slot-container7',
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
        wikiUrl : 'https://temtem.wiki.gg/wiki/Temtem_Wiki',
        eneableEditingStats : false,
        eneableSummary : false
    },
    {
        teamSlot : 'team-slot-container8',
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
        wikiUrl : 'https://temtem.wiki.gg/wiki/Temtem_Wiki',
        eneableEditingStats : false,
        eneableSummary : false
    }
];