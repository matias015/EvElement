let testElement;


testElement = new ElementEv('.test-ul');
console.log(testElement);

let loaded = document.querySelector('.test-ul');
testElement = new ElementEv(loaded);
console.log(testElement);


let myDiv = _find('.my-div');

myDiv.createChild('<p>')
    .withText('text content')
    .withClasses(['class1','class2'])
    .withChildren([
        create('<span>').setText('span text').attr('id','myId'),
        create('<span>').setText('span text 2').attr('id','myId2')
    ])

myDiv.insert()
