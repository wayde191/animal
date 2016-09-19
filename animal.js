var Animal = function(id, data, step){
  this.id = id;
  this.data = data;
  this.name = null;
  this.x = 0;
  this.y = 0;
  this.xOffset = 0;
  this.yOffset = 0;
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
  this.firstTime = true;
  if(datas.length > 3){
    this.xOffset = parseInt(datas[3]);
    this.yOffset = parseInt(datas[4]);
    this.firstTime = false;
  }
};

Animal.prototype.setupChain = function(prev, next) {
  this.prevNode = prev;
  this.nextNode = next;
}

Animal.prototype.getPathEndPoint = function(){
  return this.firstTime ? {x: this.x, y: this.y} : {x: (this.x + this.xOffset), y: (this.y + this.yOffset)}
};

exports.init = function(id, data, step){
  return new Animal(id, data, step);
};
