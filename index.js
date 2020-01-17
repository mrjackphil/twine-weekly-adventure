//////////////////////// CONSTANTS ////////////////////////
var CONFIGURATION = {
    deadMessage: "Вы мертвы",
    deathPassage: "Смерть"
};
var ENEMIES = [
    {
        id: "rogue_1",
        name: { ru: "Бандит новичок", en: "Bandit novice" },
        hp: 2,
        attack: 1,
        evadePassage: "Логово разбойников",
        victoryPassage: "Атаковать второго охранника",
        victoryCallback: function (state) { return state.bandit_1_killed = true; }
    },
    {
        id: "rogue_2",
        name: { ru: "Бандит крепыш", en: "Bandit" },
        hp: 5,
        attack: 2,
        evadePassage: "Логово разбойников",
        victoryPassage: "Диалог с Энтони",
        victoryCallback: function (state) { return state.bandit_2_killed = true; }
    },
    {
        id: "rogue_antony",
        name: { ru: "Энтони", en: "Antony" },
        hp: 20,
        attack: 5,
        evadePassage: "Логово разбойников",
        victoryPassage: "Диалог с Энтони",
        victoryCallback: function (state) { return state.antony_killed = true; }
    },
    {
        id: "final_dragon",
        name: { ru: "Огромный красный дракон", en: "Giant Red Dragon" },
        hp: 100,
        attack: 10,
        evadePassage: "Дракон",
        victoryPassage: "Прошли игру",
        victoryCallback: function (state) { }
    },
    {
        id: "wolf",
        name: { ru: "Волк", en: "Wolf" },
        attack: 3,
        hp: 3,
        evadePassage: "Лес",
        victoryPassage: "Лес",
        victoryCallback: function (state) { }
    },
    {
        id: "elk",
        name: { ru: "Лось", en: "Elk" },
        attack: 5,
        hp: 5,
        evadePassage: "Лес",
        victoryPassage: "Лес",
        victoryCallback: function (state) { }
    },
    {
        id: "bear",
        name: { ru: "Медведь", en: "Bear" },
        attack: 10,
        hp: 10,
        evadePassage: "Лес",
        victoryPassage: "Лес",
        victoryCallback: function (state) { }
    }
];
var DEFAULT_CURRENT_ENEMY = {
    name: { ru: "", en: "" },
    attack: 0,
    hp: 0,
    evadePassage: "",
    victoryPassage: "",
    victoryCallback: function () { }
};
var LOCALIZED_STRINGS = {
    ru: {
        start_01: "Герой стоит у развилки. Его звали <input maxlength=\"7\" oninput=\"character.name = this.value\">. Его цель - убить дракона. Но прежде ему нужно набраться сил.",
        crossroad: "Развилка",
        crossroad_description: "Дороги ведут в город, логово разбойников, лес и логово дракона. Куда отправится герой?",
        to_city: "В город",
        to_bandit_camp: "В логово разбойников",
        to_forest: "В лес",
        to_dragon: "К логову дракона",
        city_description: "Вы прибыли в город. Недалеко виднеется таверна, в которой можно отдохнуть. В городе, также можно улучшить доспехи и оружие.",
        tavern_rest: "Отдохнуть в таверне",
        to_blacksmith: "Зайти к кузнецу",
        blacksmith_description: "Приветствую. Воспользуйся моими услугами. Если деньги есть, конечно же.",
        upgrade_weapon: "Улучшить оружие",
        upgrade_armor: "Улучшить доспехи",
        no_money: "Недостаточно денег",
        back_to_crossroad: "Вернуться к развилке",
        back_to_city: "Вернуться в город",
        rested: "Вы отдохнули.",
        forest_description: "Что вы желаете делать в лесу?",
        forest_option_search_resources: "Искать полезные ресурсы",
        forest_option_hunt: "Охотиться на животных",
        back_to_forest: "Заняться чем-то другим.",
        hunt_attacked: "напал на вас",
        fight_ready: "Подготовка к битве",
        rogue_camp_entrance_description: "Вы подходите к логову разбойников. Издалека видно, что они не настроены на весёлое общение. У входа ",
        rogue_camp_entrance_no_guard: "стражи не видно.",
        rogue_camp_entrance_one_guard: "стоит один стражник.",
        rogue_camp_entrance_two_guards: "стоят два стражника.",
        rogue_camp_entrance_come_closer: "Подойти",
        rogue_camp_entrance_attack_second_guard: "Атаковать второго охранника",
        rogue_camp_entrance_fight_two_guard_description: "Как только вы подходите к охранникам - они набрасываются на вас. ",
        rogue_camp_entrance_fight_one_guard_description: "Ты убил моего кореша. Я за это с тебя три шкуры содру. Второй бандит нападает с удвоенной силой.",
        rogue_camp_entrance_attack_antony: "Сразиться с Энтони",
        rogue_camp_entrance_attack_antony_message: "\"Опрометчивый поступок\". \n\n Энтони готовится к бою.",
        rogue_camp_antony_deal: "\"Так, так, так...\" \n\n К вам обращается, наблюдавший издалека мужчина. \n\n \"Вижу тебе удалось расправиться с моими парнями. Меня зовут Энтони. У меня для тебя есть работа.\"",
        dragon_lair_description: "Вы подходите к пещере, где живёт дракон. Огромный красный дракон. За него заплатят много денег. Но стоит ли входить в пещеру сейчас? Может стоит подготовиться?",
        dragon_lair_enter: "Войти в пещеру",
        prepare_to_fight_character_hp: "Очки жизней героя: <%= hp %>",
        prepare_to_fight_character_attack: "Сила атаки героя: <%= attack %>",
        prepare_to_fight_enemy_name: "Противник: <%= name %>",
        prepare_to_fight_enemy_hp: "Жизни: <%= hp %>",
        prepare_to_fight_enemy_attack: "Сила атаки: <%= attack %>",
        victory: "Победа",
        fight: "Сражаться",
        leave: "Уйти",
        listen: "Слушать",
        fight_character_action: "Вы наносите <%= character_attack %> единиц урона врагу. <%= enemy_name %> принимает урон. \n У него остаётся <%= enemy_hp %> единиц здоровья. \n\n",
        fight_enemy_action: "<%= enemy_name %> атакует вас и наносит <%= enemy_attack %> единиц урона. \n У вас <%= character_hp %> очков жизней.\n ",
        fight_continue: "Продолжить сражение",
        victory_message: "Вы успешно побеждаете.",
        leave_message: "Вы успешно возвращаетесь назад.",
        "return": "Вернуться",
        death_message: "Герой не смог выстоять. Но у него всё ещё есть возможность победить.",
        restart: "Начать заново"
    },
    en: {
        start_01: "Hero stand near the crossroad. His name is <input maxlength=\"7\" oninput=\"character.name = this.value\">. His goal is to kill the dragon. But first he must get stronger.",
        crossroad: "Crossroad",
        crossroad_description: "You can go into several place. Where you will go?",
        to_city: "Into the city",
        to_bandit_camp: "To the bandit camp",
        to_forest: "Into the forest",
        to_dragon: "Into the dragon's lair",
        city_description: "You came into the city. You can rest in the tavern. And you can improve your weapon and armor.",
        tavern_rest: "Rest in tavern",
        to_blacksmith: "Go to blacksmith",
        blacksmith_description: "Greetings. Let's see what can I do for you.",
        upgrade_weapon: "Improve weapon",
        upgrade_armor: "Upgrade armor",
        no_money: "Money is not enough",
        back_to_crossroad: "Return to crossroad",
        back_to_city: "Back to the city",
        rested: "You feel rested.",
        forest_description: "What do you want to do in the forest?",
        forest_option_search_resources: "Find useful resources.",
        forest_option_hunt: "Hunting.",
        back_to_forest: "Do something else.",
        hunt_attacked: "attacks you",
        fight_ready: "Ready to fight",
        rogue_camp_entrance_description: "You came closer to the bandit's camp. You are not welcomed here. You see",
        rogue_camp_entrance_no_guard: "no guard.",
        rogue_camp_entrance_one_guard: "one guard.",
        rogue_camp_entrance_two_guards: "two guardians.",
        rogue_camp_entrance_fight_two_guard_description: "When you come closer guardians attack you.",
        rogue_camp_entrance_fight_one_guard_description: "\"You stronger than we thought. Don't worry. I'm ready for this.\" \n \n The second bandit looks stronger.",
        rogue_camp_entrance_come_closer: "Come closer.",
        rogue_camp_entrance_attack_second_guard: "Attack second guardian.",
        rogue_camp_entrance_attack_antony: "Fight with Antony.",
        rogue_camp_entrance_attack_antony_message: "\"It was a mistake\". \n\n Antony is ready to fight.",
        rogue_camp_antony_deal: "\"Well, well, well...\" \n\n You see a strong man is looking at you. \n\n \"I see you can protect yourself. My name is Antony. And I have a job for you.\"",
        dragon_lair_description: "You come closer to the cave where dragon lives. Giant red dragon. You will make a lot of money. But maybe you should be stronger?",
        dragon_lair_enter: "Enter the cave",
        prepare_to_fight_character_hp: "Character HP: <%= hp %>",
        prepare_to_fight_character_attack: "Character attack: <%= attack %>",
        prepare_to_fight_enemy_name: "Enemy name: <%= name %>",
        prepare_to_fight_enemy_hp: "Enemy HP: <%= hp %>",
        prepare_to_fight_enemy_attack: "Enemy Attack: <%= attack %>",
        fight: "Fight",
        leave: "Leave",
        listen: "Listen",
        fight_character_action: "You deal <%= character_attack %> damage. \n <%= enemy_name %> has <%= enemy_hp %> health points.\n\n",
        fight_enemy_action: "<%= enemy_name %> attacks you and deal <%= enemy_attack %> damage. \n You have <%= character_hp %> health points.",
        victory: "Victory",
        fight_continue: "Attack again",
        victory_message: "You succesfully win.",
        leave_message: "You succesfully leaving.",
        "return": "Return",
        death_message: "You didn't make it. But you still can make it.",
        restart: "Start again"
    }
};
var DEFAULT_LANG = {
    current: "en",
    lines: LOCALIZED_STRINGS
};
var LANGUAGES = ["en", "ru"];
//////////////////////// DECLARATIONS ////////////////////////
var error = function (s) { throw Error(s); };
// Initializators
var initConfig = function (w) { return w.config = CONFIGURATION; };
var initDB = function (w) { return w.db = w.db || { enemies: [] }; };
var initStoryGlobalVar = function (w) { return w.story = w.story || {}; };
var initStoryState = function (w) { return w.story
    ? w.story.state = w.story.state || {}
    : error("window.story wasn't initd"); };
