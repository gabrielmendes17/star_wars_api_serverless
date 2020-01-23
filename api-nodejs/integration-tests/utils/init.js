'use strict';

const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';


function init() {
    process.env.GREETER_DYNAMODB_TABLE = 'sls-unit-test-names-table';
    process.env.BASE_URL = 'https://y8wvpi7o2d.execute-api.us-east-1.amazonaws.com/dev/planets';
}

module.exports = init;