var config = {};

config.port = 8000;

//Authentication
config.auth = false;

//Base Url
config.baseurl = '/v1/';

//Myaql Database
config.database = 'cloudb';
config.dbHost = 'localhost';
config.username = 'root';
config.password = '12345678';
// config.username = 'admin';
// config.password = 'gemtek12345';
config.table_prefix = 'api_';
config.dbPort = 3306;
//Key
config.tokenKey = 'gemtektoken';
config.generalKey = 'gemtek';
//Mongo Database
config.mongoDB = 'mongodb://localhost/agri';
//Pagination
config.paginate = false;
config.page_limit = 5000;
config.sort = 'desc';
//Zone
config.timezone = 'Asia/Taipei';
//Debug
config.debug = true;
config.isLocalDB = true;
config.isAgri = true;
//Server
config.server = 'http://localhost:'+ config.port + '/';
//MQTT
config.mqttHost = 'localhost';
config.mqttPort = 1883;
config.mytopic = 'GIOT-GW/UL/+';
config.mqttName = 'gemtek';
config.mqttPassword = 'gemtek1234ost5';
//line-bot
config.channelId = '';
config.channelSecret = '';
config.channelAccessToken = '';
//Is cloudant DB true, is local mongoDB false
config.isCloudantDb = true;
//Cloudant DB
config.cloudantAccount = '';
config.cloudantPassword = '';
module.exports = config;
