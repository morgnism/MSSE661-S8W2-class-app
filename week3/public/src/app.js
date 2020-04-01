var object = {
  name: 'Bob',
  age: 50
};

class Person {
  name;
  age;

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getLegal() {
    return this.age > 18;
  }
}

console.log(new Person('Bob', 50));
