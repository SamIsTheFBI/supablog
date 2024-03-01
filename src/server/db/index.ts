import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"

const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 })
migrate(drizzle(migrationClient), './drizzle')

const queryClient = postgres('postgresql://user:password@localhost:5432/s3-app')
const db = drizzle(queryClient)

export default db
