SELECT TOP 200
    CASE WHEN sql_handle IS NULL THEN ' '
         ELSE ( SUBSTRING(st.text, ( qs.statement_start_offset + 2 ) / 2,
                          ( CASE WHEN qs.statement_end_offset = -1
                                 THEN LEN(CONVERT(NVARCHAR(MAX), st.text)) * 2
                                 ELSE qs.statement_end_offset
                            END - qs.statement_start_offset ) / 2) )
    END AS query_text
--,'sp_helptext '''+object_name(objectid)+''''
   ,OBJECT_NAME(objectid) 对象名称
   ,creation_time
   ,last_execution_time
   ,CEILING(( total_worker_time + 0.0 ) / ( execution_count * 1000 )) AS 平均毫秒
   ,execution_count
   ,total_worker_time
   ,total_physical_reads
   ,total_logical_reads
FROM
    sys.dm_exec_query_stats qs
    CROSS APPLY sys.dm_exec_sql_text(sql_handle) st
ORDER BY
    total_worker_time DESC;



