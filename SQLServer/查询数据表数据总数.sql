--查询数据库中数据表的数据总数
 SELECT
    aa.name AS tablename
   ,bb.name AS columnsname
   ,dd.name AS columnstype
   ,dd.max_length
   ,cc.is_identity
   ,bb.last_value AS maxrecord
 FROM
    sys.objects aa
    INNER	
	 JOIN sys.identity_columns bb ON bb.object_id = aa.object_id
    INNER		 JOIN sys.columns cc ON cc.column_id = bb.column_id
                                        AND cc.object_id = bb.object_id
    INNER JOIN sys.types dd ON bb.system_type_id = dd.system_type_id
 WHERE
    aa.type = 'u' ORDER BY maxrecord DESC 
 
 

