# CS4098 Team 3: API Server

This server provides an interface to read and write data to the SQL database.

Related repositories:
* [Client](https://github.com/inglec/cs4098-team3-web-app)
* [Video Server](https://github.com/inglec/cs4098-team3-video-server)

## Installation

Update packages:
``` bash
sudo apt update
sudo apt -y upgrade
```

Install Node.js and NPM:

``` bash
sudo apt install nodejs
```

Clone the repository:
``` bash
git clone https://github.com/inglec/cs4098-team3-api-server api-server
```

Install dependencies specified in `package.json`:
``` bash
npm install
```

### Database Setup

Install MySQL server and set the `root` password:
``` bash
sudo apt install mysql-server
```

Update the `password` field in `sql_config.json` with this password so that the API server can access the DB:
``` json
{
  "dialect": "mysql",
  "host": "localhost",
  "database": "tbtogetherdb",
  "users": {
    "root": { "password": <PASSWORD> }
  }
}
```

Create the database using the following commands:
``` bash
# Create database
mysql -u root -p -Bse "
  CREATE DATABASE IF NOT EXISTS tbtogetherdb;
  USE tbtogetherdb;
"

# Run setup script for new database
mysql -u root -p tbtogetherdb < setup/TbTogetherDB.sql
```

## Scripts

`package.json` defines scripts which perform common tasks.

### Serving

The server is run with [nodemon](https://nodemon.io/), which monitors the file tree and restarts the server when file modifications are detected. This mode should only be used for development, **not production**.

Run the server:
``` bash
npm start
```

#### Debugging

In order to view the outputs of `logger.debug` statements, you need to set the `DEBUG` environment variable to a comma-separated list of logger names.

**Example:** Show the debug output of all `tt` (Treatment Together) loggers:
``` bash
DEBUG=tt* npm start
```

### Linting

The repository is set up to follow the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/blob/master/README.md).

Run linting:
``` bash
npm run lint
```

If you use Atom, the [linter-eslint](https://atom.io/packages/linter-eslint) package shows linting errors in real-time in the editor.

### Testing

[Jest](https://jestjs.io/en/) is used to test both the API endpoints and SQL queries.

Run tests:
``` bash
npm test
```

# Database

## Tables

### Users

| userId   | name     | userType | avatarUrl | phone    | email    | bio      |
| -------- | ----     | -------- | --------- | -------- | -------- | -------- |
| `string` | `string` | `string` | `string`  | `string` | `string` | `string` |

Constraints:
* `userType`: one of `patient`, `admin`, `mentor`

### Groups

Columns:

| groupId  | groupName | adminId  |
| -------- | --------- | -------- |
| `string` | `string`  | `string` |

Primary key: `groupId`

Foreign keys:
* `adminId` -> `Users`


### GroupMentors

**Don't implement**

| groupId  | mentorId |
| -------- | -------- |
| `string` | `string` |

Foreign keys:
* `mentorId` -> `Users`

### GroupUsers

Columns:

| groupId  | userId   |
| -------- | -------- |
| `string` | `string` |

Primary key: `groupId` + `userId`

Foreign keys:
* `userId` -> `Users`

### Room

Columns:

| roomId   | groupId  | startTime | endTime   |
| -------- | -------- | --------- | --------- |
| `string` | `string` | `integer` | `integer` |

Primary key: `roomId`

Foreign keys:
* `groupId` -> `Groups`

### RoomAttendance

| roomId   | userId   | joinedAt  | leftAt    | tickedAt  |
| -------- | -------- | --------- | --------- | --------- |
| `string` | `string` | `integer` | `integer` | `integer` |

Primary key: `roomId` + `userId`

Foreign keys:
* `userId` -> `Users`

### WhitelistedIps

| userId   | ip       |
| -------- | -------- |
| `string` | `string` |

Primary key: `userId` + `ip`

## Authorisation

| User Type | Table          | Columns | Rows                             |
| --------- | -------------- | ------- | -------------------------------- |
| Admin     | Groups         | *       | *                                |
| Admin     | GroupMentors   | *       | *                                |
| Admin     | GroupUsers     | *       | *                                |
| Admin     | Room           | *       | *                                |
| Admin     | RoomAttendance | *       | *                                |
| Admin     | WhitelistedIps | *       | *                                |
| Mentor    | Groups         | *       | Groups mentor is in              |
| Mentor    | GroupMentors   | *       | Groups mentor is in              |
| Mentor    | GroupUsers     | *       | Groups mentor is in              |
| Mentor    | Room           | *       | Rooms where mentor is in group   |
| Mentor    | RoomAttendance | -       | -                                |
| Mentor    | WhitelistedIps | -       | -                                |
| Patient   | Groups         | *       | Groups patient is in             |
| Patient   | GroupMentors   | *       | Groups patient is in             |
| Patient   | GroupUsers     | *       | Groups patient is in             |
| Patient   | Room           | *       | Rooms where patient is in group  |
| Patient   | RoomAttendance | -       | -                                |
| Patient   | WhitelistedIps | -       | -                                |
