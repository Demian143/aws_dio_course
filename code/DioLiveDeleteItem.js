'use strict';

const AWS = require('aws-sdk');
// const AWS = require(aws-sdk);

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = '';
    let statusCode = 0;

    // const {id, tableName, itemPrice} =  JSON.parse(event.body);

    const params = {
        TableName: "Item",
        Key: {
            id: 'item-01',
        }
    }

    try {

        const data = await documentClient.delete(params).promise();
        responseBody = JSON.stringify(data.Items);
        statusCode = 201;

    } catch (err) {

        responseBody = `Falha ao listar items ${err}`;
        statusCode = 403;

    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body: responseBody
    };

    return response;
}