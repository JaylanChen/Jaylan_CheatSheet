# 继承

## 1. 原型链继承

```
function Animal(name) {
    this.name = name || 'Animal';
    this.foods = ['肉', '骨头', '馒头'];
    this.sleep = function () {
        console.log(this.name + ' 在睡觉');
    }
}
Animal.prototype.eat = function () {
    console.log(this.name + ' 在吃东西');
}

function Dog(name) {
    this.name = name;
}
Dog.prototype = new Animal();
var dog1 = new Dog('dog1');
dog1.eat();

var dog2 = new Dog('dog2');
dog2.eat();

// 引用类型的属性被所有实例共享
console.log('dog1', dog1.foods);
console.log('dog2', dog2.foods);

dog1.foods.push('包子');

console.log('dog1', dog1.foods);
console.log('dog2', dog2.foods);
```

**特点**：

1. 让新实例的原型等于父类的实例。
   **缺点**：
1. 引用类型的属性被所有实例共享
1. 在创建 Child 的实例时， 不能向 Person 传参
1. 继承单一。

## 2. 借用构造函数继承

```
function Animal(name) {
    this.name = name || 'Animal';
    this.foods = ['肉', '骨头', '馒头'];
    this.sleep = function () {
        console.log(this.name + ' 在睡觉');
    }
}
Animal.prototype.eat = function () {
    console.log(this.name + ' 在吃东西');
}

function Dog(name) {
    Animal.call(this, name);
    this.age = 2;
}

var dog1 = new Dog('dog1');
dog1.sleep();

var dog2 = new Dog('dog2');
dog2.sleep();

console.log('dog1', dog1.foods);
console.log('dog2', dog2.foods);

dog1.foods.push('包子');

console.log('dog1', dog1.foods);
console.log('dog2', dog2.foods);
```

用.call()和.apply()将父类构造函数引入子类函数（在子类函数中做了父类函数的自执行（复制））
**特点**：

1. 只继承了父类构造函数的属性，没有继承父类原型的属性。
2. 解决了原型链继承缺点 1、2、3。
3. 可以继承多个构造函数属性（call 多个）。
4. 在子实例中可向父实例传参。
   **缺点**：
5. 只能继承父类构造函数的属性。
6. 无法实现构造函数的复用。（每次用每次都要重新调用）
7. 每个新实例都有父类构造函数的副本，臃肿。

## 3. 组合继承（组合原型链继承和借用构造函数继承）

**常用**

```
function Animal(name) {
    this.name = name || 'Animal';
    this.foods = ['肉', '骨头', '馒头'];
    this.sleep = function () {
        console.log(this.name + ' 在睡觉');
    }
}
Animal.prototype.eat = function () {
    console.log(this.name + ' 在吃东西');
}

function Dog(name) {
    Animal.call(this, name);
    this.age = 2;
}
Dog.prototype = new Animal();

var dog1 = new Dog('dog1');
dog1.sleep();
dog1.eat();

var dog2 = new Dog('dog2');
dog2.sleep();
dog2.eat();
```

结合了两种模式（借用构造函数继承和原型链继承）的优点，传参和复用
特点：

1. 可以继承父类原型上的属性，可以传参，可复用。
2. 每个新实例引入的构造函数属性是私有的。
   缺点：
3. 调用了两次父类构造函数（耗内存），子类的构造函数会代替原型上的那个父类构造函数。

## 4. 原型式继承

```
function Animal(name) {
    this.name = name || 'Animal';
    this.foods = ['肉', '骨头', '馒头'];
    this.sleep = function () {
        console.log(this.name + ' 在睡觉');
    }
}
Animal.prototype.eat = function () {
    console.log(this.name + ' 在吃东西');
}

var animal = new Animal();

function CreateObj(o) {
    function F() { }
    F.prototype = o;
    return new F();
}

var dog1 = CreateObj(animal);
dog1.name = 'dog1';
dog1.sleep();
```

用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了个可以随意增添属性的实例或对象。object.create()就是这个原理。
特点：

1. 类似于复制一个对象，用函数来包装。
   缺点：
1. 所有实例都会继承原型上的属性。
1. 无法实现复用。（新实例属性都是后面添加的）

## 5. 寄生式继承

```
function Animal(name) {
    this.name = name || 'Animal';
    this.foods = ['肉', '骨头', '馒头'];
    this.sleep = function () {
        console.log(this.name + ' 在睡觉');
    }
}
Animal.prototype.eat = function () {
    console.log(this.name + ' 在吃东西');
}

var animal = new Animal();

function CreateObj(o) {
    function F() { }
    F.prototype = o;
    return new F();
}

function CreateDog(obj){
    var dog = CreateObj(obj);
    dog.name = 'dog';
    dog.age = 2;
    return dog;
}

var dog1 = CreateDog(animal);
dog1.sleep();
```

就是给原型式继承外面套了个壳子。
优点：
1. 没有创建自定义类型，因为只是套了个壳子返回对象（这个），这个函数顺理成章就成了创建的新对象。
缺点：
2. 没用到原型，无法复用。

## 6. 寄生组合式继承
```
function Animal(name) {
    this.name = name || 'Animal';
    this.foods = ['肉', '骨头', '馒头'];
    this.sleep = function () {
        console.log(this.name + ' 在睡觉');
    }
}
Animal.prototype.eat = function () {
    console.log(this.name + ' 在吃东西');
}

function Dog(name) {
    Animal.call(this, name);
}

function CreateObj(o) {
    function F() { }
    F.prototype = o;
    return new F();
}

function inheritPrototype(subType, superType) {
    var prototype = CreateObj(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}

inheritPrototype(Dog, Animal);

var dog1 = new Dog('dog1');
dog1.sleep();
dog1.eat();
```

优点： 
1. 这种方式的高效率体现它只调用了一次Parent构造函数，并且因此避免了再Parent.prototype上面创建不必要的，多余的属性。普遍认为寄生组合式继承是引用类型最理想的继承方式