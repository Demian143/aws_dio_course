'use strict';

const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = '';
    let statusCode = 0;

    const { id } = JSON.parse(event.body);

    const params = {
        TableName: "Item",
        Key: {
            id: id,
        }
    }

    try {

        const data = await documentClient.delete(params).promise();
        responseBody = JSON.stringify(data.Items);
        statusCode = 201;

    } catch (err) {

        responseBody = `Falha ao deletar item ${err}`;
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