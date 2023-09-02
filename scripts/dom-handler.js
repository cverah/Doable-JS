const DOMHandler = (function (parentSelector) {
  const parent = document.querySelector(parentSelector);
  if (!parent) throw new Error("Not Parent Found");
  return {
    module: null,
    load(module) {
      this.module = module;
      parent.innerHTML = module;
      module.addListeners();
    },
    reload() {
      this.load(this.module);
    },
  };
})("#root");

/* 
Template Module
const Main={
  toString(){
    return "<h2>hola mundo</h2>"
  },
  addListeners(){

  }
}
export {Main}
*/
export default DOMHandler;
