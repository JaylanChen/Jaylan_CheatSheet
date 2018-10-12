DECLARE
    @spid INT
   ,@bl INT
DECLARE s_cur CURSOR
FOR
    SELECT
        0
       ,blocked
    FROM
        ( SELECT
            *
          FROM
            sys.sysprocesses
          WHERE
            blocked > 0
        ) a
    WHERE
        NOT EXISTS ( SELECT
                        *
                     FROM
                        ( SELECT
                            *
                          FROM
                            sys.sysprocesses
                          WHERE
                            blocked > 0
                        ) b
                     WHERE
                        a.blocked = spid )
    UNION
    SELECT
        spid
       ,blocked
    FROM
       sys.sysprocesses
    WHERE
        blocked > 0
OPEN s_cur
FETCH NEXT FROM s_cur INTO @spid, @bl
WHILE @@FETCH_STATUS = 0
    BEGIN
        IF @spid = 0
            SELECT
                '引起数据库死锁的是:
' + CAST(@bl AS VARCHAR(10)) + '进程号,其执行的SQL语法如下'
        ELSE
            SELECT
                '进程号SPID：' + CAST(@spid AS VARCHAR(10)) + '被' + '
进程号SPID：' + CAST(@bl AS VARCHAR(10)) + '阻塞,其当前进程执行的SQL语法如下'
        DBCC INPUTBUFFER (@bl )
        FETCH NEXT FROM s_cur INTO @spid, @bl
    END
CLOSE s_cur
DEALLOCATE s_cur
