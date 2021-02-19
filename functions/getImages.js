require('dotenv').config();
const { table } = require('./utils/airtable');

exports.handler = async (event,context,callback) => {
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
      body: JSON.stringify(formattedRecords),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ err: 'Failed to upload image' }),
    };
  }
  callback(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 200,
    body: output,
  });
};
