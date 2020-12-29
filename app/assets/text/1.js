export const text = {
    main: {
      yes: "Áno",
      no: "Nie"
    },
    loginScreen: {
        title: "Prihláste sa do Geoly",
        email: "Email",
        password: "Heslo",
        register: "Nemáte ešte účet?",
        signIn: "Prihlásiť sa",
        noCredentials: "Zadajte email a heslo"
    },
    questScreen: {
        quests: "Úlohy",
        daily: "Denné",
        classic: "Klasické",
        party: "Skupinové",
        signOff: "Odhlásiť sa z úlohy?",
        noActiveQuest: "Nemáte žiadnu aktívnu úlohu"
    },
    gpsActivationScreen: {
        gps: "Prosím zapnite GPS a reštartujte aplikáciu",
        reload: "Reštartovať"
    },
    navigation: {
        quests: "Moje ulohy",
        creator: "Tvorba úloh",
        near: "Úlohy v blízkosti",
        me: "Ja"
    },
    gameScreen: {
        leftStages: "Počet zostávajúcich etáp: ",
        location: "Moja poloha",
        destination: "Ciel",
        daily: "Denná úloha",
        finishedScreenTitle: "Gratulujeme! Dokončili ste etapu",
        noteTitle: "Informácie od autora",
        continue: "Pokračovať",
        answerPlaceholder: "Odpoveď",
        advise: "Poraď mi",
        submit: "Potvrdiť",
        adviseAlert: "Rada",
        wrongAnswer: "Odpoveď je nesprávna",
        scanQrCode: "Nájdite a oskenujte QR kód"
    },
    nearScreen: {
        near: "Neďaleko",
        km: "km",
        m: "m",
        noNearQuest: "Nenašli sa žiadne úlohy v blízkosti"
    },
    stageTypes: {
        GO_TO_PLACE: 'Prísť na miesto',
        ANSWER_QUESTION: 'Odpovedať na otázku',
        SCAN_QR_CODE: 'Naskenovať QR kód'
    },
    creator: {
        creator: "Vytvoriť",
        formTitle: "Detaily",
        questName: "Meno",
        description: "Popis",
        category: "Kategória",
        difficulty: "Obtiažnosť",
        private: "Súkromná",
        gps: "Nie je možné pridať etapu pretože nemáme prístup k vašej polohe",
        addStage: "Pridať etapu",
        stages: "Etapy",
        stageType: "Typ etapy",
        note: "Poznámka",
        qrCode: 'QR kód bude vygenerovaný po uložení úlohy',
        question: "Otázka",
        advise: "Pomôcka",
        answer: "Odpoveď",
        answers: "Odpovede",
        addAnswer: "Pridať odpoveď",
        addQuest: "Pridať úlohu"
    },
    error: {
        badCredentials: "Email alebo heslo sú nesprávne",
        inactiveAccount: "Váš účet nie je aktívny",
        unverifiedAccount: "Váš účet nie je overený",
        gpsIsDisabled: "GPS je vypnuté",
        somethingWentWrong: "Niečo sa pokazilo, skúste to znovu",
        cantLoadCode: "Nie je možné načítať obsah QR kódu",
        wrongQrCode: "Potrebný QR kód sa nezhoduje s načítaním",

        USER_ALREADY_FINISHED_QUEST: 'Úlohu je možné dokončiť iba raz',
        USER_HAS_ACTIVE_QUEST: 'Používateľ môže mať iba jednu aktívnu úlohu',
        USER_CAN_NOT_PLAY_OWN_QUEST: 'Používateľ nemôže začať vlastnú úlohu',
        USER_DOESNT_HAVE_PREMIUM: 'Na začatie tejto úlohy potrebujete prémiový účet',

        ANSWER_SYMBOL: 'Odpoveď nemôže obsahovať symbol ;',
        ANSWER_LENGTH: 'Dĺžka odpovede musí byť 1-100 znakov',
        INVALID_ANSWER_COUNT: 'Etapa môže mať maximálne 5 odpovedí',
        ANSWER_ALREADY_EXISTS: 'Odpoveď už existuje',


        INVALID_NAME_LENGTH_SIZE: "Názov úlohy musí mať 1 - 50 znakov",
        INVALID_DESCRIPTION: "Popis úlohy musí mať 1 - 500 znakov",
        INVALID_COORDINATES: "Súradnice etapy sú neplatné",

        INVALID_DIFFICULTY: "Neplatná obtiažnosť",
        CATEGORY_NOT_FOUND: "Neplatná kategória",
        INVALID_QUESTION: "Otázka musí mať 1 - 200 znakov",
        INVALID_ANSWER: "Odpoveď musí mať 1 - 200 znakov",
        INVALID_ADVISE: "Rada musí mať 0 - 200 znakov",
        INVALID_NOTE: "Poznámka musí mať 0 - 200 znakov",
        INVALID_ANSWERS_LIST: "Neplatný zoznam odpovedí"
    },
    success: {
        signOff: "Boli ste odhlásený z úlohy",
        questFinish: "Gratulujeme! Úspešne ste dokončili úlohu",
        reloadParty: "Prebehla aktualizácia dát na základe zmeny skupiny",
        reloadQuest: "Prebehla aktualizácia dát na základe zmeny úlohy",
        user_signed_up_on_quest: 'Boli ste prihlásený na úlohu',
        questCreated: "Úloha bola vytvorená"
    }
}
