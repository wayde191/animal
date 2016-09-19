var _ = require('underscore');
var Animal = require('./animal');
var lineBreak = '\n';

var Record = function(id, data, step){
  this.id = id;
  this.data = data;
  this.date = null;
  this.animals = [];
  this.step = step;
  this.setupData();
};

Record.prototype.setupData = function () {
  var self = this;
  var datas = _.filter(this.data.split(lineBreak), function(ele){
    return ele.trim() != "";
  });

  this.date = datas[0];
  _.each(_.rest(datas), function(value, index) {
    self.animals.push(Animal.init(self.id, value, self.step));
  });
};

Record.prototype.getAnimalByName = function(name) {
  return _.find(this.animals, function(animal, index) {
    return animal.name === name;
  });
}

exports.init = function(id, data, step){
  return new Record(id, data, step);
};
