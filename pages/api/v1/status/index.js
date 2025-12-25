import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const databaseName = process.env.POSTGRES_DB;

  const result = await database.query({
    text: `
      SELECT 
        current_setting('max_connections')::int as max_connections,
        current_setting('server_version') as server_version,
        (SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1) as opened_connections;
    `,
    values: [databaseName],
  });

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: result.rows[0].server_version,
        max_connections: result.rows[0].max_connections,
        opened_connections: result.rows[0].opened_connections,
      },
    },
  });
}

export default status;
