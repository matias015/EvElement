class ElementList {

  constructor() {
    this.list = []
  }

  whereClass(clss, cb) {
    let elements = document.querySelectorAll('.' + clss)
    for (element of elements) {
      this.list.push(new ElementEv(element, true))
    }
    return this
  }

  whereId(id, cb) {
    let elements = document.querySelectorAll('#' + id)
    for (element of elements) {
      this.list.push(new ElementEv(element, true))
    }
    return this
  }

  whereTag(tag, cb) {
    let elements = document.querySelectorAll(tag)
    for (element of elements) {
      this.list.push(new ElementEv(element, true))
    }
    return this
  }

  whereProp(values, cb) {
    this.element = document.querySelectorAll(`[${values[0]}=${values[1]}]`)
    for (element of elements) {
      this.list.push(new ElementEv(element, true))
    }
    return this
  }
  
  when(ev) {
    this.elements.forEach(function(e){
      this.when(ev)
    })
    return this
  }

  make(cb) {
    this.element.addEventListener(this.lastEventSetted, function(e) {
      e.element = new ElementEv(e.target, true)
      cb(e)
    })
    return this
  }


}
