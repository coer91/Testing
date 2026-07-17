CREATE OR REPLACE PACKAGE BODY PKG_HWMX_PDA_STORE AS   

    /* GET_GKD_ENTRY */
    PROCEDURE GET_GKD_ENTRY(
        P_LOT_NO IN  VARCHAR2,
        P_CURSOR OUT SYS_REFCURSOR
    )IS
        V_COUNT  NUMBER;
        V_VBELG  VARCHAR2(10);
        V_CURSOR SYS_REFCURSOR;
    BEGIN
        BEGIN
            SELECT COUNT(LOTNO), MAX(VBELG) 
              INTO V_COUNT, V_VBELG 
            FROM IF_AONE_LP_LOT_RECV
            WHERE LOTNO = P_LOT_NO;            
    
            IF V_COUNT = 0 THEN
                RAISE NO_DATA_FOUND;
            END IF;
            
            EXCEPTION
                WHEN OTHERS THEN
                    OPEN P_CURSOR FOR
                    SELECT 
                        'NG' AS RESULT,
                        '' AS LOTNO, 
                        '' AS PART_NO, 
                        '' AS VBELG, 
                        '' AS EBELN, 
                        '' AS EBELP, 
                        '' AS QTY, 
                        '' AS UNIT, 
                        '' AS VD_CD, 
                        '' AS EO_NO, 
                        '' AS WH_CD, 
                        '' AS MODEL, 
                        '' AS PROD_DATE, 
                        '' AS SCAN FROM DUAL;
                RETURN;        
        END;
    
        OPEN P_CURSOR FOR
        SELECT 
            VBELG AS RESULT, 
            LOTNO, 
            MATNR AS PART_NO, 
            VBELG, 
            EBELN, 
            EBELP, 
            QTY, 
            MEINS AS UNIT, 
            VD_CD, 
            EO_NO, 
            '' AS WH_CD, 
            '' AS MODEL, 
            PRODUCT_DT AS PROD_DATE, 
            '' AS SCAN
        FROM IF_AONE_LP_LOT_RECV
        WHERE MES_FLAG IS NULL  
          AND STS = 'C'
          AND VBELG = V_VBELG
        ORDER BY LOTNO;
    END GET_GKD_ENTRY;


    /* SET_GKD_ENTRY */
    PROCEDURE SET_GKD_ENTRY (
        P_LOT_NO     IN  VARCHAR2,
        P_PART_NO    IN  VARCHAR2,
        P_QTY        IN  VARCHAR2,
        P_UNIT       IN  VARCHAR2,
        P_PROD_DATE  IN  VARCHAR2,
        P_EO_NO      IN  VARCHAR2,
        P_VD_CD      IN  VARCHAR2,
        P_WH_CD      IN  VARCHAR2,
        P_MODEL      IN  VARCHAR2,
        P_USER_ID    IN  VARCHAR2,
        P_RETURN_MSG OUT VARCHAR2
    )IS
        V_TRAN_CODE     VARCHAR2(20);
        V_OLD_QTY       NUMBER;
        V_KD_LOT_YN     VARCHAR2(1);
        V_CORP_CD       VARCHAR2(4);
        V_WERKS         VARCHAR2(4);
        V_IN_DATE       VARCHAR2(20);
        V_MAT_LOT_NO    VARCHAR2(20);
        V_PART_NO       VARCHAR2(30);
        V_QTY           NUMBER;
        V_UNIT          VARCHAR2(20);
        V_PROD_DATE     VARCHAR2(20);
        V_EO_NO         VARCHAR2(30);
        V_VEN_ID        VARCHAR2(20);
        V_WH_CD         VARCHAR2(20);
        V_MAT_ID        VARCHAR2(20);
        V_CURSOR        SYS_REFCURSOR;
                
        V_CURSOR2           SYS_REFCURSOR;
        V_CASE_LABEL_ID     VARCHAR2(14);
        V_ERP_MAT_ID        VARCHAR2(30);
        V_ERP_WERKS         VARCHAR2(4);
        V_ERP_QTY           NUMBER;
        V_ERP_SLOC          VARCHAR2(10);
        V_ERP_ELOC          VARCHAR2(10);
        V_FACTORY           VARCHAR2(1);
        V_PO_NO             VARCHAR2(30);
    BEGIN

        V_CORP_CD       := 'MX10';
        V_TRAN_CODE     := 'TRAN_LOT_IN';         
        V_IN_DATE       :=  FC_GET_SITE_DT();    
        V_CASE_LABEL_ID := TO_CHAR(SYSDATE, 'YYYYMMDDHH24MISS');

        SELECT FACTORY 
        INTO V_FACTORY
        FROM ESAUSER
        WHERE USR_ID = P_USER_ID;       
        
        OPEN V_CURSOR FOR
        SELECT 
            B.WERKS, 
            A.LOT_NO,  
            CASE 
                WHEN REGEXP_LIKE(A.PART_NO, 'MTP') THEN REPLACE(A.PART_NO, 'MTP', '')
                WHEN REGEXP_LIKE(A.PART_NO, 'TP[^M]') THEN REPLACE(A.PART_NO, 'TP', '')
                ELSE A.PART_NO 
            END,
            TO_NUMBER(A.QTY), 
            A.UNIT, 
            A.PROD_DATE, 
            A.EO_NO, 
            A.VEN_ID, 
            A.WH_CD, 
            A.MODEL
            FROM(
                SELECT DISTINCT
                    REGEXP_SUBSTR(A.LOT_NO,    '[^;]+', 1, LEVEL) LOT_NO,
                    REGEXP_SUBSTR(A.PART_NO,   '[^;]+', 1, LEVEL) PART_NO, 
                    REGEXP_SUBSTR(A.QTY,       '[^;]+', 1, LEVEL) QTY,
                    REGEXP_SUBSTR(A.UNIT,      '[^;]+', 1, LEVEL) UNIT,
                    REGEXP_SUBSTR(A.PROD_DATE, '[^;]+', 1, LEVEL) PROD_DATE,
                    REGEXP_SUBSTR(A.EO_NO,     '[^;]+', 1, LEVEL) EO_NO,
                    REGEXP_SUBSTR(A.VEN_ID,    '[^;]+', 1, LEVEL) VEN_ID,
                    REGEXP_SUBSTR(A.WH_CD,     '[^;]+', 1, LEVEL) WH_CD,
                    REGEXP_SUBSTR(A.MODEL,     '[^;]+', 1, LEVEL) MODEL               
                FROM (
                    SELECT 
                        P_LOT_NO AS LOT_NO,
                        P_PART_NO AS PART_NO,
                        P_QTY AS QTY,
                        P_UNIT AS UNIT,
                        P_PROD_DATE AS PROD_DATE,
                        P_EO_NO AS EO_NO,
                        P_VD_CD AS VEN_ID,
                        P_WH_CD AS WH_CD,
                        P_MODEL AS MODEL
                    FROM DUAL) A
                CONNECT BY LEVEL <= LENGTH(REGEXP_REPLACE(A.LOT_NO, '[^;]+',''))+1
            )A
        INNER JOIN IF_ERP_MAT B ON A.PART_NO = B.MAT_ID;

        LOOP
            FETCH V_CURSOR INTO V_WERKS, V_MAT_LOT_NO, V_PART_NO, V_QTY, V_UNIT, V_PROD_DATE, V_EO_NO, V_VEN_ID, V_WH_CD, V_MAT_ID;
            EXIT WHEN V_CURSOR%NOTFOUND;

            PKG_MES_PDA.SET_BACK_LOG('SET_KD_STOCK_IN', V_MAT_LOT_NO ,V_TRAN_CODE, '',  SUBSTR(SQLERRM,0, 300), P_USER_ID); --2026/07/10 LDSS PDA GKD
            
            BEGIN
                UPDATE IF_AONE_LP_LOT_RECV SET 
                    MES_FLAG = 'Y'
                WHERE LOTNO = V_MAT_LOT_NO;

            EXCEPTION
                WHEN OTHERS THEN
                    V_KD_LOT_YN := 'N';
            END;
            
            SELECT MAX(EBELN) 
            INTO V_PO_NO
            FROM IF_AONE_LP_LOT_RECV
            WHERE LOTNO = V_MAT_LOT_NO
            GROUP BY LOTNO;
            
            INSERT INTO MES_INV_CKD_LOT_TK(WERKS, SHPM_NO, CONTNR_NO, CASE_LABEL_ID, LOTNO, ITEM_NO, LOT_QTY, MEINS, VD_CD, EO_NO, PRODUCT_DT )
            VALUES(
                'MX10', 
                'KD',
                V_CASE_LABEL_ID, 
                V_CASE_LABEL_ID, 
                V_MAT_LOT_NO,  
                CASE 
                    WHEN REGEXP_LIKE(V_PART_NO, 'MTP')    THEN REPLACE(V_PART_NO, 'MTP', '')
                    WHEN REGEXP_LIKE(V_PART_NO, 'TP[^M]') THEN REPLACE(V_PART_NO, 'TP' , '')
                    ELSE V_PART_NO 
                END,
                V_QTY, 
                V_UNIT, 
                V_VEN_ID, 
                V_EO_NO, 
                V_PROD_DATE
            );

            PKG_MES_PDA.SET_LOT_STOCK_IN_PROC(
                V_FACTORY, 
                V_TRAN_CODE, 
                V_MAT_LOT_NO, 
                V_PART_NO, 
                V_EO_NO, 
                V_QTY, 
                V_UNIT, 
                V_IN_DATE,  
                V_VEN_ID, 
                V_PO_NO, 
                V_PROD_DATE, 
                V_CASE_LABEL_ID, 
                P_USER_ID
            );           

            BEGIN 
                UPDATE MES_INV_LOT_TK SET 
                    LOC_NO = 'RAMPAS'
                WHERE MAT_LOT_NO = V_MAT_LOT_NO;

                INSERT INTO MES_INV_LOT_LOC_TK (LOC_NO, MAT_LOT_NO)
                VALUES ('RAMPAS', V_MAT_LOT_NO);
            
            EXCEPTION WHEN OTHERS THEN
                PKG_MES_PDA.SET_BACK_LOG('SET_LP_STOCK_IN', V_MAT_LOT_NO ,'', '',  SQLCODE || SUBSTR(SQLERRM,0, 200), P_USER_ID);
            END;

            INSERT INTO IF_AONE_CKD_CASE_SEND(CORP_CD, CONTNR_NO, CASE_LABEL_ID, GR_DATE)
            VALUES(V_CORP_CD, 'KD', V_MAT_LOT_NO, V_IN_DATE);
 
            MERGE INTO TMP_ERP_MOVE_SUMMARY_IF A
            USING DUAL B 
                ON(A.SHPM_NO       = P_USER_ID 
               AND A.CONTNR_NO     = 'KD' 
               AND A.CASE_LABEL_ID = V_CASE_LABEL_ID 
               AND A.WERKS         = V_WERKS 
               AND A.MAT_ID        = V_PART_NO 
            )
            WHEN NOT MATCHED THEN
                INSERT(A.SHPM_NO, A.CONTNR_NO , A.CASE_LABEL_ID, A.WERKS, A.MAT_ID, A.QTY)
                VALUES(
                    P_USER_ID, 
                    'KD', 
                    V_CASE_LABEL_ID, 
                    V_WERKS, 
                    CASE 
                        WHEN REGEXP_LIKE(V_PART_NO, 'MTP') THEN REPLACE(V_PART_NO, 'MTP', '')
                        WHEN REGEXP_LIKE(V_PART_NO, 'TP[^M]') THEN REPLACE(V_PART_NO, 'TP', '')
                        ELSE V_PART_NO 
                    END,    
                    V_QTY
                )
            WHEN MATCHED THEN 
                UPDATE SET 
                A.QTY = QTY + V_QTY;
        END LOOP;

        CLOSE V_CURSOR;

        OPEN V_CURSOR2 FOR
        SELECT WERKS, MAT_ID, QTY
        FROM TMP_ERP_MOVE_SUMMARY_IF
        WHERE SHPM_NO = P_USER_ID 
          AND CONTNR_NO = 'KD' 
          AND CASE_LABEL_ID = V_CASE_LABEL_ID;

        LOOP
            FETCH V_CURSOR2 
            INTO V_ERP_WERKS, V_ERP_MAT_ID, V_ERP_QTY;
            EXIT WHEN V_CURSOR2%NOTFOUND;

            V_ERP_SLOC := 'Z900';

            IF V_ERP_WERKS = 'MX11' AND V_FACTORY = 'A' THEN    
                V_ERP_ELOC := 'E110';
            ELSIF V_ERP_WERKS = 'MX11' AND V_FACTORY = 'P' THEN 
                V_ERP_ELOC := 'D120';
            ELSE 
                V_ERP_ELOC := 'C110';
            END IF; 
             
            INSERT INTO IF_ERP_MOVE(WORK_DATE, SEQ, MAT_ID, QTY, S_WERKS, S_SLOC, E_WERKS, E_SLOC, INPUTDATE, INPUTTIME, INPUTUSER)
            VALUES(
                V_IN_DATE, 
                IF_ERP_MOVE_SEQ.NEXTVAL,  
                CASE 
                    WHEN REGEXP_LIKE(V_ERP_MAT_ID, 'MTP') THEN REPLACE(V_ERP_MAT_ID, 'MTP', '')
                    WHEN REGEXP_LIKE(V_ERP_MAT_ID, 'TP[^M]') THEN REPLACE(V_ERP_MAT_ID, 'TP', '')
                    ELSE V_ERP_MAT_ID 
                END,
                V_ERP_QTY, 
                V_ERP_WERKS, 
                V_ERP_SLOC,
                V_ERP_WERKS, 
                V_ERP_ELOC, 
                SUBSTR(TO_CHAR(SYSDATE, 'YYYYMMDDHH24MISS'),1,8), 
                SUBSTR(TO_CHAR(SYSDATE, 'YYYYMMDDHH24MISS'),9,6), 
                P_USER_ID
            );

        END LOOP;

        CLOSE V_CURSOR2;

        P_RETURN_MSG := 'OK';
        COMMIT;

        EXCEPTION
        WHEN OTHERS THEN   
            P_RETURN_MSG := SUBSTR(SQLERRM,0, 20);         
            ROLLBACK;   
            PKG_MES_PDA.SET_BACK_LOG('SET_KD_STOCK_IN', CASE WHEN LENGTH(P_LOT_NO) > 30 THEN SUBSTR(P_LOT_NO,1,30) ELSE P_LOT_NO END ,'', '',  SUBSTR(SQLERRM,0, 300), P_USER_ID);
    END SET_GKD_ENTRY;


    /* SET_GKD_ENTRY_AONE */
    PROCEDURE SET_GKD_ENTRY_AONE (
        P_VBELG      IN  VARCHAR2,
        P_USER_ID    IN  VARCHAR2,
        P_RETURN_MSG OUT VARCHAR2
    )IS
        V_TRAN_CODE     VARCHAR2(20);
        V_OLD_QTY       NUMBER;
    
        V_KD_LOT_YN     VARCHAR2(1);
    
        V_CORP_CD       VARCHAR2(4);
        V_WERKS         VARCHAR2(4);
        V_IN_DATE       VARCHAR2(20);
        V_MAT_LOT_NO    VARCHAR2(20);
        V_PART_NO       VARCHAR2(30);
        V_QTY           NUMBER;
        V_UNIT          VARCHAR2(20);
        V_PROD_DATE     VARCHAR2(20);
        V_EO_NO         VARCHAR2(30);
        V_VEN_ID        VARCHAR2(20);
        V_WH_CD         VARCHAR2(20);
        V_MAT_ID        VARCHAR2(20);
        V_CURSOR        SYS_REFCURSOR;
            
        V_CURSOR2           SYS_REFCURSOR;
        V_CASE_LABEL_ID     VARCHAR2(14);
        V_ERP_MAT_ID        VARCHAR2(30);
        V_ERP_WERKS         VARCHAR2(4);
        V_ERP_QTY           NUMBER;
        V_ERP_SLOC          VARCHAR2(10);
        V_ERP_ELOC          VARCHAR2(10);
        V_FACTORY           VARCHAR2(1);
        V_PO_NO             VARCHAR2(30);
    
    BEGIN
    
        V_CORP_CD       := 'MX10';
        V_TRAN_CODE     := 'TRAN_LOT_IN';        
        V_IN_DATE       :=  FC_GET_SITE_DT();   
        V_CASE_LABEL_ID := TO_CHAR(SYSDATE, 'YYYYMMDDHH24MISS');
            
        PKG_MES_PDA.SET_BACK_LOG('SET_KD_STOCK_AONE_IN2', P_VBELG ,V_TRAN_CODE, '',  '', P_USER_ID);  
    
        SELECT FACTORY 
          INTO V_FACTORY
        FROM ESAUSER
        WHERE USR_ID = P_USER_ID;       
            
        OPEN V_CURSOR FOR
        SELECT 
            B.WERKS, 
            A.LOTNO,  
            CASE 
                WHEN REGEXP_LIKE(A.MATNR, 'MTP') THEN REPLACE(A.MATNR, 'MTP', '')
                WHEN REGEXP_LIKE(A.MATNR, 'TP[^M]') THEN REPLACE(A.MATNR, 'TP', '')
                ELSE A.MATNR 
            END,
            TO_NUMBER(A.QTY), 
            A.MEINS, 
            A.PRODUCT_DT, 
            A.EO_NO, 
            A.VD_CD
        FROM IF_AONE_LP_LOT_RECV A
        INNER JOIN IF_ERP_MAT B ON A.MATNR = B.MAT_ID
        WHERE A.VBELG = P_VBELG
          AND A.STS = 'C'
          AND B.USEGB IS NULL;
    
        LOOP
            FETCH V_CURSOR INTO V_WERKS, V_MAT_LOT_NO, V_PART_NO, V_QTY, V_UNIT, V_PROD_DATE, V_EO_NO, V_VEN_ID;
            EXIT WHEN V_CURSOR%NOTFOUND;
                
            BEGIN
                UPDATE IF_AONE_LP_LOT_RECV SET 
                    MES_FLAG = 'Y'
                WHERE LOTNO = V_MAT_LOT_NO;
    
                EXCEPTION
                    WHEN OTHERS THEN
                        V_KD_LOT_YN := 'N';
            END;    
            
            SELECT MAX(EBELN) 
              INTO V_PO_NO
            FROM IF_AONE_LP_LOT_RECV
            WHERE LOTNO = V_MAT_LOT_NO
            GROUP BY LOTNO;    
            
            INSERT INTO MES_INV_CKD_LOT_TK( WERKS, SHPM_NO, CONTNR_NO, CASE_LABEL_ID, LOTNO, ITEM_NO, LOT_QTY, MEINS, VD_CD, EO_NO, PRODUCT_DT )
            VALUES(
                'MX10', 
                'KD',
                V_CASE_LABEL_ID,
                V_CASE_LABEL_ID,
                V_MAT_LOT_NO, 
                CASE 
                    WHEN REGEXP_LIKE(V_PART_NO, 'MTP') THEN REPLACE(V_PART_NO, 'MTP', '')
                    WHEN REGEXP_LIKE(V_PART_NO, 'TP[^M]') THEN REPLACE(V_PART_NO, 'TP', '')
                    ELSE V_PART_NO 
                END,
                V_QTY, 
                V_UNIT, 
                V_VEN_ID, 
                V_EO_NO, 
                V_PROD_DATE
            );
    
            PKG_MES_PDA.SET_LOT_STOCK_IN_PROC(
                V_FACTORY, 
                V_TRAN_CODE, 
                V_MAT_LOT_NO, 
                V_PART_NO, 
                V_EO_NO, 
                V_QTY, 
                V_UNIT,
                V_IN_DATE, 
                V_VEN_ID,
                V_PO_NO,
                V_PROD_DATE,
                V_CASE_LABEL_ID,
                P_USER_ID
            );           
    
            INSERT INTO IF_AONE_CKD_CASE_SEND(CORP_CD, CONTNR_NO, CASE_LABEL_ID, GR_DATE)
            VALUES(V_CORP_CD, 'KD', V_MAT_LOT_NO, V_IN_DATE); 
    
            MERGE INTO TMP_ERP_MOVE_SUMMARY_IF A
            USING DUAL B
                ON( A.SHPM_NO      = P_USER_ID 
               AND A.CONTNR_NO     = 'KD' 
               AND A.CASE_LABEL_ID = V_CASE_LABEL_ID 
               AND A.WERKS         = V_WERKS 
               AND A.MAT_ID        = V_PART_NO 
            )
            WHEN NOT MATCHED THEN
                INSERT(A.SHPM_NO, A.CONTNR_NO , A.CASE_LABEL_ID, A.WERKS, A.MAT_ID, A.QTY)
                VALUES(
                    P_USER_ID, 
                    'KD', 
                    V_CASE_LABEL_ID, 
                    V_WERKS,  
                    CASE 
                        WHEN REGEXP_LIKE(V_PART_NO, 'MTP') THEN REPLACE(V_PART_NO, 'MTP', '')
                        WHEN REGEXP_LIKE(V_PART_NO, 'TP[^M]') THEN REPLACE(V_PART_NO, 'TP', '')
                        ELSE V_PART_NO 
                    END,
                    V_QTY
                )
            WHEN MATCHED THEN                                                                          
                UPDATE SET 
                A.QTY = QTY + V_QTY;  
    
        END LOOP;
    
        CLOSE V_CURSOR;
    
        OPEN V_CURSOR2 FOR
        SELECT WERKS, MAT_ID, QTY
        FROM TMP_ERP_MOVE_SUMMARY_IF
        WHERE SHPM_NO = P_USER_ID 
          AND CONTNR_NO = 'KD' 
          AND CASE_LABEL_ID = V_CASE_LABEL_ID;
    
        LOOP
            FETCH V_CURSOR2 INTO V_ERP_WERKS, V_ERP_MAT_ID, V_ERP_QTY;
            EXIT WHEN V_CURSOR2%NOTFOUND;
    
            V_ERP_SLOC := 'Z900';
    
            IF V_ERP_WERKS = 'MX11' AND V_FACTORY = 'A' THEN    
                V_ERP_ELOC := 'E110';
            
            ELSIF V_ERP_WERKS = 'MX11' AND V_FACTORY = 'P' THEN  -- DIECAST DIRECT GO LINESIDE BY CKJ(2016.1.6)
                V_ERP_ELOC := 'D120';
                
            ELSE  
                V_ERP_ELOC := 'C110';
            END IF;
    
             
            INSERT INTO IF_ERP_MOVE(WORK_DATE, SEQ, MAT_ID, QTY, S_WERKS, S_SLOC, E_WERKS, E_SLOC, INPUTDATE, INPUTTIME, INPUTUSER)
            VALUES(
                V_IN_DATE, 
                IF_ERP_MOVE_SEQ.NEXTVAL,  
                CASE 
                    WHEN REGEXP_LIKE(V_ERP_MAT_ID, 'MTP') THEN REPLACE(V_ERP_MAT_ID, 'MTP', '')
                    WHEN REGEXP_LIKE(V_ERP_MAT_ID, 'TP[^M]') THEN REPLACE(V_ERP_MAT_ID, 'TP', '')
                    ELSE V_ERP_MAT_ID 
                END,     
                V_ERP_QTY, 
                V_ERP_WERKS, 
                V_ERP_SLOC,
                V_ERP_WERKS, 
                V_ERP_ELOC, 
                SUBSTR(TO_CHAR(SYSDATE, 'YYYYMMDDHH24MISS'),1,8), 
                SUBSTR(TO_CHAR(SYSDATE, 'YYYYMMDDHH24MISS'),9,6), 
                P_USER_ID
            );
    
        END LOOP;
    
        CLOSE V_CURSOR2;
    
        P_RETURN_MSG := 'OK';
        COMMIT;
    
        EXCEPTION
            WHEN OTHERS THEN   
                P_RETURN_MSG := SUBSTR(SQLERRM,0, 20);         
                ROLLBACK;   
                PKG_MES_PDA.SET_BACK_LOG('SET_KD_STOCK_AONE_IN', P_VBELG ,'', '',  SUBSTR(SQLERRM,0, 300), P_USER_ID);
    END SET_GKD_ENTRY_AONE; 
    
END PKG_HWMX_PDA_STORE;