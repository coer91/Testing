CREATE OR REPLACE PACKAGE BODY PKG_HWMX_PDA_LOCATION AS

    /* GET_LOT_LIST_BY_CASE_LABEL */
    PROCEDURE GET_LOT_LIST_BY_CASE_LABEL (
        P_CASE_LABEL_ID IN  VARCHAR2,
        IO_CURSOR       OUT SYS_REFCURSOR
    )IS BEGIN
    
        IF INSTR(P_CASE_LABEL_ID, 'REPKD') > 0 THEN
            OPEN IO_CURSOR FOR
            WITH CTE_STORAGE_CODE AS (
                SELECT 'A100' AS CODE FROM DUAL UNION ALL
                SELECT 'V100' AS CODE FROM DUAL UNION ALL
                SELECT 'A000' AS CODE FROM DUAL UNION ALL
                SELECT 'V000' AS CODE FROM DUAL
            )
            SELECT 
                LOT.MAT_LOT_NO   AS LOT_NUMBER, 
                LOT.PART_NO      AS PART_NUMBER, 
                NVL(LOT.QTY, 0)  AS QTY, 
                LOT.EO_NO        AS EO_NUMBER, 
                LOT.STORAGE_CODE AS STORAGE_CODE
            FROM MES_INV_LOT_TK LOT
            INNER JOIN CTE_STORAGE_CODE STORAGE ON STORAGE.CODE = LOT.STORAGE_CODE 
            WHERE LOT.CASE_LABEL_ID = P_CASE_LABEL_ID
              AND LOT.DEL_FLAG      = 'N' 
              AND LOT.DEFECT_FLAG   = 'N';
    
        ELSE
            OPEN IO_CURSOR FOR
            SELECT 
                LOT.MAT_LOT_NO   AS LOT_NUMBER, 
                LOT.PART_NO      AS PART_NUMBER, 
                NVL(LOT.QTY, 0)  AS QTY, 
                LOT.EO_NO        AS EO_NUMBER, 
                LOT.STORAGE_CODE AS STORAGE_CODE
            FROM MES_INV_LOT_TK LOT
            INNER JOIN MES_INV_CKD_LOT_TK CKD ON CKD.LOTNO = LOT.MAT_LOT_NO       
            WHERE CKD.CASE_LABEL_ID = P_CASE_LABEL_ID
              AND LOT.DEL_FLAG      = 'N' 
              AND LOT.DEFECT_FLAG   = 'N'
              AND CKD.UNPACK_FLAG   = 'N';
        END IF; 
    END GET_LOT_LIST_BY_CASE_LABEL;


    /* GET_MATERIAL_BY_LOCATION */
    PROCEDURE GET_MATERIAL_BY_LOCATION (
        P_LOCATION IN  VARCHAR2,
        IO_CURSOR  OUT SYS_REFCURSOR
    )
    IS BEGIN
        OPEN IO_CURSOR FOR
        SELECT   
            LOC_MAT.PART_NO         AS "PART_NUMBER",
            LOC_MAT.LOC_NO          AS "LOCATION", 
            LOCATION.RACK_NO        AS "RACK",
            LOCATION.RACK_TYPE1     AS "RACK_TYPE",             
            NVL(LOCATION.ROW_NO, 0) AS "ROW",
            NVL(LOCATION.COL_NO, 0) AS "COLUMN"
        FROM MES_RACK_LOC_PART_MA LOC_MAT
        LEFT JOIN MES_RACK_LOC_MA LOCATION ON LOC_MAT.LOC_NO = LOCATION.LOC_NO
        WHERE LOC_MAT.LOC_NO = P_LOCATION 
        ORDER BY LOC_MAT.PART_NO; 
    END GET_MATERIAL_BY_LOCATION;

	
    /* SET_LOTS_IN_LOCATION */
    PROCEDURE SET_LOTS_IN_LOCATION (
        P_LOT_NO       IN  ARR_VALUE,  
        P_STORAGE_CODE IN  VARCHAR2,
        P_LOC_NO       IN  VARCHAR2,
        P_USER_ID      IN  VARCHAR2,
        IO_MESSAGE     OUT VARCHAR2
    )IS
        V_WERKS                 VARCHAR2(4);
        V_TRAN_CODE             VARCHAR2(30);
        V_MAT_LOT_NO            MES_INV_LOT_TK.MAT_LOT_NO%TYPE;
        V_PART_NO               MES_INV_LOT_TK.PART_NO%TYPE;
        V_EO_NO                 MES_INV_LOT_TK.EO_NO%TYPE;
        V_QTY                   MES_INV_LOT_TK.QTY%TYPE;
        V_OLD_QTY               MES_INV_LOT_TK.QTY%TYPE;
        V_VEN_ID                MES_INV_LOT_TK.VEN_ID%TYPE;
        V_UNIT                  MES_INV_LOT_TK.UNIT%TYPE;
        V_PROD_DATE             MES_INV_LOT_TK.PROD_DATE%TYPE;
        V_PO_NO                 MES_INV_LOT_TK.PO_NO%TYPE;
        V_MAT_ID                MES_INV_LOT_TK.MAT_ID%TYPE;
        V_CASE_LABEL_ID         MES_INV_LOT_TK.CASE_LABEL_ID%TYPE;
        V_IN_DATE               VARCHAR2(8);
        V_UNPACK_FLAG           VARCHAR2(1);
        V_STORAGE_TYPE          VARCHAR2(10);
        V_STORAGE_CODE          MES_INV_LOT_TK.STORAGE_CODE%TYPE;
        V_CUR_STORAGE_CODE      MES_INV_LOT_TK.STORAGE_CODE%TYPE;
        V_CUR_LOC_NO            MES_INV_LOT_TK.LOC_NO%TYPE;
        V_DEFECT_FLAG           MES_INV_LOT_TK.DEFECT_FLAG%TYPE;
        V_DEL_FLAG              MES_INV_LOT_TK.DEL_FLAG%TYPE;
        V_SYSDATE               DATE := SYSDATE;
        V_CHECK_LOC             VARCHAR2(100);
        LOC_EXCEPT              EXCEPTION;
    BEGIN
        V_TRAN_CODE := 'TRAN_LOT_MOVE'; 
    
        FOR I IN P_LOT_NO.FIRST .. P_LOT_NO.LAST
        LOOP        
            SELECT 
                B.ERP_WERKS,
                A.MAT_LOT_NO, A.STORAGE_CODE, 
                A.PART_NO, A.EO_NO, A.QTY, A.UNIT, 
                A.IN_DATE, A.VEN_ID, A.PO_NO, A.MAT_ID, A.DEFECT_FLAG, A.DEL_FLAG, 
                A.LOC_NO, A.CASE_LABEL_ID, A.PROD_DATE, NVL(C.UNPACK_FLAG, 'Y')
            INTO 
                V_WERKS, V_MAT_LOT_NO, V_CUR_STORAGE_CODE, 
                V_PART_NO, V_EO_NO, V_QTY, V_UNIT, 
                V_IN_DATE, V_VEN_ID, V_PO_NO, V_MAT_ID, V_DEFECT_FLAG, V_DEL_FLAG, 
                V_CUR_LOC_NO, V_CASE_LABEL_ID, V_PROD_DATE, V_UNPACK_FLAG
            FROM MES_INV_LOT_TK A
            INNER JOIN MES_STORAGE_MA B ON A.STORAGE_CODE = B.STORAGE_CODE
            LEFT OUTER JOIN MES_INV_CKD_LOT_TK C ON A.MAT_LOT_NO = C.LOTNO
            WHERE A.MAT_LOT_NO = P_LOT_NO(I)
              AND A.DEFECT_FLAG = 'N'
              AND A.DEL_FLAG = 'N'
              AND NVL(A.LOC_NO, ' ') != 'GLOVISCC';
    
            IF V_WERKS = 'MX11' THEN
                V_STORAGE_CODE := CASE 
                    WHEN P_STORAGE_CODE = 'CL' THEN 'A100' 
                    WHEN P_STORAGE_CODE = 'CY' THEN 'A000'
                    ELSE 'A110' 
                END;
                
            ELSE
                V_STORAGE_CODE := CASE 
                    WHEN P_STORAGE_CODE = 'CL' THEN 'V100' 
                    WHEN P_STORAGE_CODE = 'CY' THEN 'V000'
                    ELSE 'V110' 
                END;
            END IF;               
            
            DELETE FROM MES_INV_LOT_LOC_TK
            WHERE MAT_LOT_NO = P_LOT_NO(I);
                     
            INSERT INTO MES_INV_LOT_LOC_TK(LOC_NO, MAT_LOT_NO)
            VALUES(P_LOC_NO, P_LOT_NO(I));
                   
            UPDATE MES_INV_LOT_TK SET 
                LOC_NO = P_LOC_NO,
                UPDATEDATE = SYSDATE,
                UPDATEUSER = P_USER_ID
            WHERE MAT_LOT_NO = P_LOT_NO(I);
                     
            IF V_CUR_STORAGE_CODE != V_STORAGE_CODE THEN
                IF V_UNPACK_FLAG = 'N' THEN
                    SELECT STORAGE_TYPE 
                    INTO V_STORAGE_TYPE
                    FROM MES_STORAGE_MA
                    WHERE STORAGE_CODE = V_STORAGE_CODE;
    
                    IF V_STORAGE_TYPE = 'F' THEN
                        UPDATE MES_INV_CKD_LOT_TK SET 
                            UNPACK_FLAG = 'Y'
                        WHERE LOTNO = V_MAT_LOT_NO;
                    END IF;
                END IF;
    
                PKG_MES_PDA.SET_LOT_STOCK_MOVE_PROC(
                    V_WERKS, 
                    V_TRAN_CODE, 
                    V_CUR_STORAGE_CODE, 
                    V_STORAGE_CODE, 
                    V_MAT_LOT_NO, 
                    V_PART_NO, 
                    V_EO_NO, 
                    V_QTY, 
                    V_UNIT,
                    V_IN_DATE, 
                    V_VEN_ID, 
                    V_MAT_ID, 
                    V_PO_NO, 
                    V_PROD_DATE, 
                    V_CASE_LABEL_ID,
                    P_LOC_NO, 
                    V_DEL_FLAG, 
                    V_DEFECT_FLAG, 
                    P_USER_ID
                );
    
            END IF;
        END LOOP;
    
        IO_MESSAGE := 'OK';
        COMMIT;
    
        EXCEPTION 
            WHEN LOC_EXCEPT THEN
                ROLLBACK;
                PKG_MES_PDA.SET_BACK_LOG('SET_LOT_LOC', '' ,P_LOC_NO, '',  'DIFFERENT PART ALLOCATE', P_USER_ID);
            WHEN OTHERS THEN
                IO_MESSAGE := SUBSTR(SQLERRM,0,20);
                ROLLBACK;
                PKG_MES_PDA.SET_BACK_LOG('SET_LOT_LOC', '' ,P_LOC_NO, '',  SUBSTR(SQLERRM,0, 300), P_USER_ID);
    
    END SET_LOTS_IN_LOCATION;


    /* SET_LOTS_IN_LOCATION */
    PROCEDURE GET_ISSUE_REQ_LIST (
        P_ISSUE_NO IN  VARCHAR2,
        IO_CURSOR  OUT SYS_REFCURSOR
    )IS BEGIN
        OPEN IO_CURSOR FOR
        SELECT 
            ISSUE_NO, 
            ORD_NO, 
            PART_NO, 
            STORAGE_CODE, 
            REQ_BOX, 
            REQ_QTY, 
            INPUTDATE, 
            INPUTUSER 
        FROM MES_INV_MAT_REQ_ORDER_HI
        WHERE ISSUE_QTY IS NULL
          AND ISSUE_NO = P_ISSUE_NO
        ORDER BY PART_NO;    
    END;


    /* GET_TROLLY_ORDER */
    PROCEDURE GET_TROLLY_ORDER (
        P_PROD_DATE    IN  VARCHAR2,
        P_PLAN_SEQ     IN  VARCHAR2,
        P_TROLLY_GROUP IN  VARCHAR2,
        IO_CURSOR      OUT SYS_REFCURSOR
    )IS BEGIN

        OPEN IO_CURSOR FOR                
        WITH CTE_COMMON AS (
            SELECT 
                CODE, 
                RESERVE_01, 
                RESERVE_02 AS TROLLY_GROUP 
            FROM MES_COMMON_MA 
            WHERE CODE_GUBUN = 'TROLLY_TYPE'
        ),
        CTE_TROLLY_MATERIAL AS (
            SELECT 
                PART_NO, 
                MAX(MAX_QTY) AS MAX_QTY 
            FROM MES_TROLLY_PART_MA
            GROUP BY PART_NO
        )
        SELECT 
            TROLLY.PROD_DATE        AS PRODUCTION_DATE, 
            NVL(TROLLY.PLAN_SEQ, 0) AS PLAN_SEQUENCE, 
            TROLLY.PART_NO          AS PART_NUMBER,  
            COMMON.TROLLY_GROUP     AS TROLLY_GROUP,
            TROLLY.REQ_QTY - NVL(TROLLY.COMP_QTY, 0) AS QTY, 
            NVL(MATERIAL.MAX_QTY, 0)                 AS MAX_QTY 
        FROM MES_INV_TROLLY_ORDER_MAT TROLLY
        LEFT JOIN CTE_COMMON          COMMON   ON TROLLY.PART_TYPE = COMMON.CODE
        LEFT JOIN CTE_TROLLY_MATERIAL MATERIAL ON TROLLY.PART_NO = MATERIAL.PART_NO 
        WHERE TROLLY.PROD_DATE    = P_PROD_DATE
          AND TROLLY.PLAN_SEQ     = P_PLAN_SEQ
          AND COMMON.TROLLY_GROUP = P_TROLLY_GROUP
        ORDER BY TROLLY.PART_NO;
    END GET_TROLLY_ORDER;


    /* GET_LOTS_IN_TROLLY */
    PROCEDURE GET_LOT_IN_TROLLY (
        P_LOT_NO  IN  VARCHAR2, 
        IO_CURSOR OUT SYS_REFCURSOR
    )IS BEGIN
        OPEN IO_CURSOR FOR
        SELECT 
            MAT_LOT_NO       AS LOT_NUMBER,
            PART_NO          AS PART_NUMBER,         
            NVL(QTY, 0)      AS QTY,
            PROD_DATE        AS PRODUCTION_DATE, 
            NVL(PLAN_SEQ, 0) AS PLAN_SEQUENCE
        FROM MES_INV_TROLLY_ORDER_RESULT
        WHERE CANCEL_FLAG = 'N'
          AND MAT_LOT_NO = P_LOT_NO 
        ORDER BY PLAN_SEQ;
    END GET_LOT_IN_TROLLY;


    /* SET_ORDER_TROLLY */
    PROCEDURE SET_ORDER_TROLLY (
        P_PROD_DATE  IN  VARCHAR2,
        P_PLAN_SEQ   IN  VARCHAR2,
        P_LOT_NO     IN  ARR_VALUE,
        P_USER_ID    IN  VARCHAR2,
        IO_MESSAGE OUT VARCHAR2   
    ) IS
        V_CNT                   NUMBER;
        V_MAT_LOT_NO            MES_INV_LOT_TK.MAT_LOT_NO%TYPE;
        V_PART_NO               MES_INV_LOT_TK.PART_NO%TYPE;
        V_QTY                   MES_INV_LOT_TK.QTY%TYPE;
        V_COMP_CNT              NUMBER;
    
        V_ENG_ITEM_CD           VARCHAR2(4);
        V_PART_TYPE             VARCHAR2(1);
        V_COMP_QTY              NUMBER;
        V_REQ_QTY               NUMBER;
    
        EX_NO_DATA              EXCEPTION;
        EX_OVER_QTY             EXCEPTION;
        ERR_MSG                 VARCHAR2(200);
    
        BEGIN
    
            FOR I IN P_LOT_NO.FIRST .. P_LOT_NO.LAST LOOP
    
                SELECT MAT_LOT_NO, MAX(PART_NO), MAX(QTY), COUNT(*) 
                INTO V_MAT_LOT_NO, V_PART_NO, V_QTY, V_CNT 
                FROM MES_INV_LOT_TK
                WHERE MAT_LOT_NO = P_LOT_NO(I)
                GROUP BY MAT_LOT_NO;
    
                IF V_CNT = 0 THEN
                    RAISE EX_NO_DATA;
                END IF;
    
                SELECT ENG_ITEM_CD, PART_TYPE, REQ_QTY, NVL(COMP_QTY,0) 
                INTO V_ENG_ITEM_CD, V_PART_TYPE, V_REQ_QTY, V_COMP_QTY 
                FROM MES_INV_TROLLY_ORDER_MAT 
                WHERE PROD_DATE = P_PROD_DATE
                  AND PLAN_SEQ = P_PLAN_SEQ
                  AND PART_NO = V_PART_NO;
                
                IF (V_COMP_QTY + V_QTY) > V_REQ_QTY THEN
                    RAISE EX_OVER_QTY;
                END IF; 
    
                MERGE INTO MES_INV_TROLLY_ORDER_RESULT A
                USING DUAL B ON(A.PROD_DATE   = P_PROD_DATE 
                            AND A.PLAN_SEQ    = P_PLAN_SEQ 
                            AND A.ENG_ITEM_CD = V_ENG_ITEM_CD 
                            AND A.PART_TYPE   = V_PART_TYPE 
                            AND A.PART_NO     = V_PART_NO 
                            AND A.MAT_LOT_NO  = P_LOT_NO(I) 
                )
                WHEN NOT MATCHED THEN
                    INSERT (A.PROD_DATE, A.PLAN_SEQ, A.ENG_ITEM_CD, A.PART_TYPE, A.PART_NO, A.MAT_LOT_NO, A.QTY, A.INPUTDATE, A.INPUTUSER)
                    VALUES (P_PROD_DATE, P_PLAN_SEQ, V_ENG_ITEM_CD, V_PART_TYPE, V_PART_NO, P_LOT_NO(I), V_QTY, SYSDATE, P_USER_ID);
    
                UPDATE MES_INV_TROLLY_ORDER_MAT SET 
                    COMP_QTY = NVL(COMP_QTY, 0) + V_QTY
                 WHERE PROD_DATE = P_PROD_DATE
                   AND PLAN_SEQ = P_PLAN_SEQ
                   AND PART_NO = V_PART_NO;
    
                IF I = 1 THEN
    
                    UPDATE MES_INV_TROLLY_ORDER_DA SET 
                        STATUS     = 'P', 
                        UPDATEDATE = SYSDATE, 
                        UPDATEUSER = P_USER_ID  
                    WHERE PROD_DATE = P_PROD_DATE
                      AND PLAN_SEQ = P_PLAN_SEQ;
                END IF;
            END LOOP;
    
            SELECT COUNT(*) 
            INTO V_COMP_CNT
            FROM MES_INV_TROLLY_ORDER_MAT
            WHERE PROD_DATE = P_PROD_DATE
              AND PLAN_SEQ  = P_PLAN_SEQ
              AND REQ_QTY  <> NVL(COMP_QTY, 0);
    
            IF V_COMP_CNT = 0 THEN
                UPDATE MES_INV_TROLLY_ORDER_DA SET 
                    STATUS     = 'E', 
                    UPDATEDATE = SYSDATE, 
                    UPDATEUSER = P_USER_ID  
                 WHERE PROD_DATE = P_PROD_DATE
                   AND PLAN_SEQ  = P_PLAN_SEQ;
            END IF;
    
            SELECT 'OK' 
            INTO IO_MESSAGE 
            FROM DUAL;
    
            COMMIT;
    
        EXCEPTION
            WHEN EX_NO_DATA THEN
                ROLLBACK;
                SELECT 'NO DATA : ' || V_MAT_LOT_NO 
                INTO IO_MESSAGE 
                FROM DUAL;
            WHEN EX_OVER_QTY THEN
                ROLLBACK;
                SELECT 'QTY OVER : ' || TO_CHAR((V_COMP_QTY + V_QTY) - V_REQ_QTY) 
                INTO IO_MESSAGE 
                FROM DUAL;
            WHEN OTHERS THEN
                ROLLBACK;
                ERR_MSG := SUBSTR(SQLERRM, 0, 20);
                SELECT ERR_MSG 
                INTO IO_MESSAGE 
                FROM DUAL;
    END SET_ORDER_TROLLY;


    /* SET_INVENTORY_CELL */
    PROCEDURE SET_INVENTORY_CELL (
        P_LOC_NO     IN  VARCHAR2,
        P_MAT_LOT_NO IN  ARR_VALUE,
        P_USER_ID    IN  VARCHAR2,
        IO_MESSAGE   OUT VARCHAR2
    ) IS

        V_PROD_DATE    VARCHAR2(8) := FC_GET_SITE_DT();
        V_INSP_NO      VARCHAR2(4) ;
        V_STORAGE_CODE VARCHAR2(4);
        V_WERKS        VARCHAR2(4);
        V_LOC_STORAGE  VARCHAR2(4);
        V_RETURN_MSG   VARCHAR2(20);
        V_CNT          NUMBER;
        V_LOC_NO       VARCHAR2(20);        
        V_MAT_LOT_NO   VARCHAR2(20);
        V_STATUS       VARCHAR2(5);
    BEGIN
    
        IO_MESSAGE := 'NG';
        
        FOR I IN P_MAT_LOT_NO.FIRST .. P_MAT_LOT_NO.LAST
        LOOP
            V_MAT_LOT_NO := '';
            V_STATUS     := '';
            
            SELECT 
                SUBSTR(P_MAT_LOT_NO(I), 1, INSTR(P_MAT_LOT_NO(I), ';')-1) AS MAT_LOT_NO,  
                SUBSTR(P_MAT_LOT_NO(I),  INSTR(P_MAT_LOT_NO(I), ';')+1, LENGTH(P_MAT_LOT_NO(I))) AS STATUS
                INTO V_MAT_LOT_NO,  V_STATUS
            FROM DUAL;            
        
            BEGIN
                SELECT LPAD(TO_CHAR(COUNT(INSP_NO)+1),4,'0')  
                INTO V_INSP_NO
                FROM MES_INV_STOCKTAKING_CELL_HI
                WHERE PROD_DATE = V_PROD_DATE 
                  AND LOC_NO = P_LOC_NO
                  AND MAT_LOT_NO = V_MAT_LOT_NO;
            EXCEPTION WHEN OTHERS THEN
                V_INSP_NO := '0001';
            END;
            
            
            SELECT 
                COUNT(MAT_LOT_NO), 
                MAX(A.STORAGE_CODE), 
                CASE 
                    WHEN MAX(B.WERKS) = 'MX11' THEN 'A' 
                    WHEN MAX(B.WERKS) = 'MX12' THEN 'V' 
                END, 
                MAX(LOC_NO) 
                INTO V_CNT, V_STORAGE_CODE, V_WERKS, V_LOC_NO 
            FROM MES_INV_LOT_TK A
            LEFT OUTER JOIN (
                SELECT DISTINCT 
                    WERKS, 
                    MAT_ID 
                FROM IF_ERP_MAT
                WHERE MAT_ID NOT IN ('49535B0100', '1140306126K', '231112E012R') -- DUPLICATE PART 
                
                UNION ALL
                SELECT 
                    WERKS, 
                    MAT_ID 
                FROM IF_ERP_MAT
                WHERE MAT_ID IN ( '49535B0100',  '1140306126K', '231112E012R' ) 
                  AND USEGB IS NULL  
            ) B ON A.PART_NO = B.MAT_ID
            WHERE MAT_LOT_NO = V_MAT_LOT_NO;
            
             
            --LOT INFORMATION EXISTS LOT MOVE PROCESSING
            IF V_CNT > 0 THEN            
                BEGIN
                    SELECT 
                        CASE 
                            WHEN RACK_TYPE1 = 'CL' THEN V_WERKS || '100'
                            WHEN RACK_TYPE1 = 'FL' THEN V_WERKS || '110'
                            ELSE V_WERKS || '100' 
                        END 
                    INTO V_LOC_STORAGE
                    FROM MES_RACK_LOC_MA
                    WHERE LOC_NO = P_LOC_NO;
                
                    EXCEPTION WHEN OTHERS THEN
                    V_LOC_STORAGE := V_WERKS || '100';
                END;
                
                IF V_STORAGE_CODE != V_LOC_STORAGE THEN
                    PKG_MES_PDA_SM.SET_INVENTORY_MOVE(V_MAT_LOT_NO, V_LOC_STORAGE, P_USER_ID, V_RETURN_MSG);                    
                END IF;
            ELSE
                INSERT INTO MES_PDA_BACK_LOG_HI (PROCESS_CD, LOTNO, CASE_LABEL_ID, BACKLOG)
                VALUES('GET_CASE_LOT_INFO' ,V_MAT_LOT_NO, P_LOC_NO, 'NO DATA FOUND');
            END IF;
            
            -- 이력 남김
            INSERT INTO MES_INV_STOCKTAKING_CELL_HI(PROD_DATE, INSP_NO, MAT_LOT_NO, LOC_NO, STATUS, INPUTDATE, INPUTUSER)
            VALUES(V_PROD_DATE, V_INSP_NO, V_MAT_LOT_NO, P_LOC_NO, V_STATUS, SYSDATE, P_USER_ID);
            
            -- IF GLOVIS CC LOCATION BLOCKING BY LEO 2019-09-02
            IF NVL(V_LOC_NO, ' ' ) != 'GLOVISCC' THEN
                -- DIDN'T SCAN
                IF V_STATUS = '0' THEN
                
                    DELETE FROM MES_INV_LOT_LOC_TK
                    WHERE MAT_LOT_NO = V_MAT_LOT_NO;
                    
                    UPDATE MES_INV_LOT_TK
                    SET LOC_NO = NULL, UPDATEDATE = SYSDATE, UPDATEUSER = P_USER_ID
                    WHERE MAT_LOT_NO = V_MAT_LOT_NO;

                    IO_MESSAGE := 'OK';
                
                ELSIF V_STATUS = '1' THEN
                    
                    IO_MESSAGE := 'OK';
                
                -- NEW SCAN
                ELSIF V_STATUS = '2' THEN
           
            --        1. 동일한 LOT의 위치정보를 우선 삭제한다.
                    DELETE FROM MES_INV_LOT_LOC_TK
                    WHERE MAT_LOT_NO = V_MAT_LOT_NO;
                    
                    --2. 새로운 LOT의 위치정보를 등록한다.
                    INSERT INTO MES_INV_LOT_LOC_TK (LOC_NO, MAT_LOT_NO)
                    VALUES (P_LOC_NO, V_MAT_LOT_NO);
                    
                    --3. LOT MA를 업데이트한다.
                    UPDATE MES_INV_LOT_TK
                    SET LOC_NO = P_LOC_NO,
                        UPDATEDATE = SYSDATE,
                        UPDATEUSER = P_USER_ID
                    WHERE MAT_LOT_NO = V_MAT_LOT_NO;
                    
                    IO_MESSAGE := 'OK';
                END IF;
            END IF;
        END LOOP;
        
    END SET_INVENTORY_CELL;
END PKG_HWMX_PDA_LOCATION;