var initDBEnemies = function (w) { return w.db
    ? w.db.enemies = ENEMIES
    : error("window.db wasn't initd"); };
var initCurrentEnemy = function (w) { return w.enemy = DEFAULT_CURRENT_ENEMY; };
var initLanguage = function (w) { return w.lang = DEFAULT_LANG; };
// Specific initilizatiors
function initHelper(w, e, l) {
    w.helper = {
        prepareEnemy: e.prepareEnemyWithOptionalFunc.bind(e),
        // randomEnemy,
        // randomEnemyID,
        randomEnemyForestID: e.randomEnemyForestID.bind(e),
        // toggleLanguage,
        chooseLanguage: l.chooseLanguage.bind(l),
        localizedText: l.getLocalizedText.bind(l),
        localizedTextParsed: l.getLocalizedTextParsed.bind(l)
    };
}
function initAliases(w, e, l) {
    var _a;
    w.s = (_a = w.story) === null || _a === void 0 ? void 0 : _a.state;
    w.h = w.helper;
    w.l = w.lang;
    w.t = l.getLocalizedTextParsed.bind(l);
    w.enemyName = e.getLocalizedCurrentEnemyName.bind(e);
}
// End Initializators
var runInitializers = function (w, inits) {
    return inits.forEach(function (init) { return init(w); });
};
function initAll(w) {
    runInitializers(w, [
        initConfig,
        initDB,
        initDBEnemies,
        initStoryGlobalVar,
        initStoryState,
        initCurrentEnemy,
        initLanguage,
    ]);
    return w;
}
// Language Management
var isLanguageAvailable = function (s) { return LANGUAGES.indexOf(s) !== -1; };
var LocalizationManager = /** @class */ (function () {
    function LocalizationManager(l) {
        this.global = l;
    }
    LocalizationManager.prototype.getLanguageObject = function () {
        return this.global.lang
            ? this.global.lang
            : error("Global language object is undefined");
    };
    LocalizationManager.prototype.getCurrentLang = function () {
        var _a;
        return ((_a = this.global.lang) === null || _a === void 0 ? void 0 : _a.current) ? this.global.lang.current
            : error("Current language is not recognizable");
    };
    LocalizationManager.prototype.getLocalizedText = function (id) {
        var current = this.getCurrentLang();
        var lang = this.getLanguageObject();
        return lang.lines[current][id];
    };
    LocalizationManager.prototype.getLocalizedTextParsed = function (id, values) {
        if (values) {
            return window._.template(this.getLocalizedText(id))(values);
        }
        return this.getLocalizedText(id);
    };
    LocalizationManager.prototype.toggleLanguage = function () {
        var l = this.getLanguageObject();
        this.getCurrentLang() === "en"
            ? l.current = "ru"
            : l.current = "en";
    };
    LocalizationManager.prototype.chooseLanguage = function (value) {
        var l = this.getLanguageObject();
        isLanguageAvailable(value)
            ? l.current = value
            : error("Language \"" + value + "\" not acceptable");
    };
    return LocalizationManager;
}());
// Enemy handler
var EnemyManager = /** @class */ (function () {
    function EnemyManager(w, e) {
        this.enemyDB = [];
        this.enemyDB = e;
        this.global = w;
    }
    EnemyManager.prototype.prepareEnemy = function (id) {
        var enemy = this.findEnemyById(id);
        this.assignEnemyToGlobal(enemy);
        // const currentLang = window.lang.current
        // const getEnemyLocalizedName = (lang, enemyObj) => enemyObj.name[lang]
        // window.enemy = Object.assign({}, foundEnemy)
        // window.enemy.name = getEnemyLocalizedName(currentLang, foundEnemy)
    };
    EnemyManager.prototype.prepareEnemyWithOptionalFunc = function (s) {
        if (typeof s === "string") {
            this.prepareEnemy(s);
        }
        else {
            this.prepareEnemy(s());
        }
    };
    EnemyManager.prototype.randomEnemyForestID = function () {
        return this.randomEnemyCondition(function (e) { return e.victoryPassage === "Лес"; }).id;
    };
    EnemyManager.prototype.getLocalizedCurrentEnemyName = function () {
        var _a, _b;
        var lang = (_a = this.global.lang) === null || _a === void 0 ? void 0 : _a.current;
        if (lang === undefined) {
            error('Language is not defined');
            return '';
        }
        var curEnemyNameObj = (_b = this.global.enemy) === null || _b === void 0 ? void 0 : _b.name;
        return curEnemyNameObj && curEnemyNameObj[lang] || "";
    };
    EnemyManager.prototype.findEnemyById = function (id) {
        return this.enemyDB
            .filter(function (e) { return e.id === id; })[0] || error("Enemy wasn't found by id: " + id);
    };
    EnemyManager.prototype.assignEnemyToGlobal = function (e) {
        this.global.enemy = e;
    };
    EnemyManager.prototype.randomEnemyID = function () {
        return this.randomEnemy().id;
    };
    EnemyManager.prototype.randomEnemy = function () {
        var enemiesCount = this.enemyDB.length - 1;
        var index = window._.random(enemiesCount);
        return this.enemyDB[index];
    };
    EnemyManager.prototype.randomEnemyCondition = function (conditionFunc) {
        var filtered = this.enemyDB.filter(conditionFunc);
        var count = filtered.length - 1;
        var index = window._.random(count);
        return filtered[index];
    };
    return EnemyManager;
}());
//////////////////////// EXECUTION ////////////////////////
var extendedWindow = initAll(window);
var enemyManager = new EnemyManager(extendedWindow, ENEMIES);
var localizationManager = new LocalizationManager(extendedWindow);
initHelper(window, enemyManager, localizationManager);
initAliases(window, enemyManager, localizationManager);
