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

You can set a parent where the search would be perform
```
element().inParent('.class-of-parent').whereClass('class-of-element');

or

let parent = _find('.my-parent-class');
element().inParent(parent).whereClass('class-of-element');

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

- append childs to elements
```
let myDiv = _find('.my-div');

myDiv.createChild('<p>')
    .withText('text content')
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

