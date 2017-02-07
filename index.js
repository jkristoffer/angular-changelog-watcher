const r = require('request');
const c = require('crypto');
const fs = require('fs');

const cksum = './checksum.txt';
const url = "https://raw.githubusercontent.com/angular/angular.js/master/CHANGELOG.md";

module.exports = function( didChange ) {
   const hash = c.createHash('sha256');
   const reqStream = r(url);

   hash.setEncoding('hex')
   reqStream.on('end', () => {
      hash.end();
      getCurrentChecksum( str => {
         const h = hash.read();
         if(h !== str) {
            writeNewChecksum(h);
            didChange(true);
         } else {
            didChange(false);
         }
      });
      console.log(hash.read());
   });

   reqStream.pipe(hash);
}

function getCurrentChecksum(callback){
   fs.readFile(cksum, 'utf8', (err,data) => {
      if(err) console.error(data);
   });
}

function writeNewChecksum(h){
   fs.writeFile(cksum, h, err => {
      if(err) { console.error(err) }
   });
}
