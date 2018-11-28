class UI{
    constructor(){
        this.attackInitiated = false;

    }

    notify(message, type, game){
        document.getElementById('updates-area').innerHTML = '<div class="update-' + type + '">Day '+ Math.ceil(game.caravan.day) + ': ' + message+'</div>' + document.getElementById('updates-area').innerHTML;
    }

    //refresh visual caravan stats
    updateDOM(game) {
        //modify the dom
        document.getElementById('stat-day').innerHTML = Math.ceil(game.caravan.day);
        document.getElementById('stat-distance').innerHTML = Math.floor(game.caravan.distance);
        document.getElementById('stat-crew').innerHTML = game.caravan.crew;
        document.getElementById('stat-oxen').innerHTML = game.caravan.oxen;
        document.getElementById('stat-food').innerHTML = Math.ceil(game.caravan.food);
        document.getElementById('stat-money').innerHTML = game.caravan.money;
        document.getElementById('stat-firepower').innerHTML = game.caravan.firepower;
        document.getElementById('stat-weight').innerHTML = Math.ceil(game.caravan.weight) + '/' + game.caravan.capacity;

        //update caravan position
        document.getElementById('caravan').style.left = (380 * game.caravan.distance/game.caravan.trailStats.FINAL_DISTANCE) + 'px';
    };


    showAttack(firepower, gold, controller) {
        let attackDiv = document.getElementById('attack');
        attackDiv.classList.remove('hidden');

        //keep properties
        this.firepower = firepower;
        this.gold = gold;

        //show firepower
        document.getElementById('attack-description').innerHTML = 'Firepower: ' + firepower;

        //init once
        if(!this.attackInitiated) {

            //fight
            document.getElementById('fight').addEventListener('click', () => {controller.fight(firepower,gold)});

            //run away
            document.getElementById('runaway').addEventListener('click', () => {controller.runaway(firepower)});

            this.attackInitiated = true;
        }
    };

    hideAttack(){
        document.getElementById('attack').classList.add('hidden');
    }



    showShop(products,game){
        let shopDiv = document.getElementById('shop');
        shopDiv.classList.remove('hidden');

        //init the shop just once
        if(!this.shopInitiated) {

            //event delegation
            shopDiv.addEventListener('click', function(e){
                //what was clicked
                let target = e.target || e.src;

                //exit button
                if(target.tagName == 'BUTTON') {
                    //resume journey
                    shopDiv.classList.add('hidden');
                    game.play();
                }
                else if(target.tagName == 'DIV' && target.className.match(/product/)) {

                    game.buyProduct({
                        item: target.getAttribute('data-item'),
                        qty: target.getAttribute('data-qty'),
                        price: target.getAttribute('data-price')
                    });

                }
            });

            this.shopInitiated = true;
        }

        //clear existing content
        let prodsDiv = document.getElementById('prods');
        prodsDiv.innerHTML = '';

        //show products
        let product;
        for(let i=0; i < products.length; i++) {
            product = products[i];
            prodsDiv.innerHTML += '<div class="product" data-qty="' + product.qty + '" data-item="' + product.item + '" data-price="' + product.price + '">' + product.qty + ' ' + product.item + ' - $' + product.price + '</div>';
        }
    }
}