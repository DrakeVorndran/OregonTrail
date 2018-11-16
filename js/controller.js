class Controller{
    constructor(crew,food,oxen,firepower,money,eventTypes){
        this.ui = new UI();
        this.eventTypes = eventTypes;
        this.caravan = new Caravan(crew,food,oxen,firepower,money,this.ui);
        this.updateWeight();
        this.start();
    }


    updateWeight(){
        this.caravan.weight = this.caravan.food * this.caravan.trailStats.FOOD_WEIGHT + this.caravan.firepower * this.caravan.trailStats.FIREPOWER_WEIGHT;

        this.caravan.capacity = this.caravan.oxen * this.caravan.trailStats.WEIGHT_PER_OX + this.caravan.crew * this.caravan.trailStats.WEIGHT_PER_PERSON;

        let droppedGuns = 0;
        let droppedFood = 0;

        while(this.caravan.weight > this.caravan.capacity && this.caravan.firepower){
            this.caravan.firepower--;
            this.caravan.weight -= this.caravan.trailStats.FIREPOWER_WEIGHT;
            droppedGuns++;
        }
        if(droppedGuns){
            this.ui.notify(`dropped ${droppedGuns} guns`,"negative",this);
        }

        while(this.caravan.weight > this.caravan.capacity && this.caravan.food){
            this.caravan.food--;
            this.caravan.weight -= this.caravan.trailStats.FOOD_WEIGHT;
            droppedFood++;
        }
        if(droppedFood){
            this.ui.notify(`dropped ${droppedFood} food`,"negative",this);
        }
    }

    updateDistance(){
        let diff = this.caravan.capacity - this.caravan.weight;
        let speed = this.caravan.trailStats.SLOW_SPEED + diff/this.caravan.capacity * this.caravan.trailStats.FULL_SPEED;
        this.caravan.distance += speed;
    }

    consumeFood(){
        this.caravan.food -= this.caravan.crew * this.caravan.trailStats.FOOD_PER_PERSON;
        if(this.caravan.food < 0){
            this.caravan.food = 0;
        }
    }

    start(){
        this.gameActive = true;
        this.step();
    }

    step(){
        this.updateGame();
        if(this.gameActive){
            //            this.gameActive=false;
            setTimeout(this.step.bind(this),this.caravan.trailStats.GAME_SPEED);
        }
    }

    updateGame(){
        this.caravan.day += this.caravan.trailStats.DAY_PER_STEP;
        this.consumeFood();

        if(this.caravan.food === 0){
            this.ui.notify('Your caravan starved to death', 'negative',this);
            this.gameActive = false;
            return;
        }

        this.updateWeight();
        this.updateDistance();
        this.ui.updateDOM(this);

        if(this.caravan.crew<=0){
            this.caravan.crew = 0;
            this.gameActive = false;
            this.ui.notify("everyone died","negative",this);
            return;

        }

        if(this.caravan.distance >=this.caravan.trailStats.FINAL_DISTANCE){
            this.ui.notify('You have returned home', 'negative',this);
            this.gameActive = false;
            return;
        }

        if(Math.random() <= this.caravan.trailStats.EVENT_PROBABILITY) {
            this.generateEvent();
        }

    }

    pause(){
        this.gameActive = false;
    }

    play(){
        this.gameActive = true;
        this.step();
    }

    generateEvent(){
        let index = Math.floor(Math.random()*this.eventTypes.length);
        let eventData = this.eventTypes[index];

        if(eventData.type =='STAT-CHANGE'){
            this.statChange(eventData)
        };

    }


    statChange(eventData){
        if(eventData.value + this.caravan[eventData.stat] >= 0) {
            this.caravan[eventData.stat] += eventData.value;
            this.ui.notify(eventData.text + Math.abs(eventData.value), eventData.notification,this);
        }
    }




}