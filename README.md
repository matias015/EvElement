Small library to deal with elements


 - Searching an element

Using a query
```
let element = new ElementEv('.myClass');
let element = new ElementEv('#myId');
```
Using loaded elements
```
let loaded = document.querySelector(query);
let element = new ElementEv(loaded);
```
Others ways
```
let element = _find('.my-class');

let element = element().whereClass('my-class', function(){
  // create the item if it does not exists
  return create('<p>', 'text content');
});

element().whereId('my-id', function(){
  return create('<p>', 'text content');
});

element().whereTag('div', function(){
  return create('<div>', 'text content');
}

element().whereProp(['type','checkbox'], function(){
  return create('<input>').attr('type','checkbox');
}
```

you can choose the parent where the search will be performed
```
element().inParent('.class-of-parent').whereClass('class-of-element');

or

let parent = _find('.my-parent-class');
element().inParent(parent).whereClass('class-of-element');

```

Getting the original element
```
let HTMLElementObjetc = myEvElement.get();
```

check if an element has a specific tag
```
if(element.tagIs('div')){
  // more code...
}
```

Add events
```
let button = _find('.my-button');

button.when('click').make(function(e){
    let clicked = e.element; // returns the EvElement of the target 
})

or

button.when('click', function(e){
    let clicked = e.element; // returns the EvElement of the target 
})
```

unsetting events
```
button.unsetEvent('click');
```

- Properties

Text content
```
button.setText('Click me');

if(button.textIs('click')){
    console.log('that is true!');
}

button.clear() // will clear all the content, not only text, also nodes.
```
Classes
```
if(element.hasClass('show')){
  element.removeClass('show');
}else {
  element.addClass('show');
}

// toggle
element.toggleClass('show'); 
```

- append childs to elements
```
let myDiv = _find('.my-div');

myDiv.createChild('<p>')
    .withText('text content')
    .withAttrs({'attr1':'value', 'attr2':'value'})
    .withClasses(['class1','class2'])
    .withChildren([
        create('<span>').setText('span text').attr('id','myId'),
        create('<span>').setText('span text 2').attr('id','myId2')
    ])

myDiv.insert()
```
final result is
```
<div class="my-div">
    <p class="class1 class2">
        'text content'
        <span id="myId">span text</span>
        <span id="myId2">span text 2</span>
    </p>
</div>
```
Other way to do it
```
let parent = _find('.parent');
let child = create('div', 'i am a child element');

child.insertInto(parent);
```

Deleting elements from the DOM
```
let element = _find('.element-class');
element.remove();
```

moving elements
```
let element = _find('.element-class');
let newParent = _find('.new-parent-class');

element.move(newParent);
```

Removing a element after determinated time
```
let element = _find('.element-class');
element.removeAfter(2000, function(){
  // todo after remove
});
```

Toggle class after determinated time
```
let element = _find('.element-class');
element.toggleAfter(2000, 'show');
```


- Traversing

Getting childs elements
```
let parent = _find('.parent');

let lastChild = parent.lastChild();
let firstChild = parent.firstChild();
let secondChild = parent.child(2);
```

Accessing the parent element
```
let child = _find('.child');

let parent = child.parent();
let parentOfParent = child.parent(2);
let parentOfParentOfParent = child.parent(3);
```

siblings
```
if(element.hasNextSibling()){
  let nextSibling = element.nextSibling();
}

if(element.hasPrevSibling()){
  let prevSibling = element.prevSibling();
}
```


Still in process...
