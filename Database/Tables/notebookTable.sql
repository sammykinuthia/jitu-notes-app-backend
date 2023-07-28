-- CREATE DATABASE Notebook;
GO
use Notebook;
GO

CREATE OR ALTER TABLE notes(
    id VARCHAR(200) PRIMARY KEY,
    title VARCHAR(200) NOT null,
    content VARCHAR(MAX) NOT null,
    created_at DATE 

)
