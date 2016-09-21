var processer = require('./parser');
var read = require('read-file');
var file = 'heart.json';

read(file, 'utf8', function(err, buffer){
  var parsedData = processer.parser.initData(buffer.trim());
  var res = processer.parser.doValidate();

  if (true === res.result) {
    var snaps = processer.parser.getSnapshot(parsedData.ids[2]);
    console.log("Result: =====================================");
    console.log(snaps);
  } else {
    console.log(res.message);
  }

});
