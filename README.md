Small library to deal with elements


 - Searching an element

```
new ElementEv(String query)
```
Creating an object with an loaded element

new ElementEv(document.querySelector(query), true)


_find(String id|class|tag);

element().whereClass(String class, Callable callback);

element().whereId(String id, Callable callback);

element().whereTag(String tagname, Callable callback);

element().whereProp(Array propValue, Callable callback);

you can set a parent where the search would be perform

element().inParent(String identifier|HTMLElement parent).whereClass(String class);


setting events

let button = _find('.my-button');

button.when('click').make(function(e){
    let clicked = e.element; // returns the EvElement of the target 
})

Another way

button.when('click', function(e){
    let clicked = e.element; // returns the EvElement of the target 
})


unsetting events

button.unsetEvent('click');


ATRIBUTTES

text content

button.setText('Click me');

if(button.textIs('click')){
    console.log('that is true!');
}

button.clear() // this will clear all the content, not only text, also nodes.


ADDING CHILDS TO ELEMENTS

myDiv.appendChild('<p>')
    .withText('text content')
    .withClasses(['class1','class2'])
    .withChildren([
        create('<span>').setText('span text').attr('id','myId'),
        create('<span>').setText('span text 2').attr('id','myId2')
    ])
    .insert()

final result is

<div>
    <p class="class1 class2">
        'text content'
        <span id="myId">span text</span>
        <span id="myId2">span text 2</span>
    </p>
</div>



