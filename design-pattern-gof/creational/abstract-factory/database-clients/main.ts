import { MongoDatabaseFactory } from "./factories/mongo-database-factory";
import { MysqlDatabaseFactory } from "./factories/mysql-database-factory";
import { PostgresDatabaseFactory } from "./factories/postgres-database-factory";
import { ReportingService } from "./services/reporting-service";

const postgresReporting = new ReportingService(new PostgresDatabaseFactory());
const mysqlReporting = new ReportingService(new MysqlDatabaseFactory());
const mongoReporting = new ReportingService(new MongoDatabaseFactory());

postgresReporting.generateActiveUsersReport();
mysqlReporting.generateActiveUsersReport();
mongoReporting.generateActiveUsersReport();
