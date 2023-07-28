use Notebook;
GO
CREATE OR ALTER PROC uspGetNotes
AS
BEGIN
    SELECT *
    FROM notes
END;
    GO


CREATE OR ALTER PROCEDURE uspGetNote
    (@id VARCHAR(200))
AS
BEGIN
    SELECT *
    FROM notes
    WHERE id = @id
END;
    GO

CREATE OR ALTER PROC uspDeleteNote(@id VARCHAR(200))
AS
BEGIN
    DELETE FROM notes
        WHERE id = @id
END;
    GO

CREATE OR ALTER PROC uspUpdateNote(@id vARCHAR(200),
    @title vARCHAR(200),
    @content vARCHAR(600))
AS
BEGIN
    UPDATE notes
        SET title = @title, content=@content
        WHERE id = @id;
    SELECT *
    FROM notes
    WHERE id = @id;
END;
    GO

CREATE OR ALTER PROC uspCreateNote(@id VARCHAR(200),
    @title VARCHAR(200),
    @content VARCHAR(600),
    @createdAt DATE)
AS
BEGIN
    INSERT INTO notes
    VALUES(@id, @title, @content, @createdAt);
    SELECT *
    FROM notes
    WHERE id = @id;

END;
    GO

-- INSERT INTO notes (id, title, content, created_at)
-- VALUES
-- ('b','great topic','interestinfgsvdhvsj','2023-07-01')

EXEC uspGetNotes 