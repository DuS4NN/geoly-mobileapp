export const text = {
    main: {
        yes: "Yes",
        no: "No"
    },
    loginScreen: {
        title: "Sign in to Geoly",
        email: "Email",
        password: "Password",
        register: "Don't have an account?",
        signIn: "Sign in",
        noCredentials: "Enter e-mail and password"
    },
    questScreen: {
        quests: "Quests",
        daily: "Daily",
        classic: "Classic",
        party: "Group",
        signOff: "Sign out of the quest?",
        noActiveQuest: "You have no active quest"
    },
    gpsActivationScreen: {
        gps: "Please turn on the GPS and restart the application",
        reload: "Reload"
    },
    navigation: {
        quests: "My quests",
        creator: "Quest creator",
        near: "Quest nearby",
        me: "Me"
    },
    gameScreen: {
        leftStages: "Number of remaining stages: ",
        location: "My location",
        destination: "Destination",
        daily: "Daily quest",
        finishedScreenTitle: "Congratulations! You have completed the stage",
        noteTitle: "Information from the author",
        continue: "Continue",
        answerPlaceholder: "Answer",
        advise: "Advise me",
        submit: "Submit",
        adviseAlert: "Advise",
        wrongAnswer: "The answer is incorrect",
        scanQrCode: "Find and scan the QR Code"
    },
    nearScreen: {
        near: "Near",
        km: "km",
        m: "m",
        noNearQuest: "No quests found nearby"
    },
    stageTypes: {
        GO_TO_PLACE: 'Go to a place',
        ANSWER_QUESTION: 'Answer a question',
        SCAN_QR_CODE: 'Scan a QR code'
    },
    creator: {
        creator: "Create",
        formTitle: "Details",
        questName: "Name",
        description: "Description",
        category: "Category",
        difficulty: "Difficulty",
        private: "Private",
        gps: "It is not possible to add a stage because we do not have access to your location",
        addStage: "Add stage",
        stages: "Stages",
        stageType: "Stage type",
        note: "Note",
        qrCode: 'The QR code will be generated after saving the quest',
        question: "Question",
        advise: "Advise",
        answer: "Answer",
        answers: "Answers",
        addAnswer: "Add answer",
        addQuest: "Add quest"
    },
    error: {
        badCredentials: "Email or password is incorrect",
        inactiveAccount: "Your account is inactive",
        unverifiedAccount: "Your account is unverified",
        gpsIsDisabled: "GPS is still disabled",
        somethingWentWrong: "Something went wrong, please try again",
        cantLoadCode: "The required QR code does not match the load",
        wrongQrCode: "The required QR code does not match the load",


        USER_ALREADY_FINISHED_QUEST: 'A quest can be completed only once',
        USER_HAS_ACTIVE_QUEST: 'You have already signed up for this quest',
        USER_CAN_NOT_PLAY_OWN_QUEST: 'A user cannot start their own quest',
        USER_DOESNT_HAVE_PREMIUM: 'You need a premium account to start this task',

        ANSWER_SYMBOL: 'The answer cannot contain a symbol ;',
        ANSWER_LENGTH: 'Answer must be 1-100 characters long',
        INVALID_ANSWER_COUNT: 'A stage can have a maximum of 5 answers',
        ANSWER_ALREADY_EXISTS: 'The answer already exists',

        INVALID_NAME_LENGTH_SIZE: "The quest name must be 1 - 50 characters",
        INVALID_DESCRIPTION: "The quest description must be 1 - 500 characters",
        INVALID_COORDINATES: "The coordinates are invalid",

        INVALID_DIFFICULTY: "Invalid difficulty",
        CATEGORY_NOT_FOUND: "Invalid category",
        INVALID_QUESTION: "The question must be 1 - 200 characters",
        INVALID_ANSWER: "The answer must be 1 - 200 characters",
        INVALID_ADVISE: "The advise must be 0 - 200 characters",
        INVALID_NOTE: "The note must be 0 - 200 characters",
        INVALID_ANSWERS_LIST: "Invalid answer list"
    },
    success: {
        signOff: "You have been signed out of quest",
        questFinish: "Congratulations! You have successfully completed the quest",
        reloadParty: "The data was updated based on the group change",
        reloadQuest: "The data was updated based on the quest change",
        user_signed_up_on_quest: 'You have been signed up on quest',
        questCreated: "The quest has been created"
    }
}
