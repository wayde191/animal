var Animal = function(id, data, step){
  this.id = id;
  this.data = data;
  this.name = null;
  this.x = 0;
  this.y = 0;
  this.h = 0;
  this.xOffset = 0;
  this.yOffset = 0;
  this.hOffset = 0;
  this.firstTime = false;
  this.prevNode = null;
  this.nextNode = null;
  this.step = step;
  this.setupData();
};

Animal.prototype.setupData = function () {
  var datas = this.data.split(' ');
  this.name = datas[0];
  this.x = parseInt(datas[1]);
  this.y = parseInt(datas[2]);
  this.h = parseInt(datas[3]);
  this.firstTime = true;
  if(datas.length > 4){
    this.xOffset = parseInt(datas[3]);
    this.yOffset = parseInt(datas[4]);

    this.h = parseInt(datas[5]);
    this.hOffset = parseInt(datas[6]);
    this.firstTime = false;
  }
};

Animal.prototype.setupChain = function(prev, next) {
  this.prevNode = prev;
  this.nextNode = next;
}

Animal.prototype.getPathEndPoint = function(){
  return this.firstTime ?
  {x: this.x, y: this.y, h:this.h} :
  {x: (this.x + this.xOffset), y: (this.y + this.yOffset), h: (this.h + this.hOffset)}
};

exports.init = function(id, data, step){
  return new Animal(id, data, step);
};
