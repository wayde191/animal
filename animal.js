var Animal = function(id, data){
  this.id = id;
  this.data = data;
  this.name = null;
  this.x = null;
  this.y = null;
  this.xOffset = null;
  this.yOffset = null;
  this.firstTime = false;
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
Animal.prototype.getPathEndPoint = function(){
  return this.firstTime ? {x: this.x, y: this.y} : {x: (this.x + this.xOffset), y: (this.y + this.yOffset)}
};

exports.init = function(id, data){
  return new Animal(id, data);
};
