let testElement;


testElement = new ElementEv('.test-ul');
console.log(testElement);

let loaded = document.querySelector('.test-ul');
testElement = new ElementEv(loaded);
console.log(testElement);

