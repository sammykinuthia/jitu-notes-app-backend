# Notes App Backend
The app performs all the CRUD operations. The records are stored in MSSQL database, the sql querries are invoked as stored procedures. The code is written in nodejs using module type to leverage the power of  ECMA 6 instead of common js

## Get started

### Clone the repo
`git clone https://github.com/sammykinuthia/jitu-notes-app-backend.git`

### Execute the following commands

`cd jitu-notes-app-backend`

installs all the dependencies
`npm i`

### Set up
- Make sure to have an mssql server running
- Create a database *Notebook*

`CREATE DATABASE Notebook`

- Create a `*.env*` file
- Update feed it with your db configuration credentials
- Then execute the sql found in the ` Database/Tables/notebookTable.sql ` This creates the table required
- Then execute the stored procedures in the `Database/Procedures/notebookProcedures.sql` to create them in your database
- then run the server

  `node server`
