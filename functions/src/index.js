const sql = require('mssql');

module.exports = async function (context, req) {
    // Connection configuration
    const config = {
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        server: process.env.SQL_SERVER,
        database: process.env.SQL_DATABASE,
        options: {
            encrypt: true, // Use encryption
            enableArithAbort: true // Recommended for SQL Server
        }
    };

    try {
        // Connect to the database
        await sql.connect(config);

        // Query the database
        const result = await sql.query`SELECT classID, class_name FROM Classes`;

        context.res = {
            status: 200,
            body: result.recordset
        };
    } catch (err) {
        context.log.error('Error retrieving data from SQL Database:', err);
        context.res = {
            status: 500,
            body: 'Error retrieving data'
        };
    } finally {
        sql.close();
    }
};
