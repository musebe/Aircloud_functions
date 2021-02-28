require('dotenv').config();
const { table } = require('./utils/airtable');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
};

exports.handler = async (event) => {
  try {
    const records = await table.select({}).firstPage();
    const formattedRecords = records
      .map((record) => ({
        id: record.id,
        ...record.fields,
      }))
      .filter((record) => !!record.imgId);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(formattedRecords),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ err: 'Failed to upload image' }),
    };
  }
};
