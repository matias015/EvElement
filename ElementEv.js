class ElementEv {

  constructor(tag, exists) {
    if (exists) {
      this.element = tag
    }
    else if (tag) {
      this.element = document.createElement(tag)
    } else {
      this.element = null
    }
    this.lastEventSetted = null

    this.prevSib = null
    this.nextSib = null

    this.lastElementCreated = null
    this.fragment = document.createDocumentFragment()

    this.interceptObject = null
  }

  create(tag) {
    this.element = document.createElement(tag)
    return this
  }

  // SEARCHING
  whereClass(clss, cb) {
    this.element = document.querySelector('.' + clss)
    if (cb && !this.element) {
      this.element = cb()
    }
    return this
  }

  whereId(id, cb) {
    this.element = document.querySelector('#' + id)
    if (cb && !this.element) {
      this.element = cb()
    }
    return this
  }

  whereTag(tag, cb) {
    this.element = document.querySelector(tag)
    if (cb && !this.element) {
      this.element = cb()
    }
    return this
  }

  whereProp(values, cb) {
    this.element = document.querySelector(`[${values[0]}=${values[1]}]`)
    if (cb && !this.element) {
      this.element = cb()
    }
    return this
  }



  // EVENTS
  when(ev) {
    this.lastEventSetted = ev
    return this
  }

  make(cb) {
    this.element.addEventListener(this.lastEventSetted, function(e) {
      e.element = new ElementEv(e.target, true)
      cb(e)
    })
    return this
  }

  toggle(el, clss) {
    const e = document.querySelector(el)
    this.make(function() {
      e.classList.toggle(clss)
    })
    return this
  }

  interception(cb, obj) {

    var r,
      margin,
      th,
      cb2

    if (!obj) obj = {}
    if (!obj.whilenot) cb2 = false
    else cb2 = true

    r = obj.root || document
    if (typeof r == 'string') r = document.querySelector(r)

    if (!obj.delay) margin = '0px'
    else margin = `${obj.delay * 1.5}px 0px -${obj.delay * 1.5}px 0px`
    th = obj.th || 0.5

    this.interceptObject = new IntersectionObserver(function(ent) {
      ent.forEach(e => {
        if (e.isIntersecting) cb()
        else {
          if (cb2) obj.whilenot()
        }
      })
    }, { root: r, rootMargin: margin, threshold: th })

    this.interceptObject.observe(this.element)
    return this
  }

  endInterception() {
    this.interceptObject.unobserve(this.element)
    return this
  }


  // CONTENT
  setContent(c) {
    this.element.textContent = c
    return this
  }

  contentIs(str) {
    return this.element.textContent == str
  }

  clear() {
    this.element.innerHTML = ''
    return this
  }

  // CHILDS and parents
  createChild(tag) {
    if (!this.fragment) {
      this.fragment = document.createDocumentFragment()
    }

    if (this.lastElementCreated) {
      this.fragment.appendChild(this.lastElementCreated.element)
    }
    if (tag instanceof ElementEv) {
      this.lastElementCreated = tag
    } else {
      this.lastElementCreated = new ElementEv(tag)
    }
    return this
  }

  withContent(c) {
    this.lastElementCreated.setContent(c)
    return this
  }

  insert() {
    if (this.lastElementCreated) {
      this.fragment.appendChild(this.lastElementCreated.element)
      this.lastElementCreated = null
    }
    this.element.appendChild(this.fragment)
    this.fragment = null
    return this
  }

  appendChild(child) {
    //  console.log('insert');
    this.element.appendChild(child.get())
    return this
  }

  withChildren(nodes) {
    if (nodes instanceof Array) {
      const thisCopy = this
      nodes.forEach(function(element) {
        thisCopy.fragment.appendChild(element.get())
      })

      thisCopy.element.appendChild(this.fragment)
      this.fragment = null
      return thisCopy
    }

    this.insert(nodes)
    return this
  }


  lastChild() {
    return new ElementEv(this.element.children[this.element.children.length - 1], true)
  }

  firstChild() {
    return new ElementEv(this.element.children[0], true)
  }

  parent(deep) {
    if (!deep) return new ElementEv(this.element.parentElement, true)

    let parent = this.element.parentElement;
    for (var i = 1; i < deep; i++) {
      parent = parent.parentElement
    }

    return new ElementEv(parent, true)
  }

  hasNextSibling() {
    if (this.get().nextSibling) return true
    else return false
  }

  hasPrevSibling() {
    if (this.get().prevSibling) return true
    else return false
  }

  prevSibling(deep) {
    if (!deep) return new ElementEv(this.element.previousSibling, true)

    let sib = this.element.previousSibling;
    for (var i = 1; i < deep; i++) {
      sib = sib.previousSibling
    }

    return new ElementEv(sib, true)
  }

  nextSibling(deep) {
    if (!deep) return new ElementEv(this.element.nextSibling, true)

    let sib = this.element.nextSibling;
    for (var i = 1; i < deep; i++) {
      sib = sib.nextSibling
    }

    return new ElementEv(sib, true)
  }


  // ELEMENT
  get() {
    return this.element
  }

  value() {
    field = this.element
    if (field.type === 'checkbox') {
      return field.checked;
    } else if (field.type === 'radio') {
      return field.checked;
    } else {
      return field.value;
    }
  }


  valueIs(val) {
    return this.element.value == val
  }

  tagIs(tag) {
    return this.element.tagName == tag.toUpperCase()
  }

  remove() {
    this.element.parentElement.removeChild(this.element)
    return this
  }

  move(to) {
    let el = this.get()
    this.remove()
    to.element.appendChild(el)
    return this
  }


  // CLASSES AND PROPS

  hasClass(clss) {
    return this.element.classList.contains(clss)
  }

  withAttrs(pairs) {
    let copy = this

    if (this.lastElementCreated) {

      Object.entries(pairs).forEach(function(pair) {
        copy.lastElementCreated.setAttribute(pair[0], pair[1])
      })

    } else {

      Object.entries(pairs).forEach(function(pair) {
        copy.element.setAttribute(pair[0], pair[1])
      })

    }
    return copy
  }


  // Others

  print() {
    console.log(this.element.outerHTML);
    return this
  }

  style(css) {
    var el = this.element
    Object.entries(css).forEach(function(p) {
      el.style[p[0]] = p[1]
    })
    //this.element = el
    return this
  }


}

function element(tag) {
  if (tag instanceof HTMLElement) {
    return new ElementEv(tag, true)
  }
  return new ElementEv(tag)
}

function create(tag, content) {
  tag = tag.replace(">", '') //for <
  tag = tag.replace('<', '')


  element = new ElementEv(tag)

  if (content) element.setContent(content)

  return element
}


const button = element().whereId('xd')
const section = element().whereTag('section')
const h1 = element().whereTag('h1')

h1.interception(function() {
  console.log(8);
}, {
  whilenot: () => console.log(9)
})

h1.style({
  'backgroundColor': 'red'
})

button.when('click').make(function() {

  const ul = create('<ul>').withAttrs({ 'class': "item class2" }).withChildren([
    create('<li>', 1),
    create('<li>', 2),
    create('<li>', 3)
  ])

  section.appendChild(ul)


})
