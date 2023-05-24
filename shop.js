
class Good {
    constructor (id, name,desc, sizes, price, available) {
    this.id = id;
    this.name = name;
    this.description = desc;
    this.sizes = sizes;
    this.price = price;
    this.available = available;
    }

    setAvalable ( avail) {
        this.available = avail
    }
}

class GoodsList {
    #goods = []
    constructor (goods, filter, sortPrice, sortDir) {
        this.#goods = goods
        this.filter = new RegExp (filter, 'ig');
        this.sortPrice = sortPrice;
        this.sortDir = sortDir; 
    }

    get list() {
        this.listGoods =  this.#goods.filter(good => this.filter.test(good.name))
        
        if (this.sortPrice) {
            this.listGoods.sort((i1, i2) => i1.price - i2.price)
            if (!this.sortDir ) {
                this.listGoods.reverse()
            }
          
        }
        
        return this.listGoods
    }   
    add(good) {
        this.#goods.push(good);
      } 

    remove(id) {
      this.#goods.forEach(good => {
          if (good.id == id) {
              this.#goods.splice(this.#goods.indexOf(good), 1)
            }
      });
    
}
}

class BasketGood extends Good {
    constructor (good, amount) {
        super(good.id, good.name, good.description, good.sizes, good.price, good.available)
        this.amount = amount
    }
}

class Basket  {
    constructor (bgoods) {
        this.goods = bgoods
    }
    add(good, amount) {
        if (this.goods.find((element) => element.id === good.id)) {
          return (this.goods[
            this.goods.findIndex((element) => element.id === good.id)
          ].amount += amount);
        } else {
          let cartGood = new BasketGood(good, amount,);
          return this.goods.push(cartGood);
        }
      }

    remove(good, amount) {
        if (
          this.goods[this.goods.findIndex((element) => element.id === good.id)].amount > amount) {
          return (this.goods[
            this.goods.findIndex((element) => element.id === good.id)
          ].amount -= amount);
        } else {
          return this.goods.splice(this.goods.findIndex((element) => element.id === good.id), 1)
        }
      }

    clear() {
        return (this.goods = []);
      }

    removeUnavailable() {
        return this.goods = this.goods.filter(good => good.available === true)
    }

    get totalAmount() {
        return this.goods.reduce((a, b) => a + b.amount, 0)
    }

    get totalSum() {
        let totalSum = 0;
        this.goods.forEach((good) => (totalSum += good.price * good.amount));
        return totalSum;
    }
  }


let good1 = new Good(1, "Киви", "Зеленый круглый", ["маленький", "большой"], 80, true);
let good2 = new Good(2, "Апельсин", "Желтый, круглый", [ "маленький", "большой"], 30, true);
let good3 = new Good(3, "Банан", "Длинный, желтый", [ "маленький", "большой"], 100, false);
let good4 = new Good(4, "Яблоко", "Круглое, вкусное", [ "красное", "зеленое"], 100, true);
let good5 = new Good(5, "Виноград", "Круглый, маленький", [ 1, 10, 20], 110, false);


let allGoods = new GoodsList([good1, good2, good4], /w*/, true, true);
allGoods.add(good3)
allGoods.add(good5)
console.log(allGoods.list)
allGoods.remove(1)


let baskItem1 = new BasketGood(good3, 5)
let baskItem2 = new BasketGood(good5, 7)
let baskItem3 = new BasketGood(good1, 8)
let baskItem4 = new BasketGood(good4, 3)

let cart =  new Basket([baskItem1, baskItem2, baskItem3, baskItem4])

cart.add(good5, 10)
console.log(cart)
console.log('***************************')
cart.remove(good5, 10)
console.log(cart)



console.log('************Удалил***************')
cart.clear()
console.log(cart)

console.log('************Добавил товары***************')
cart.add(good5, 10)
cart.add(good1, 5)
cart.add(good2, 7)
console.log(cart)

console.log('**************Уменьшил количество, удалил количеством*************')
cart.remove(good2, 5)
cart.remove(good1, 5)
console.log(cart)

console.log('**************Убрать все недоступные*************')
cart.removeUnavailable()
console.log(cart)

console.log("Всего товаров :", cart.totalAmount)
console.log("общая стоимость: ", cart.totalSum)


