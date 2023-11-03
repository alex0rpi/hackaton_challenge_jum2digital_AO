const mysqlConfig = {
  host: process.env.MYSQL_HOST || '127.0.0.1',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PWD,
  name: process.env.MYSQL_NAME || 'skinapi',
  port: process.env.MYSQL_PORT || 3306,
};

export default mysqlConfig;
