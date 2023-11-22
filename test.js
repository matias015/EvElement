const evButton = _find('#ev')
// const cloneButton = _find('#clone')
const newButton = _find('#new')

const iter = 30000;

// cloneButton.when('click', function(){
//     const ul = _find('ul')

//     ul.createChild('<li>')
//         .withClasses('misma_clase')
//         .withAttrs({'name':'mismo_name'})

//     for(let i=0;i<=iter;i++){
//         console.log(2);
//        ul.cloneLast().withAttrs({'value':i}).withText(i)
//     }

//     ul.insert()
// })

evButton.when('click', function(){
    const ul = _find('ul')

    ul.createChild('li').withChildren([
        create('a').attr('href','https://www.google.com').setText('google'),
        create('a').attr('href','https://www.youtube.com/').setText('youtube'),
    ]).withStyle({
        'display':'flex',
        'flexDirection':'column'
    })

    ul.insert()
})


newButton.when('click', function(){
   
})

setTimeout(function(){
    console.log('start');
    let value = _find('input').value()
    console.log('value is: ' + value);

    if(value==1){
       
        let ul = _find('ul')

        element().whereTag('li',function(){
            console.log(32);
            return create('<li>','this content').insertInto(ul)
        })

    }else if(value==2){

        // case 2   

    }

}, 3000)
    