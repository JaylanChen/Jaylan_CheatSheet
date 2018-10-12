SELECT
    a.client_net_address
   ,b.hostname
   ,b.loginame
   ,
--a.local_net_address as ServerIP,
    DB_NAME(b.dbid)
   ,COUNT(*) 连接数
FROM
    sys.dm_exec_connections a
   ,sysprocesses b
WHERE
    a.session_id = b.spid
    AND DB_NAME(b.dbid) = 'TeacherClub'
--and b.loginame not in('sa','OPEN\openclusteradmin','NT AUTHORITY\SYSTEM','monitor')
GROUP BY
    b.hostname
   ,b.loginame
   ,a.client_net_address
   ,a.local_net_address
   ,b.dbid
ORDER BY
    b.loginame
   ,b.hostname
   ,dbid;
