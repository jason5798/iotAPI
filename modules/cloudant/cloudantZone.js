var dbUtil =  require('./dbUtil.js');

var zoneObj = {
    "selector": {
       "category": "zone"
    },
    "fields": [
       "_id",
       "name",
       "deviceList",
       "create"
    ],
    "sort": [
       {
          "create": "asc"
       }
    ]
 };
var zoneObj2 = {
    "selector": {
      "category": "zone"
      }
};

   module.exports = {
    addZone,
    delZone,
    updateZone,
    findZoneList
  }

  function addZone(json,callback){
    json.category = 'zone';
    json.create = new Date();
    dbUtil.insert(json).then(function(value) {
        // on fulfillment(已實現時)
        console.log("#### Insert zone success :"+value);
        return callback('ok');
    }, function(reason) {
        console.log("???? Insert zone fail :" + reason);
        return callback('fail');
    }); 
  }
  
  function delZone(name,callback){
    var myobj = JSON.parse(JSON.stringify(zoneObj2)); 
    myobj.selector.name = name;
    console.log('delProfile myobj : ' + JSON.stringify(myobj));
    dbUtil.queryDoc(myobj).then(function(value) {
      var zoneList = [];
      if(value.docs.length > 0){
        zoneList = value.docs;
      }
      var zone = zoneList[0];
      dbUtil.removeDoc(zone._id,zone._rev).then(function(value) {
        return callback('ok');
      }, function(reason) {
        return callback(reason);
      }); 
    
    }, function(reason) {
      return callback(reason);
    }); 
  }
  
  function updateZone(newZone,callback){
    var myobj = JSON.parse(JSON.stringify(zoneObj2)); 
    myobj.selector.name = newZone.name;
    console.log('updateZone myobj : ' + JSON.stringify(myobj));
    
    dbUtil.queryDoc(myobj).then(function(value) {
      var zoneList = [];
      if(value.docs.length > 0){
        zoneList = value.docs;
      }
      var zone = zoneList[0];
      console.log('zone._id : ' + zone._id)
      zone.deviceList = newZone.deviceList;
      dbUtil.insert(zone).then(function(value) {
        // on fulfillment(已實現時)
        console.log("#### Update zone success :"+ JSON.stringify(value));
        return callback('ok');
      }, function(reason) {
        // on rejection(已拒絕時)
        console.log("???? Update zone fail :" + reason);
        return callback(reason);
      });
    }, function(reason) {
      return callback(reason);
    }); 
  }
  
  function findZoneList(sort, callback){
    if (sort) {
      zoneObj.sort = sort;
    }
    dbUtil.queryDoc(zoneObj).then(function(value) {
        var profileList = [];
        if(value.docs.length > 0){
          profileList = value.docs;
        }
        return callback(null,profileList);
      }, function(reason) {
        return callback(reason);
      });
  }