var _ = require('underscore');
var Record = require('./record.js');
var records = [];
var ids = null;
var reg = /[a-z|0-9]{8}-[a-z|0-9]{4}-[a-z|0-9]{4}-[a-z|0-9]{4}-[a-z|0-9]{12}/g;
var placeHolder = '##########====##########';

function toJson(data){
  datas = _.filter(data.replace(reg, placeHolder).split(placeHolder), function(ele){
    return ele.trim() != "";
  });

  var recs = [];
  _.each(datas, function(value, index){
    recs.push(Record.init(ids[index], value));
  });

  return recs;
};

function initData(data){
  ids = data.match(reg);
  records = toJson(data);

  return {
    ids: ids,
    records: records
  };
};

function doValidate(){
  var result = true;
  var tracks = {};
  var names = [];
  var message = '';

  _.each(records, function(record, index){
    _.each(record.animals, function(animal, index){
      if ( tracks[animal.name] === undefined ){
        names.push(animal.name);
        tracks[animal.name] = [];
      }
      tracks[animal.name].push(animal);
    });
  });

  _.each(names, function(name, index){
    var paths = tracks[name];
    _.each(paths, function(path, index){
      if(path.firstTime === false){
        var prePath = paths[index - 1];
        var preEndPoint = prePath.getPathEndPoint();
        if(false === (path.x === preEndPoint.x && path.y === preEndPoint.y)){
          result = false;
          message = "Confict found at " + path.id;
          return;
        }
      }
    });
  });

  return {result: result, message: message};
};

function getIds() {
  return ids;
};

function getRecords() {
  return records;
}

exports.parser = {
  getIds: getIds,
  getRecords: getRecords,
  initData: initData,
  doValidate: doValidate
};
