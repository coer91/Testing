CREATE OR REPLACE PACKAGE BODY PKG_HWMX_LOT AS  


    /* GET_INSPECTION_NUMBER_LIST */
	PROCEDURE GET_INSPECTION_NUMBER_LIST (
        P_STORAGE_CODE IN  VARCHAR2,
        P_RANGE        IN  NUMBER,
        IO_CURSOR      OUT SYS_REFCURSOR
    )IS 
        V_RANGE NUMBER := NVL(P_RANGE, 15);
        
        BEGIN
            OPEN IO_CURSOR FOR
            SELECT 
                INSP_NO   AS INSPECTION_NUMBER, 
                STORAGE_CODE, 
                INPUTUSER AS INPUT_USER,
                INSP_DATE AS INSPECTION_DATE
            FROM MES_INV_LOT_INSP_DA
            WHERE APPLY_FLAG = 'N'
              AND STORAGE_CODE = P_STORAGE_CODE
              AND INSP_DATE BETWEEN TO_CHAR(SYSDATE - V_RANGE, 'YYYYMMDD') AND TO_CHAR(SYSDATE, 'YYYYMMDD')
            ORDER BY INPUTDATE ASC;
    END GET_INSPECTION_NUMBER_LIST;


    /* CREATE_INSPECTION_NUMBER */
    PROCEDURE CREATE_INSPECTION_NUMBER (
        P_STORAGE_CODE IN  VARCHAR2,
        P_USER_ID      IN  VARCHAR2,
        IO_VALUE       OUT VARCHAR2
    ) IS
        V_NEW_INSP_NO VARCHAR2(20);
        V_DATE        VARCHAR2(8) := FC_GET_SITE_DT();
        V_CNT         NUMBER;
    
    BEGIN    
        BEGIN
            SELECT MAX(INSP_NO), COUNT(*) 
            INTO V_NEW_INSP_NO, V_CNT 
            FROM MES_INV_LOT_INSP_DA
            WHERE STORAGE_CODE = P_STORAGE_CODE
              AND INSP_DATE = V_DATE;
            
            EXCEPTION WHEN OTHERS THEN
                V_CNT := 0;
        END;
    
        IF V_CNT <= 1 THEN 
            MERGE INTO MES_ITEM_MAX_HI A
            USING DUAL B ON (A.TABLE_NAME = 'MES_INV_INSP_DA' AND A.GROUP_CODE = 'INSP_SEQ' AND SEQDATE = V_DATE )
            WHEN NOT MATCHED THEN
                INSERT(A.TABLE_NAME, A.GROUP_CODE, A.SEQDATE, A.MAX_VALUE, INPUTDATE)
                VALUES('MES_INV_INSP_DA', 'INSP_SEQ', V_DATE, 1, SYSDATE)
            WHEN MATCHED THEN 
                UPDATE SET 
                A.MAX_VALUE = A.MAX_VALUE + 1,
                UPDATEDATE = SYSDATE,
                UPDATEUSER = P_USER_ID;
    
            SELECT P_STORAGE_CODE || V_DATE || LPAD (MAX_VALUE, 4, '0') 
            INTO V_NEW_INSP_NO
            FROM MES_ITEM_MAX_HI
            WHERE TABLE_NAME = 'MES_INV_INSP_DA' 
              AND GROUP_CODE = 'INSP_SEQ' 
              AND SEQDATE = V_DATE  
            FOR UPDATE WAIT 5;
    
            INSERT INTO MES_INV_LOT_INSP_DA(STORAGE_CODE, INSP_DATE, INSP_NO, APPLY_FLAG, INPUTUSER)
            VALUES(P_STORAGE_CODE, V_DATE, V_NEW_INSP_NO, 'N', P_USER_ID);
    
            IF SQL%ROWCOUNT = 0 THEN
                RAISE NO_DATA_FOUND;
            END IF;
        END IF;
    
        IO_VALUE := V_NEW_INSP_NO;
        COMMIT;
    
        EXCEPTION 
            WHEN OTHERS THEN
                ROLLBACK;
                IO_VALUE := '';
                PKG_MES_PDA.SET_BACK_LOG('GET_NEW_INSP_NO', '', '', '', SQLCODE || SUBSTR(SQLERRM,0, 200), P_USER_ID);
    END CREATE_INSPECTION_NUMBER;


    /* MOVE_LOT */
    PROCEDURE MOVE_LOT (
        P_LOT_NO       IN  VARCHAR2,
        P_STORAGE_CODE IN  VARCHAR2,
        P_USER_ID      IN  VARCHAR2,
        IO_MESSAGE   OUT VARCHAR2
    ) IS
        V_WERKS            VARCHAR2(4);
        V_TRAN_CODE        VARCHAR2(30);
        V_MAT_LOT_NO       MES_INV_LOT_TK.MAT_LOT_NO%TYPE;
        V_PART_NO          MES_INV_LOT_TK.PART_NO%TYPE;
        V_EO_NO            MES_INV_LOT_TK.EO_NO%TYPE;
        V_QTY              MES_INV_LOT_TK.QTY%TYPE;
        V_OLD_QTY          MES_INV_LOT_TK.QTY%TYPE;
        V_VEN_ID           MES_INV_LOT_TK.VEN_ID%TYPE;
        V_UNIT             MES_INV_LOT_TK.UNIT%TYPE;
        V_PROD_DATE        MES_INV_LOT_TK.PROD_DATE%TYPE;
        V_PO_NO            MES_INV_LOT_TK.PO_NO%TYPE;
        V_MAT_ID           MES_INV_LOT_TK.MAT_ID%TYPE;
        V_CASE_LABEL_ID    MES_INV_LOT_TK.CASE_LABEL_ID%TYPE;
        V_IN_DATE          VARCHAR2(8);
        V_UNPACK_FLAG      VARCHAR2(1);
                           
        V_STORAGE_TYPE     VARCHAR2(10);
                           
        V_CUR_STORAGE_CODE MES_INV_LOT_TK.STORAGE_CODE%TYPE;
        V_CUR_LOC_NO       MES_INV_LOT_TK.LOC_NO%TYPE;
        V_DEFECT_FLAG      MES_INV_LOT_TK.DEFECT_FLAG%TYPE;
        V_DEL_FLAG         MES_INV_LOT_TK.DEL_FLAG%TYPE;
                           
        V_SYSDATE          DATE := SYSDATE;
        V_BLOCK_WERKS      NUMBER;
                           
        PLANT_MOVE_BLCOK   EXCEPTION;
        QUANTITY_ERR       EXCEPTION;
        EO_BLOCKING        EXCEPTION;
                           
        V_EO_BLOCK         VARCHAR2(1);
        V_SAP_STORAGE      VARCHAR2(4);
        V_STORAGE_CODE     VARCHAR2(4);
        BEGIN 
    
            V_TRAN_CODE := 'TRAN_LOT_MOVE';
            
            SELECT COUNT(ERP_WERKS) 
            INTO V_BLOCK_WERKS 
            FROM MES_STORAGE_MA
            WHERE STORAGE_CODE = P_STORAGE_CODE
              AND ERP_WERKS = (
                 SELECT WERKS
                 FROM IF_ERP_MAT
                 WHERE MAT_ID = (SELECT PART_NO FROM MES_INV_LOT_TK WHERE MAT_LOT_NO = P_LOT_NO) 
                   AND USEGB IS NULL  
                );
    
            IF V_BLOCK_WERKS = 0 THEN
                RAISE PLANT_MOVE_BLCOK;
            END IF;
                  
            SELECT 
                B.ERP_WERKS,
                A.MAT_LOT_NO, A.STORAGE_CODE, 
                A.PART_NO, A.EO_NO, A.QTY, A.UNIT, 
                A.IN_DATE, A.VEN_ID, A.PO_NO, A.MAT_ID, A.DEFECT_FLAG, A.DEL_FLAG, 
                A.LOC_NO, A.CASE_LABEL_ID, A.PROD_DATE, NVL(C.USE_FLAG, 'Y'), D.FACTORY
                INTO V_WERKS, V_MAT_LOT_NO, V_CUR_STORAGE_CODE, 
                V_PART_NO, V_EO_NO, V_QTY, V_UNIT, 
                V_IN_DATE, V_VEN_ID, V_PO_NO, V_MAT_ID, V_DEFECT_FLAG, V_DEL_FLAG, 
                V_CUR_LOC_NO, V_CASE_LABEL_ID, V_PROD_DATE, V_EO_BLOCK, V_SAP_STORAGE
            FROM MES_INV_LOT_TK A 
            INNER JOIN MES_STORAGE_MA B ON A.STORAGE_CODE = B.STORAGE_CODE
            LEFT OUTER JOIN MES_INV_MAT_EO_MA C ON A.PART_NO = C.PART_NO AND A.EO_NO = C.EO_NO
            LEFT OUTER JOIN IF_ERP_MAT D ON A.PART_NO = D.MAT_ID
            WHERE A.MAT_LOT_NO = P_LOT_NO
              AND A.DEFECT_FLAG = 'N'
              AND A.DEL_FLAG = 'N'
              AND D.USEGB IS NULL
              AND NVL(A.LOC_NO, ' ') != 'GLOVISCC';
    
            IF V_QTY <= 0 THEN
                RAISE QUANTITY_ERR;
            END IF;
    
            IF V_EO_BLOCK = 'N' THEN
                RAISE EO_BLOCKING;
            END IF;
    
            IF V_PART_NO = 'C01H0020' AND P_STORAGE_CODE = 'A100' THEN
                RAISE PLANT_MOVE_BLCOK;
            END IF;  
            
            IF P_STORAGE_CODE IN('A200','A300', 'V200','V300') AND V_SAP_STORAGE IS NOT NULL THEN
                V_STORAGE_CODE := CASE 
                    WHEN V_SAP_STORAGE = 'E120' THEN 'A200'
                    WHEN V_SAP_STORAGE = 'E130' THEN 'A300'
                    WHEN V_SAP_STORAGE = 'E110' THEN 'A300'
                    WHEN V_SAP_STORAGE = 'D110' THEN 'P100'
                    WHEN V_SAP_STORAGE = 'D120' THEN 'P200' 
                    WHEN V_SAP_STORAGE = 'C120' THEN 'V200'
                    WHEN V_SAP_STORAGE = 'C130' THEN 'V300'
                    ELSE P_STORAGE_CODE 
                END;
            ELSE
                V_STORAGE_CODE := P_STORAGE_CODE;                
            END IF;
    
    
            IF V_CUR_STORAGE_CODE != V_STORAGE_CODE THEN
    
                BEGIN
                    SELECT UNPACK_FLAG 
                    INTO V_UNPACK_FLAG 
                    FROM MES_INV_CKD_LOT_TK 
                    WHERE LOTNO = P_LOT_NO;
    
                 
                    IF V_UNPACK_FLAG = 'N' AND V_STORAGE_CODE IN ('A110','V110') THEN
                        SELECT STORAGE_TYPE 
                        INTO V_STORAGE_TYPE
                        FROM MES_STORAGE_MA
                        WHERE STORAGE_CODE = V_STORAGE_CODE;
                    
                        IF V_STORAGE_TYPE NOT IN ('C', 'Z') THEN
                            UPDATE MES_INV_CKD_LOT_TK SET 
                                UNPACK_FLAG = 'Y'
                            WHERE LOTNO = V_MAT_LOT_NO;
                        END IF;
                    END IF;
                
                    EXCEPTION 
                        WHEN NO_DATA_FOUND THEN   
                            V_UNPACK_FLAG := 'Y';
                        WHEN OTHERS THEN   
                        IO_MESSAGE := SUBSTR(SQLERRM,0, 20);         
                        ROLLBACK;   
                        PKG_MES_PDA.SET_BACK_LOG('SET_LOT_MOVE', P_LOT_NO ,'', '',  SUBSTR(SQLERRM,0, 300), P_USER_ID);
                END;    
                
                IF V_CUR_STORAGE_CODE IN ('A200', 'A300', 'V200', 'V300') THEN
                    IF V_STORAGE_CODE IN ('A100', 'A110','V100','V110') THEN
                        V_TRAN_CODE := 'TRAN_LOT_REIN';
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
                    '',
                    V_DEL_FLAG,
                    V_DEFECT_FLAG,
                    P_USER_ID
                );
    
                IO_MESSAGE := 'OK';            
                COMMIT;
            ELSE
                IO_MESSAGE := 'OK';  
                PKG_MES_PDA.SET_BACK_LOG('SET_LOT_MOVE', P_LOT_NO ,'', '',  'SAME STORAGE CHOOSE', P_USER_ID);
                COMMIT;
    
            END IF;
    
             
            IF V_CUR_LOC_NO IS NOT NULL THEN
                DELETE FROM MES_INV_LOT_LOC_TK
                WHERE MAT_LOT_NO = P_LOT_NO;      
    
                COMMIT;                
            END IF;
    
        EXCEPTION 
            WHEN EO_BLOCKING THEN
                IO_MESSAGE := 'BLOCK:' || P_LOT_NO;         
                ROLLBACK;   
                PKG_MES_PDA.SET_BACK_LOG('SET_LOT_MOVE', P_LOT_NO ,'', '',  IO_MESSAGE, P_USER_ID);
            WHEN PLANT_MOVE_BLCOK THEN
                IO_MESSAGE := 'PLANT DIFFERENT';         
                ROLLBACK;   
                PKG_MES_PDA.SET_BACK_LOG('SET_LOT_MOVE', P_LOT_NO ,'', '',  IO_MESSAGE, P_USER_ID);
            WHEN QUANTITY_ERR THEN
                IO_MESSAGE := 'QUANTITY 0';         
                ROLLBACK;   
                PKG_MES_PDA.SET_BACK_LOG('SET_LOT_MOVE', P_LOT_NO ,'', '',  IO_MESSAGE, P_USER_ID);
            WHEN OTHERS THEN   
                IO_MESSAGE := SUBSTR(SQLERRM,0, 20);         
                ROLLBACK;   
                PKG_MES_PDA.SET_BACK_LOG('SET_LOT_MOVE', P_LOT_NO ,'', '',  SUBSTR(SQLERRM,0, 300), P_USER_ID);
    END MOVE_LOT;


    /* SET_LOT_INSPECTION */
    PROCEDURE SET_LOT_INSPECTION (
        P_STORAGE_CODE IN  VARCHAR2,
        P_INSP_NO      IN  VARCHAR2,
        P_LOT_NO       IN  ARR_VALUE,
        P_USER_ID      IN  VARCHAR2,
        IO_MESSAGE     OUT VARCHAR2
    ) IS BEGIN
        FOR I IN P_LOT_NO.FIRST .. P_LOT_NO.LAST LOOP
            MERGE INTO MES_INV_LOT_INSP_HI A
            USING (SELECT * FROM MES_INV_LOT_TK WHERE MAT_LOT_NO = P_LOT_NO(I)) B
               ON (A.INSP_NO = P_INSP_NO AND A.MAT_LOT_NO = P_LOT_NO(I))
            WHEN NOT MATCHED THEN
                INSERT(
                    A.STORAGE_CODE, A.INSP_NO, A.INSP_DATE, A.MAT_LOT_NO, A.PART_NO, A.EO_NO, 
                    A.ORG_QTY, A.INSP_QTY, A.UNIT, A.MAT_ID, A.PROD_DATE, A.VEN_ID, 
                    A.INPUTDATE, A.INPUTUSER)
                VALUES(
                    P_STORAGE_CODE, P_INSP_NO, FC_GET_SITE_DT(), P_LOT_NO(I), B.PART_NO, B.EO_NO, 
                    B.QTY, B.QTY, B.UNIT, B.MAT_ID, B.PROD_DATE, B.VEN_ID, 
                    SYSDATE, P_USER_ID)
            WHEN MATCHED THEN
                UPDATE SET 
                A.UPDATEDATE = SYSDATE, 
                A.UPDATEUSER = P_USER_ID;
                
            IF SQL%ROWCOUNT = 0 THEN
                RAISE NO_DATA_FOUND;
            END IF;    
        END LOOP;
            
        IO_MESSAGE := 'OK';        
        COMMIT;
            
        EXCEPTION
            WHEN OTHERS THEN
                IO_MESSAGE := SUBSTR(SQLERRM,0,20);
                ROLLBACK;
                PKG_MES_PDA.SET_BACK_LOG('SET_INSP_HI', P_LOT_NO(1) ,'', '',  SQLCODE || SUBSTR(SQLERRM,0, 200), P_USER_ID);        
    END SET_LOT_INSPECTION;


    /* JOIN_LOT */
    PROCEDURE JOIN_LOT (
        P_LOT_NO     IN  VARCHAR2,
        P_PRINT_CNT  IN  VARCHAR2,
        P_PRINTER    IN  VARCHAR2,
        P_USER_ID    IN  VARCHAR2,
        IO_MESSAGE   OUT VARCHAR2
    )IS
    
        V_CURSOR        SYS_REFCURSOR;
        V_MERGE_LOT_NO  VARCHAR2(20);
        V_MAT_LOT_NO    VARCHAR2(20);
        V_SUM_QTY       NUMBER := 0;
        V_QTY           NUMBER := 0;
        V_STORAGE_CODE  VARCHAR2(20);
        V_PART_NO       VARCHAR2(20);
        V_EO_NO         VARCHAR2(20);
        V_UNIT          VARCHAR2(10);
        V_IN_DATE       VARCHAR2(8);
        V_OLDEST_DATE   MES_INV_LOT_TK.IN_DATE%TYPE := FC_GET_PROD_DATE(SYSDATE);
        V_VEN_ID        VARCHAR2(4);
    
        V_CHK_STORAGE   VARCHAR2(4);
    
        V_KITTING_CNT   NUMBER;
        DIFF_STORAGE    EXCEPTION;
        KITTING_LOT     EXCEPTION;
    
        BEGIN
             
            V_MERGE_LOT_NO := FC_NEW_LOT_NO(P_USER_ID);
    
             
            OPEN V_CURSOR FOR
            SELECT DISTINCT REGEXP_SUBSTR(A.LOT_NO, '[^;]+', 1, LEVEL) LOT_NO           
            FROM (SELECT P_LOT_NO AS LOT_NO FROM DUAL) A
            CONNECT BY LEVEL <= LENGTH(REGEXP_REPLACE(A.LOT_NO, '[^;]+',''))+1;
    
            LOOP
                FETCH V_CURSOR INTO V_MAT_LOT_NO;
                EXIT WHEN V_CURSOR%NOTFOUND;
    
                --  수량 확인
                SELECT QTY, STORAGE_CODE, PART_NO, EO_NO, UNIT, VEN_ID, IN_DATE
                INTO V_QTY, V_STORAGE_CODE, V_PART_NO, V_EO_NO, V_UNIT, V_VEN_ID, V_IN_DATE
                FROM MES_INV_LOT_TK
                WHERE MAT_LOT_NO  = V_MAT_LOT_NO
                  AND DEL_FLAG    = 'N'
                  AND DEFECT_FLAG = 'N'               
                  AND STORAGE_CODE NOT IN ('A000', 'V000'); 
    
                IF SQL%ROWCOUNT = 0 THEN
                    RAISE NO_DATA_FOUND;
                END IF;
                 
                IF  V_OLDEST_DATE > V_IN_DATE THEN
                    V_OLDEST_DATE := V_IN_DATE;
                END IF;
                 
                V_CHK_STORAGE := CASE WHEN V_CHK_STORAGE IS NULL THEN V_STORAGE_CODE END;
    
                IF V_CHK_STORAGE != V_STORAGE_CODE THEN
                    RAISE DIFF_STORAGE;            
                END IF;
                 
                SELECT COUNT(*) 
                INTO V_KITTING_CNT 
                FROM MES_CVJ_KITTING_HI
                WHERE LOT_NO = V_MAT_LOT_NO
                  AND CANCEL_FLAG = 'N';
    
    
                IF V_KITTING_CNT > 0 THEN
                    RAISE KITTING_LOT;
                END IF;
    
                UPDATE MES_INV_LOT_TK SET 
                    DEL_FLAG         = 'Y',
                    MERGE_MAT_LOT_NO = V_MERGE_LOT_NO,
                    UPDATEDATE       = SYSDATE,
                    UPDATEUSER       = P_USER_ID
                WHERE MAT_LOT_NO = V_MAT_LOT_NO;
    
                DELETE FROM MES_INV_LOT_LOC_TK
                WHERE MAT_LOT_NO = V_MAT_LOT_NO;
    
                V_SUM_QTY := V_SUM_QTY + V_QTY;
            END LOOP;
    
            --2. 새로운 LOT 생성
            INSERT INTO MES_INV_LOT_TK(MAT_LOT_NO, STORAGE_CODE, PART_NO, EO_NO, UNIT, QTY, IN_DATE, VEN_ID, INPUTUSER)
            VALUES(V_MERGE_LOT_NO, V_STORAGE_CODE, V_PART_NO, V_EO_NO, V_UNIT, V_SUM_QTY, V_OLDEST_DATE, V_VEN_ID, P_USER_ID);
    
    
            --3. LOT HI 생성
            INSERT INTO MES_INV_LOT_HI(TRAN_CODE, MAT_LOT_NO, STORAGE_CODE, PART_NO, EO_NO, QTY, IN_DATE, VEN_ID, DEFECT_FLAG, DEL_FLAG, PO_NO, REMARK, INPUTUSER)
            SELECT 'TRAN_LOT_MERGE',MAT_LOT_NO, STORAGE_CODE, PART_NO, EO_NO, QTY, IN_DATE, VEN_ID, DEFECT_FLAG, DEL_FLAG, PO_NO, REMARK, P_USER_ID
            FROM MES_INV_LOT_TK
            WHERE MAT_LOT_NO = V_MERGE_LOT_NO;
    
            --4. PRINT
            INSERT INTO MES_INV_LOT_PRT_HI(STORAGE_CODE, MAT_LOT_NO, PRINT_FLAG, PAPER_TYPE, PART_NO, EO_NO, QTY, IN_DATE, VEN_ID, PO_NO, REMARK, MAT_ID, PROD_DATE, INPUTDATE, INPUTUSER, PRINTER_NAME )
            SELECT STORAGE_CODE, MAT_LOT_NO, 'N', P_PRINT_CNT, PART_NO, EO_NO, QTY, IN_DATE, VEN_ID, PO_NO, REMARK, MAT_ID, PROD_DATE, SYSDATE, P_USER_ID, P_PRINTER
            FROM MES_INV_LOT_TK
            WHERE MAT_LOT_NO = V_MERGE_LOT_NO;
    
            IO_MESSAGE := V_MERGE_LOT_NO;
            COMMIT;  
    
        EXCEPTION 
            WHEN KITTING_LOT THEN
                IO_MESSAGE := 'ALREADY KITTING';
                ROLLBACK;
            WHEN DIFF_STORAGE THEN
                IO_MESSAGE := 'DIFFRENT STORAGE';
                ROLLBACK;
            WHEN OTHERS THEN
                IO_MESSAGE := 'OTHERS';
                ROLLBACK;
    END JOIN_LOT;


    /* SPLIT_LOT */
    PROCEDURE SPLIT_LOT (
        P_LOT_NO     IN  VARCHAR2,
        P_SPLIT_QTY  IN  NUMBER,
        P_PRINT_CNT  IN  VARCHAR2,
        P_PRINTER    IN  VARCHAR2,
        P_USER_ID    IN  VARCHAR2,
        P_NEW_LOT_NO OUT VARCHAR2,
        IO_MESSAGE   OUT VARCHAR2
    )IS
    
        V_CUR_QTY       NUMBER;
        V_SPLIT_LOT_NO  VARCHAR2(20);
        V_STORAGE_CODE  MES_INV_LOT_TK.STORAGE_CODE%TYPE;
        V_LOC_NO        VARCHAR2(30);
        V_DEL_FLAG      VARCHAR2(1);
        V_DEFECT_FLAG   VARCHAR2(1);
        V_KITTING_CNT   NUMBER;
        V_GLOVIS_LOC    VARCHAR2(30);
    
        INVAILD_LOT     EXCEPTION;
        QUANTITY_ERR    EXCEPTION;
    
        BEGIN         
            
            SELECT DEL_FLAG, DEFECT_FLAG, LOC_NO, STORAGE_CODE 
            INTO V_DEL_FLAG, V_DEFECT_FLAG, V_GLOVIS_LOC, V_STORAGE_CODE
            FROM MES_INV_LOT_TK
            WHERE MAT_LOT_NO = P_LOT_NO;
    
             
            IF V_DEL_FLAG = 'Y' OR V_DEFECT_FLAG = 'Y' OR V_STORAGE_CODE IN ('A000', 'V000') THEN
                RAISE INVAILD_LOT;
            END IF;
    
            IF P_SPLIT_QTY <= 0 THEN
                RAISE QUANTITY_ERR;
            END IF;
    
            V_SPLIT_LOT_NO := FC_NEW_LOT_NO(P_USER_ID);
    
            SELECT QTY, LOC_NO 
            INTO V_CUR_QTY, V_LOC_NO
            FROM MES_INV_LOT_TK
            WHERE MAT_LOT_NO = P_LOT_NO
            FOR UPDATE WAIT 5;
    
            IF V_CUR_QTY <= P_SPLIT_QTY THEN
                RAISE NO_DATA_FOUND;
            END IF;    
    
            IF (V_CUR_QTY-P_SPLIT_QTY) <= 0 THEN
              RAISE QUANTITY_ERR;
            END IF;
    
            -- 1
            UPDATE MES_INV_LOT_TK SET 
                QTY              = (QTY - P_SPLIT_QTY),
                SPLIT_MAT_LOT_NO = V_SPLIT_LOT_NO,
                UPDATEDATE       = SYSDATE,
                UPDATEUSER       = P_USER_ID
            WHERE MAT_LOT_NO = P_LOT_NO;
    
            -- 2 
            INSERT INTO MES_INV_LOT_HI(
                TRAN_CODE, MAT_LOT_NO, STORAGE_CODE, PART_NO, EO_NO, 
                QTY, IN_DATE, VEN_ID, DEFECT_FLAG, DEL_FLAG, 
                PO_NO, REMARK, MAT_ID, PROD_DATE, SPLIT_MAT_LOT_NO, 
                LOC_NO, CASE_LABEL_ID, INPUTDATE, INPUTUSER
            )
            SELECT 
                'TRAN_LOT_SCRAP',  MAT_LOT_NO, STORAGE_CODE, PART_NO, EO_NO, 
                V_CUR_QTY-P_SPLIT_QTY, IN_DATE, VEN_ID, DEFECT_FLAG, DEL_FLAG, PO_NO, REMARK, 
                MAT_ID, PROD_DATE, V_SPLIT_LOT_NO, LOC_NO, CASE_LABEL_ID, SYSDATE, P_USER_ID
            FROM MES_INV_LOT_TK
            WHERE MAT_LOT_NO = P_LOT_NO;
    
            -- 3
            INSERT INTO MES_INV_LOT_TK(
                MAT_LOT_NO, STORAGE_CODE, PART_NO, EO_NO, QTY, 
                UNIT, IN_DATE, VEN_ID, DEFECT_FLAG, DEL_FLAG, 
                PO_NO, REMARK, MAT_ID, PROD_DATE, LOC_NO, CASE_LABEL_ID, INPUTDATE, INPUTUSER
            )
            SELECT 
                V_SPLIT_LOT_NO, STORAGE_CODE, PART_NO, EO_NO, P_SPLIT_QTY,
                UNIT, IN_DATE, VEN_ID, DEFECT_FLAG, DEL_FLAG, 
                PO_NO, REMARK, MAT_ID, PROD_DATE, LOC_NO, CASE_LABEL_ID, SYSDATE, P_USER_ID
            FROM MES_INV_LOT_TK
            WHERE MAT_LOT_NO = P_LOT_NO;
    
            IF V_LOC_NO IS NOT NULL THEN
                 
                MERGE INTO MES_INV_LOT_LOC_TK A
                USING DUAL ON ( A.LOC_NO = V_LOC_NO AND A.MAT_LOT_NO = V_SPLIT_LOT_NO )
                WHEN NOT MATCHED THEN
                    INSERT (LOC_NO, MAT_LOT_NO)
                    VALUES (V_LOC_NO, V_SPLIT_LOT_NO );
            END IF;    
    
             
            SELECT COUNT(LOT_NO) 
            INTO V_KITTING_CNT
            FROM MES_CVJ_KITTING_HI
            WHERE LOT_NO = P_LOT_NO
              AND CANCEL_FLAG = 'N';
    
            --4. PRINT
            INSERT INTO MES_INV_LOT_PRT_HI(
                STORAGE_CODE, MAT_LOT_NO, PRINT_FLAG, PAPER_TYPE, PART_NO, EO_NO, QTY, IN_DATE, VEN_ID, PO_NO, REMARK, MAT_ID, PROD_DATE, INPUTDATE, INPUTUSER, PRINTER_NAME
            )
            SELECT 
                STORAGE_CODE, MAT_LOT_NO, 'N', P_PRINT_CNT, PART_NO, EO_NO, QTY, IN_DATE, VEN_ID, PO_NO, REMARK, MAT_ID, PROD_DATE, SYSDATE, P_USER_ID, P_PRINTER
            FROM MES_INV_LOT_TK
            WHERE MAT_LOT_NO IN(CASE WHEN V_KITTING_CNT = 0 THEN P_LOT_NO END, V_SPLIT_LOT_NO);
    
            P_NEW_LOT_NO := V_SPLIT_LOT_NO;  
            IO_MESSAGE := 'OK';
            COMMIT;  
    
    
        EXCEPTION
            WHEN INVAILD_LOT THEN
                IO_MESSAGE := 'DEL OR DEFECT';
                ROLLBACK;
            WHEN QUANTITY_ERR THEN
                IO_MESSAGE := 'QAUNTITY 0';
                ROLLBACK;  
            WHEN OTHERS THEN
                IO_MESSAGE := 'OTHERS';
                ROLLBACK;
    END SPLIT_LOT;


END PKG_HWMX_LOT;