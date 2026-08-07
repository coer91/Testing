CREATE OR REPLACE PACKAGE BODY PKG_HWMX_DELIVERY AS 
	
	/* GET_GATE_PERMIT */
    PROCEDURE GET_GATE_PERMIT(
        P_SHIP_NO IN  VARCHAR2, 
        IO_CURSOR OUT SYS_REFCURSOR
    ) IS BEGIN
        OPEN IO_CURSOR FOR
        WITH CTE_MES_SHIP AS (
            SELECT 
                A.SHIP_NO         AS SHIP_NO,  
                MAX(A.FACTORY)    AS FACTORY, 
                B.MAT_NO          AS MAT_NO,  
                SUM(A.SHIP_QTY)   AS SHIP_QTY, 
                MAX(C.RESERVE_01) AS GUBUN, 
                MAX(SHIPPED_DT)   AS SHIPPING_DT
            FROM MES_SHIP_HI A
            LEFT JOIN MES_SHIP_PLAN B ON A.ORDER_NO = B.ORDER_NO AND A.LOAD_SEQ   = B.LOAD_SEQ AND A.GUBUN = B.GUBUN
            LEFT JOIN MES_COMMON_MA C ON A.GUBUN    = C.CODE     AND C.CODE_GUBUN = 'SHIPPING_TYPE'
            WHERE A.SHIP_NO = P_SHIP_NO
            GROUP BY A.SHIP_NO, B.MAT_NO
        ),
        CTE_MES_SHIP_FACTORY AS (
            SELECT 
                A.*,
                B.FACTORY_NAME_LC AS FACTORY_NM
            FROM CTE_MES_SHIP A
            LEFT JOIN MES_FACTORY_MA B ON A.FACTORY = B.FACTORY
        ),
        CTE_MES_SHIP_SUMMARY AS (
            SELECT 
                MAX(GUBUN)       AS GUBUN, 
                SHIP_NO          AS SHIP_NO,  
                COUNT(MAT_NO)    AS ITEM_CNT, 
                SUM(SHIP_QTY)    AS SHIP_QTY, 
                MAX(FACTORY_NM)  AS FACTORY_NM, 
                MAX(SHIPPING_DT) AS SHIPPING_DT
            FROM CTE_MES_SHIP_FACTORY
            GROUP BY SHIP_NO
        ),
        CTE_MES_GLOVIS AS (
            SELECT 
                'CC Mat Ret'       AS GUBUN, 
                A.DLV_NO           AS SHIP_NO,
                COUNT(B.LOT_NO)    AS ITEM_CNT,
                SUM(B.QTY)         AS SHIP_QTY,
                'ENG 1'            AS FACTORY_NM,
                MAX(A.CONFIRMDATE) AS SHIPPING_DT
            FROM MES_GLOVIS_MAT_RET A
            INNER JOIN MES_GLOVIS_MAT_RET_HI B ON A.DLV_NO = B.DLV_NO
            WHERE A.DLV_NO       = P_SHIP_NO            
              AND B.DEL_FLAG     = 'N'
              AND A.ORDER_STATUS = 'S'
            GROUP BY A.DLV_NO
        )
        SELECT * FROM CTE_MES_SHIP_SUMMARY
        UNION ALL
        SELECT * FROM CTE_MES_GLOVIS;
    
    END GET_GATE_PERMIT;

    /* SET_GATE_PERMIT */
    PROCEDURE SET_GATE_PERMIT
    (
        P_GATE_POS          IN  VARCHAR2,
        P_SHIP_NO           IN  VARCHAR2,
        P_USER_ID           IN  VARCHAR2,
        P_RETURN_MSG        OUT VARCHAR2
    )IS
    
    V_FACTORY       VARCHAR2(1);
    V_LINE_CODE     VARCHAR2(2);
    V_IN_GATE_PASS  DATE;
    V_OUT_GATE_PASS DATE;
    
    ALREADY_INGATE   EXCEPTION;
    ALREADY_OUTGATE  EXCEPTION;
    BEGIN
         
        
        
        SELECT FACTORY, IN_GATE_PASS, OUT_GATE_PASS
          INTO V_FACTORY, V_IN_GATE_PASS, V_OUT_GATE_PASS FROM
          (SELECT MAX(FACTORY) AS FACTORY, MAX(IN_GATE_PASS) AS IN_GATE_PASS, MAX(OUT_GATE_PASS) AS OUT_GATE_PASS
                FROM MES_SHIP_HI
                WHERE SHIP_NO = P_SHIP_NO
                GROUP BY SHIP_NO
          UNION ALL
          SELECT 'A' AS FACTORY, NULL AS IN_GATE_PASS, OUT_GATE_PASS
               FROM MES_GLOVIS_MAT_RET WHERE DLV_NO = P_SHIP_NO);
        
       
         
        
        --ALREADY PROCESS EXCEPTION
        IF ((V_FACTORY = 'P' AND P_GATE_POS = 'A' ) OR (V_FACTORY = 'A' AND P_GATE_POS = 'P' ) ) AND V_IN_GATE_PASS IS NOT NULL  THEN
            RAISE ALREADY_INGATE;
        ELSIF ((V_FACTORY IS NULL) OR (V_FACTORY = 'A' AND P_GATE_POS = 'A' ) OR (V_FACTORY = 'P' AND P_GATE_POS = 'P' ) ) AND V_OUT_GATE_PASS IS NOT NULL  THEN
            RAISE ALREADY_OUTGATE;
        ELSIF V_OUT_GATE_PASS IS NOT NULL THEN
            RAISE ALREADY_OUTGATE;
        END IF;
        
        UPDATE MES_SHIP_HI
        SET IN_GATE_PASS = CASE WHEN P_GATE_POS = 'A' AND V_FACTORY = 'P' THEN SYSDATE --DIE -> ENG 
                                WHEN P_GATE_POS = 'P' AND V_FACTORY = 'A' THEN SYSDATE --ENG -> DIE
                                ELSE IN_GATE_PASS END,
            OUT_GATE_PASS = CASE WHEN OUT_GATE_PASS IS NULL THEN SYSDATE ELSE OUT_GATE_PASS END,
            UPDATEDATE = SYSDATE,
            UPDATEUSER = P_USER_ID  
        WHERE SHIP_NO = P_SHIP_NO;
        
        UPDATE MES_GLOVIS_MAT_RET
        SET OUT_GATE_PASS = SYSDATE
        WHERE DLV_NO = P_SHIP_NO;
    
        P_RETURN_MSG := 'OK';
        
    EXCEPTION 
        WHEN ALREADY_INGATE THEN
            P_RETURN_MSG := TO_CHAR(V_IN_GATE_PASS,'YYYY/MM/DD HH24:MI:SS');
        WHEN ALREADY_OUTGATE THEN
            P_RETURN_MSG := TO_CHAR(V_OUT_GATE_PASS,'YYYY/MM/DD HH24:MI:SS');
        WHEN OTHERS THEN   
            P_RETURN_MSG := 'NO DATA';
    END;
    
    /* GET_GATE_PERMIT_DETAIL */
    PROCEDURE GET_GATE_PERMIT_DETAIL(
        P_SHIP_NO IN  VARCHAR2, 
        IO_CURSOR OUT SYS_REFCURSOR
    ) IS BEGIN

        OPEN IO_CURSOR FOR
        WITH CTE_MES_SHIP AS(
            SELECT 
                A.PALLET_CODE      AS LOT_NUMBER,
                NVL(A.SHIP_QTY, 0) AS QTY,
                A.SHIP_UNIT        AS UNIT,
                B.MAT_NO           AS PART_NUMBER,
                C.MAT_NM           AS PART_NAME 
            FROM MES_SHIP_HI A
            INNER JOIN MES_SHIP_PLAN B 
                ON A.ORDER_NO = B.ORDER_NO
               AND A.GUBUN = B.GUBUN
               AND A.ORDER_NO = B.ORDER_NO
               AND A.LOAD_SEQ = B.LOAD_SEQ
               AND A.DEL_FLAG = 'N'
            INNER JOIN IF_ERP_MAT C ON B.MAT_NO = C.MAT_ID AND C.USEGB IS NULL
            WHERE A.SHIP_NO = P_SHIP_NO
        ), 
        CTE_MES_GLOVIS AS (
            SELECT
                B.LOT_NO      AS LOT_NUMBER, 
                NVL(B.QTY, 0) AS QTY,
                C.UNIT        AS UNIT,
                B.PART_NO     AS PART_NUMBER,
                C.MAT_NM      AS PART_NAME 
            FROM MES_GLOVIS_MAT_RET A
            INNER JOIN MES_GLOVIS_MAT_RET_HI B ON A.DLV_NO = B.DLV_NO
            INNER JOIN IF_ERP_MAT            C ON B.PART_NO = C.MAT_ID AND C.USEGB IS NULL
            WHERE A.DLV_NO = P_SHIP_NO
        )
        SELECT * FROM CTE_MES_SHIP
        UNION ALL
        SELECT * FROM CTE_MES_GLOVIS;

    END GET_GATE_PERMIT_DETAIL;

END PKG_HWMX_DELIVERY;