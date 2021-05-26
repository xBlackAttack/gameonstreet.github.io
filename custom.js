
class MyCustomControl {
    onAdd(map){
        this._map = map;
        this._button = document.createElement('div');
        this._button.className = 'question-top-left';
        this._button.onclick = function () {
          window.open('http://www.gameonstreet.com', '_blank');
        }
        return this._button;
    }

    onRemove(){
      this._button.parentNode.removeChild(this._button);
      this._map = undefined;
    }
}

map.addControl(new MyCustomControl('question-top-left'));

//const myCustomControl = new MyCustomControl();
//map.addControl(myCustomControl);