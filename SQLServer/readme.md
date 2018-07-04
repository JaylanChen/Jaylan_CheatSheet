# SQL Server 常用语句

## 分组后 排序取第一条

    --根据 x 分组后、根据 y 排序后取第一条
    select * from (
      select ROW_NUMBER() over(partition by x order by y desc) RowNum
        ,testTable.*
      from testTable) as t1  where RowNum = 1



## 按照物理读的页面数排序 前50名

total_physical_reads:计划自编译后在执行期间所执行的物理读取总次数。
execution_count :计划自上次编译以来所执行的次数。
[avg I/O]:    平均读取的物理次数(页数)。
creation_time:编译计划的时间。 
query_text：执行计划对应的sql脚本
dbid：数据库ID
dbname：数据库名称

    SELECT TOP 50
    qs.total_physical_reads,qs.execution_count,
    qs.total_physical_reads/qs.execution_count AS [avg I/O],
    qs. creation_time,
    qs.max_elapsed_time,
    qs.min_elapsed_time,
    SUBSTRING(qt.text,qs.statement_start_offset/2,
    (CASE WHEN qs.statement_end_offset=-1
    THEN LEN(CONVERT(NVARCHAR(max),qt.text))*2
    ELSE qs.statement_end_offset END -qs.statement_start_offset)/2) AS query_text,
    qt.dbid,dbname=DB_NAME(qt.dbid),
    qt.objectid,
    qs.sql_handle,
    qs.plan_handle
    from sys.dm_exec_query_stats qs
    CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) AS qt
    ORDER BY qs.total_physical_reads DESC

## 按照逻辑读的页面数排序 前50名

    SELECT TOP 50
    qs.total_logical_reads,
    qs.execution_count,
    qs.max_elapsed_time,
    qs.min_elapsed_time,
    qs.total_logical_reads/qs.execution_count AS [AVG IO],
    SUBSTRING(qt.text,qs.statement_start_offset/2,
    (CASE WHEN qs.statement_end_offset=-1 
    THEN LEN(CONVERT(NVARCHAR(max),qt.text)) *2
    ELSE qs.statement_end_offset END -qs.statement_start_offset)/2) 
    AS query_text,
    qt.dbid,
    dbname=DB_NAME(qt.dbid),
    qt.objectid,
    qs.sql_handle,
    creation_time,
    qs.plan_handle
    from sys.dm_exec_query_stats qs
    CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) AS qt
    ORDER BY qs.total_logical_reads DESC