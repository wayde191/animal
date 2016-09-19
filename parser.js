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
    recs.push(Record.init(ids[index], value, index));
  });

  return recs;
};

function buildRecordsRelationship() {
  var theData = getTracks();
  var tracks = theData.tracks;
  var names = theData.names;

  _.each(names, function(name, index) {
    _.each(records, function(record, index) {
      var prevRecord = (0 === index ? null : records[index - 1]);
      var prevAnimal = prevRecord === null ? null : prevRecord.getAnimalByName(name);
      var nextRecord = (records.length === (index + 1) ? null : records[index + 1]);
      var nextAnimal = nextRecord === null ? null : nextRecord.getAnimalByName(name);

      var currentAnimal = record.getAnimalByName(name);
      if(currentAnimal){
        currentAnimal.setupChain(prevAnimal, nextAnimal);
      }

    });
  });
}

function initData(data){
  ids = data.match(reg);
  records = toJson(data);
  buildRecordsRelationship();

  return {
    ids: ids,
    records: records
  };
};


function getTracks(){
  var tracks = {};
  var names = [];

  _.each(records, function(record, index){
    _.each(record.animals, function(animal, index){
      if ( tracks[animal.name] === undefined ){
        names.push(animal.name);
        tracks[animal.name] = [];
      }
      tracks[animal.name].push(animal);
    });
  });

  return {tracks: tracks, names: names};
};

function getSnapshot(id){
  var theData = getTracks();
  var tracks = theData.tracks;
  var names = theData.names;
  var theStep = _.indexOf(ids, id);

  var endPoints = {};
  _.each(names, function(name){
    endPoints[name] = {x:0, y:0};
    var currentNode = _.first(tracks[name]);
    while( currentNode != null && currentNode.step <= theStep ){
      endPoints[name]['x'] = currentNode.x + currentNode.xOffset;
      endPoints[name]['y'] = currentNode.y + currentNode.yOffset;
      currentNode = currentNode.nextNode;
    }
  });

  var outputStr = '';
  _.each(names, function(name, index) {
    outputStr += name + ' ' + endPoints[name]['x'] + ' ' + endPoints[name]['y'] + '\n';
  });

  return outputStr;
};

function doValidate(){
  var result = true;
  var tracks = {};
  var names = [];
  var message = '';

  var theData = getTracks();
  tracks = theData.tracks;
  names = theData.names;

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

exports.parser = {
  initData: initData,
  doValidate: doValidate,
  getSnapshot: getSnapshot
};
