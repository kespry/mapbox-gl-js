var AWS = require('aws-sdk');
var fs = require('fs');
var path = require('path')

var S3Sync = function S3Sync() {
  this.bucketName = "kespry-corona-prod";
};

S3Sync.prototype.uploadFile = function(filePath) {
  var basename = path.basename(filePath);
  var body = fs.createReadStream(filePath);
  var s3obj = new AWS.S3({
    params: {
      Bucket: this.bucketName,
      Key: basename,
      ACL: 'public-read',
      ContentDisposition: "inline",
    }
  });
  s3obj.upload({Body: body}, (err, data) => {
    console.log("HI")
    if(err) {
      console.log(err);
      return;
    }
  });
};


var s3Sync = new S3Sync();
var fullPath = path.resolve("./dist/mapbox-gl.js");
s3Sync.uploadFile(fullPath)
