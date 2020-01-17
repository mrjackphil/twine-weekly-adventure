// #region ENENY_IDS
type EnemyId = "rogue_1"
| "rogue_2"
| "rogue_antony"
| "final_dragon"
| "wolf"
| "elk"
| "bear"

// #endregion

// #region LOCALIZATION_STRING_IDS
type LocalizationStringIds = "start_01"
  | "crossroad"
  | "crossroad_description"
  | "to_city"
  | "to_bandit_camp"
  | "to_forest"
  | "to_dragon"
  | "city_description"
  | "tavern_rest"
  | "to_blacksmith"
  | "blacksmith_description"
  | "upgrade_weapon"
  | "upgrade_armor"
  | "no_money"
  | "back_to_crossroad"
  | "back_to_city"
  | "rested"
  | "forest_description"
  | "forest_option_search_resources"
  | "forest_option_hunt"
  | "back_to_forest"
  | "hunt_attacked"
  | "fight_ready"
  | "rogue_camp_entrance_description"
  | "rogue_camp_entrance_no_guard"
  | "rogue_camp_entrance_one_guard"
  | "rogue_camp_entrance_two_guards"
  | "rogue_camp_entrance_come_closer"
  | "rogue_camp_entrance_attack_second_guard"
  | "rogue_camp_entrance_fight_two_guard_description"
  | "rogue_camp_entrance_fight_one_guard_description"
  | "rogue_camp_entrance_attack_antony"
  | "rogue_camp_entrance_attack_antony_message"
  | "rogue_camp_antony_deal"
  | "dragon_lair_description"
  | "dragon_lair_enter"
  | "prepare_to_fight_character_hp"
  | "prepare_to_fight_character_attack"
  | "prepare_to_fight_enemy_name"
  | "prepare_to_fight_enemy_hp"
  | "prepare_to_fight_enemy_attack"
  | "victory"
  | "fight"
  | "leave"
  | "listen"
  | "fight_character_action"
  | "fight_enemy_action"
  | "fight_continue"
  | "victory_message"
  | "leave_message"
  | "return"
  | "death_message"
  | "restart"
// #endregion

interface Config {
  deadMessage?: string;
  deathPassage?: string;
}

interface State {
  bandit_1_killed?: boolean;
  bandit_2_killed?: boolean;
  antony_angry?: boolean;
  antony_killed?: boolean;
}

interface Database {
  enemies: Enemy[];
}

interface Enemy {
  id: EnemyId;
  name: LocalizedObject;
  hp: number;
  attack: number;
  evadePassage: string;
  victoryPassage: string;
  victoryCallback: (s: State) => void;
}

type Initializer = (w: WindowExtended) => void;

interface LocalizedObject {
  ru: string;
  en: string;
}

type LocalizedStringsObject = {
  [k in LocalizationStringIds]: string;
}

type Language = "en" | "ru"

interface LangObject {
  current: Language;
  lines: LangLines;
}

type LangLines = { [k in Language]: LocalizedStringsObject }

interface LocalizationManagerInterface {
  getLocalizedText: (id: LocalizationStringIds) => string;
  getLocalizedTextParsed: (id: LocalizationStringIds, values?: Object ) => string;
  toggleLanguage: () => void;
  chooseLanguage: (value: Language) => void;
}

interface Helper {}

type Alias = any;

interface WindowExtended extends Window {
  config?: Config;
  db?: Database;
  story?: {
    state?: Partial<State>;
  },
  enemy?: Partial<Enemy>;
  lang?: LangObject;
  helper?: Helper;
  s?: Alias;
  h?: Alias;
  l?: Alias;
  t?: Alias;
  enemyName?: Alias;
}

//////////////////////// CONSTANTS ////////////////////////

const CONFIGURATION: Config = {
    deadMessage: "Вы мертвы",
    deathPassage: "Смерть",
}

