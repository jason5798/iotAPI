var dbUtil =  require('./dbUtil.js');

var mapObj = {
    "selector": {
     "category": "map"
      }
   };

   var mapObj2 = {
    "selector": {
       "category": "map"
    }
 };

module.exports = {
    create,
    findLast,
    find,
    update,
    remove
}

function findLast(json){
    var myobj = JSON.parse(JSON.stringify(mapObj2));
    myobj.selector.deviceType = json.deviceType;
    myobj.limit = 1;
    return new Promise(function (resolve, reject) {
        dbUtil.queryDoc(myobj).then(function(value) {
            var map = null;
            if(value.docs.length > 0){
                map = value.docs[0];
            }
            resolve(map);
        }, function(reason) {
            reject(reason);
        });
    })
}

function find(json){
    var myobj = JSON.parse(JSON.stringify(mapObj2));
    if (json.deviceType) {
        myobj.selector.deviceType = json.deviceType;
    }
    return new Promise(function (resolve, reject) {
        dbUtil.queryDoc(myobj).then(function(value) {
            var deviceList = [];
            if(value.docs.length > 0){
                deviceList = value.docs;
            }
            resolve(deviceList);
        }, function(reason) {
            reject(reason);
        });
    })
}

function create(json){
    json.category = 'map';
    json.createTime  = new Date();
    json.updateUser  = null,
    json.updateTime  = null,
    json.profile     = null
    return new Promise(function (resolve, reject) {
        dbUtil.insert(json).then(function(value) {
            // on fulfillment(已實現時)
            console.log("#### Insert map success :"+value);
            resolve(value);
        }, function(reason) {
            console.log("???? Insert map fail :" + reason);
            reject(reason);
        }); 
    })
}
  
function remove(json){
    var myobj = JSON.parse(JSON.stringify(mapObj)); 
    myobj.selector.deviceType = json.deviceType;
    console.log('delProfile myobj : ' + JSON.stringify(myobj));
    return new Promise(function (resolve, reject) {
        dbUtil.queryDoc(myobj).then(function(value) {
            var mapList = [];
            if(value.docs.length > 0){
                mapList = value.docs;
            }
            var mapDoc;
            if( mapList.length > 0) {
                mapDoc = mapList[0];
                dbUtil.removeDoc(mapDoc._id, mapDoc._rev).then(function(value) {
                    resolve('ok');
                }, function(reason) {
                    reject(reason);
                }); 
            } else {
                reject('Can not find map');
            }
            
          }, function(reason) {
            reject(reason);
          });
    })
}
  
function update(condition, json){
    var myobj = JSON.parse(JSON.stringify(mapObj)); 
    myobj.selector.deviceType = condition.deviceType;
    console.log('updateZone myobj : ' + JSON.stringify(myobj));
    return new Promise(function (resolve, reject) {
        dbUtil.queryDoc(myobj).then(function(value) {
            var mapList = [];
            if(value.docs.length > 0){
                mapList = value.docs;
            }
            var mapDoc = mapList[0];
            console.log('mapDoc._id : ' + mapDoc._id)
            //zone.deviceList = newZone.deviceList;
            if (json.fieldName) {
                mapDoc.fieldName =  json.fieldName;
            }
            if (json.map) {
                mapDoc.map =  json.map;
            }
            if (json.typeName) {
                mapDoc.typeName =  json.typeName;
            }
            if (json.profile) {
                mapDoc.profile = json.profile;
            }
            dbUtil.insert(mapDoc).then(function(value) {
                // on fulfillment(已實現時)
                console.log("#### Update zone success :"+ JSON.stringify(value));
                resolve(value);
            }, function(reason) {
                // on rejection(已拒絕時)
                console.log("???? Update zone fail :" + reason);
                reject(reason);
            });
        }, function(reason) {
            reject(reason);
        }); 
    })
}