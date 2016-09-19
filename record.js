var _ = require('underscore');
var Animal = require('./animal');
var lineBreak = '\n';

var Record = function(id, data){
  this.id = id;
  this.data = data;
  this.date = null;
  this.animals = [];
  this.setupData();
};
Record.prototype.setupData = function () {
  var self = this;
  var datas = _.filter(this.data.split(lineBreak), function(ele){
    return ele.trim() != "";
  });

  this.date = datas[0];
  _.each(_.rest(datas), function(value, index){
    self.animals.push(Animal.init(self.id, value));
  });
};

exports.init = function(id, data){
  return new Record(id, data);
};
