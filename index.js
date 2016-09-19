var processer = require('./parser');
var read = require('read-file');
var file = 'data.json';

read(file, 'utf8', function(err, buffer){
  var parsedData = processer.parser.initData(buffer.trim());
  var res = processer.parser.doValidate();

  if (true === res.result) {
    processer.parser.getSnapshot(historyData, id);
  } else {
    console.log(res.message);
  }

});
