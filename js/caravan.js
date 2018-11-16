class Caravan{
    constructor(crew,food,oxen,firepower,money){
        this.day = 0;
        this.distance = 0;
        this.crew = crew;
        this.food = food;
        this.oxen = oxen;
        this.firepower = firepower;
        this.money = money;
        
        this.trailStats = {
            WEIGHT_PER_OX: 20,
            WEIGHT_PER_PERSON: 2,
            FOOD_WEIGHT: 0.6,
            FIREPOWER_WEIGHT: 5,
            GAME_SPEED: 300,
            DAY_PER_STEP: 0.2,
            FOOD_PER_PERSON: 0.02,
            FULL_SPEED: 5,
            SLOW_SPEED: 3,
            FINAL_DISTANCE: 1000,
            EVENT_PROBABILITY: 0.15,
            ENEMY_FIREPOWER_AVG: 5,
            ENEMY_GOLD_AVG: 50
        }
    }
}