const ENEMIES: Enemy[] = [
  {
		id: "rogue_1",
		name: {ru: "Бандит новичок", en: "Bandit novice"},
		hp: 2,
		attack: 1,
		evadePassage: "Логово разбойников",
		victoryPassage: "Атаковать второго охранника",
		victoryCallback: (state) => state.bandit_1_killed = true,
	},
	{
		id: "rogue_2",
		name: {ru: "Бандит крепыш", en: "Bandit"},
		hp: 5,
		attack: 2,
		evadePassage: "Логово разбойников",
		victoryPassage: "Диалог с Энтони",
		victoryCallback: (state) => state.bandit_2_killed = true,
	},
	{
		id: "rogue_antony",
		name: {ru: "Энтони", en: "Antony"},
		hp: 20,
		attack: 5,
		evadePassage: "Логово разбойников",
		victoryPassage: "Диалог с Энтони",
		victoryCallback: (state) => state.antony_killed = true,
	},
	{
		id: "final_dragon",
		name: {ru: "Огромный красный дракон", en: "Giant Red Dragon"},
		hp: 100,
		attack: 10,
		evadePassage: "Дракон",
		victoryPassage: "Прошли игру",
		victoryCallback: (state) => {},
	},
	{
		id: "wolf",
		name: {ru: "Волк", en: "Wolf"},
		attack: 3,
		hp: 3,
		evadePassage: "Лес",
		victoryPassage: "Лес",
		victoryCallback: (state) => {},
	},
	{
		id: "elk",
		name: {ru: "Лось", en: "Elk"},
		attack: 5,
		hp: 5,
		evadePassage: "Лес",
		victoryPassage: "Лес",
		victoryCallback: (state) => {},
	},
	{
		id: "bear",
		name: {ru: "Медведь", en: "Bear"},
		attack: 10,
		hp: 10,
		evadePassage: "Лес",
		victoryPassage: "Лес",
		victoryCallback: (state) => {},
	}
]

const DEFAULT_CURRENT_ENEMY: Partial<Enemy> = {
  name: { ru: "", en: "" },
  attack: 0,
  hp: 0,
  evadePassage: "",
  victoryPassage: "",
  victoryCallback: () => {}
}

const LOCALIZED_STRINGS: LangLines = {
  ru:  {
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
		return: "Вернуться",
		death_message: "Герой не смог выстоять. Но у него всё ещё есть возможность победить.",
		restart: "Начать заново",
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
		return: "Return",
		death_message: "You didn't make it. But you still can make it.",
		restart: "Start again",
	}
}

const DEFAULT_LANG: LangObject = {
  current: "en",
  lines: LOCALIZED_STRINGS,
}

const LANGUAGES: Language[] = ["en", "ru"]

//////////////////////// DECLARATIONS ////////////////////////

const error = (s: string) => { throw Error(s) }

// Initializators
const initConfig: Initializer = w => w.config = CONFIGURATION
const initDB: Initializer = w => w.db = w.db || { enemies: [] }
const initStoryGlobalVar: Initializer = w => w.story = w.story || {}
const initStoryState: Initializer = w => w.story
  ? w.story.state = w.story.state || {}
  : error("window.story wasn't initd")
const initDBEnemies: Initializer = w => w.db
  ? w.db.enemies = ENEMIES
  : error("window.db wasn't initd")
const initCurrentEnemy: Initializer = w => w.enemy = DEFAULT_CURRENT_ENEMY
const initLanguage: Initializer = w => w.lang = DEFAULT_LANG

// Specific initilizatiors
function initHelper(w: WindowExtended, e: EnemyManager, l: LocalizationManager) {
  w.helper = {
    prepareEnemy: e.prepareEnemyWithOptionalFunc.bind(e),
    // randomEnemy,
    // randomEnemyID,
    randomEnemyForestID: e.randomEnemyForestID.bind(e),
    // toggleLanguage,
    chooseLanguage: l.chooseLanguage.bind(l),
    localizedText: l.getLocalizedText.bind(l),
    localizedTextParsed: l.getLocalizedTextParsed.bind(l),
  }
}

function initAliases(w: WindowExtended, e: EnemyManager, l: LocalizationManager) {
  w.s = w.story?.state
  w.h = w.helper
  w.l = w.lang
  w.t = l.getLocalizedTextParsed.bind(l)
  w.enemyName = e.getLocalizedCurrentEnemyName.bind(e)
}
// End Initializators

const runInitializers = (w: WindowExtended, inits: Initializer[]) =>
  inits.forEach(init => init(w))

function initAll(w: WindowExtended): WindowExtended {
  runInitializers(w, [
    initConfig,
    initDB,
    initDBEnemies,
    initStoryGlobalVar,
    initStoryState,
    initCurrentEnemy,
    initLanguage,
  ])

  return w
}

// Language Management
const isLanguageAvailable = (s: Language) => LANGUAGES.indexOf(s) !== -1

class LocalizationManager implements LocalizationManagerInterface {
  private global: WindowExtended;
  constructor(l: WindowExtended) {
    this.global = l
  }

  public getLanguageObject(): LangObject {
    return this.global.lang
      ? this.global.lang
      : error("Global language object is undefined")
  }

  private getCurrentLang(): Language {
    return this.global.lang?.current
      ? this.global.lang.current
      : error("Current language is not recognizable")
  }

  public getLocalizedText(id: LocalizationStringIds): string {
    const current = this.getCurrentLang()
    const lang = this.getLanguageObject()

    return lang.lines[current][id]
  }

  public getLocalizedTextParsed(id: LocalizationStringIds, values?: Object ): string  {
    if (values) {
      return (<any>window)._.template(this.getLocalizedText(id))(values) as string
    }
    return this.getLocalizedText(id)
  }

  public toggleLanguage() {
    const l = this.getLanguageObject()

    this.getCurrentLang() === "en"
      ? l.current = "ru"
      : l.current = "en"
  }

  public chooseLanguage(value: Language) {
    const l = this.getLanguageObject()

    isLanguageAvailable(value)
      ? l.current = value
      : error(`Language "${value}" not acceptable`)
  }
}

// Enemy handler
class EnemyManager {
  private enemyDB: Enemy[] = [];
  private global: WindowExtended;
  constructor(w: WindowExtended, e: Enemy[]) {
    this.enemyDB = e;
    this.global = w;
  }

  public prepareEnemy(id: EnemyId) {
    const enemy = this.findEnemyById(id)
    this.assignEnemyToGlobal(enemy);
    // const currentLang = window.lang.current
    // const getEnemyLocalizedName = (lang, enemyObj) => enemyObj.name[lang]
    // window.enemy = Object.assign({}, foundEnemy)
    // window.enemy.name = getEnemyLocalizedName(currentLang, foundEnemy)
  }

  public prepareEnemyWithOptionalFunc(s: EnemyId | Function) {
    if (typeof s === "string") {
      this.prepareEnemy(s)
    } else {
      this.prepareEnemy(s())
    }
  }

  public randomEnemyForestID() {
    return this.randomEnemyCondition(e => e.victoryPassage === "Лес").id
  }

  public getLocalizedCurrentEnemyName(): string {
    const lang = this.global.lang?.current
    if (lang === undefined) {
      error('Language is not defined')
      return ''
    }
    const curEnemyNameObj = this.global.enemy?.name
    return curEnemyNameObj && curEnemyNameObj[lang] || ""
  }

  private findEnemyById(id: EnemyId) {
    return this.enemyDB
      .filter( e => e.id === id )[0] || error(`Enemy wasn't found by id: ${id}`)
  }

  private assignEnemyToGlobal(e: Enemy) {
    this.global.enemy = e;
  }

  private randomEnemyID() {
    return this.randomEnemy().id
  }

  private randomEnemy() {
    const enemiesCount = this.enemyDB.length - 1
    const index = (<any>window)._.random(enemiesCount) as number
    return this.enemyDB[index]
  }

  private randomEnemyCondition(conditionFunc: (e: Enemy) => boolean) {
    const filtered = this.enemyDB.filter(conditionFunc)
    const count = filtered.length - 1
    const index = (<any>window)._.random(count)

    return filtered[index]
  }
}

//////////////////////// EXECUTION ////////////////////////

const extendedWindow = initAll(window)
const enemyManager = new EnemyManager(extendedWindow, ENEMIES)
const localizationManager = new LocalizationManager(extendedWindow)
initHelper(window, enemyManager, localizationManager)
initAliases(window, enemyManager, localizationManager)
