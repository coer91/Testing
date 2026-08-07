CREATE OR REPLACE PACKAGE BODY PKG_HWMX_PDA_STORE AS 

    /* GET_LP_ENTRY */
    PROCEDURE GET_LP_ENTRY(
        P_VBELG   IN  VARCHAR2,
        IO_CURSOR OUT SYS_REFCURSOR
    )IS BEGIN
        OPEN IO_CURSOR FOR
        SELECT 
            LOTNO       AS LOT_NUMBER, 
            MATNR       AS PART_NUMBER, 
            NVL(QTY, 0) AS QTY,
            EO_NO       AS EO_NUMBER,
            VBELG       AS VBELG
        FROM IF_AONE_LP_LOT_RECV
        WHERE MES_FLAG IS NULL 
          AND STS ='C' 
          AND VBELG = P_VBELG
        ORDER BY LOTNO; 
    END;


    /* SET_LP_ENTRY */
    PROCEDURE SET_LP_ENTRY(
        P_VBELG      IN  VARCHAR2,
        P_USER_ID    IN  VARCHAR2,
        IO_MESSAGE OUT VARCHAR2
    )IS
    
        V_WERKS             VARCHAR2(4 BYTE);
        V_TRAN_CODE         VARCHAR2(30 BYTE);
        V_MAT_LOT_NO        MES_INV_LOT_TK.MAT_LOT_NO%TYPE;
        V_PART_NO           MES_INV_LOT_TK.PART_NO%TYPE;
        V_EO_NO             MES_INV_LOT_TK.EO_NO%TYPE;
        V_QTY               MES_INV_LOT_TK.QTY%TYPE;
        V_OLD_QTY           MES_INV_LOT_TK.QTY%TYPE;
        V_VEN_ID            MES_INV_LOT_TK.VEN_ID%TYPE;
        V_PO_NO             MES_INV_LOT_TK.PO_NO%TYPE;
        V_PROD_DATE         MES_INV_LOT_TK.PROD_DATE%TYPE;
        V_UNIT              MES_INV_LOT_TK.UNIT%TYPE;
        V_IN_DATE           VARCHAR2(8 BYTE);
        V_INSP_FLAG         VARCHAR2(2);
        V_FACTORY           VARCHAR2(1 BYTE);
        V_CURSOR            SYS_REFCURSOR;
        V_FLAG              NUMBER := 0;
        TRAIL_DATA_MISSING  EXCEPTION;
    
        BEGIN
            V_TRAN_CODE := 'TRAN_LOT_IN';       
            V_IN_DATE   :=  FC_GET_SITE_DT();         
    
            SELECT FACTORY INTO V_FACTORY
            FROM ESAUSER
            WHERE USR_ID = P_USER_ID;
    
            FOR ROW IN (
                SELECT SPHNR AS VBELN, SPINR AS POSNR, VBELG, EBELN, EBELP, MATNR, SUM(QTY) AS QTY, MAX(MEINS) AS MEINS, MAX(VD_CD) AS VD_CD, MAX(GQMATV) AS INSP_FLAG
                FROM IF_AONE_LP_LOT_RECV
                WHERE VBELG = P_VBELG
                  AND STS = 'C'
                  AND MES_FLAG IS NULL
                GROUP BY SPHNR, SPINR,VBELG, EBELN, EBELP, MATNR 
            ) LOOP
    
                SELECT MIN(WERKS) INTO V_WERKS
                FROM IF_ERP_MAT
                WHERE MAT_ID = ROW.MATNR
                  AND USEGB IS NULL;
    
                INSERT INTO IF_GQMS_PO_R(COMP_CD, WERKS, VBELN, POSNR, VBELG, EBELN, EBELP, MATNR, QTY, MEINS, VD_CD, STS, PROD_DATE, GQMATV)
                VALUES('MX10', V_WERKS, ROW.VBELN, ROW.POSNR, ROW.VBELG, ROW.EBELN, ROW.EBELP, ROW.MATNR, ROW.QTY, ROW.MEINS, ROW.VD_CD, 'C', V_IN_DATE, ROW.INSP_FLAG);
            END LOOP;
    
            -- UPDATE LP LOT RECV 
            UPDATE IF_AONE_LP_LOT_RECV SET 
                MES_FLAG = 'Y', 
                MES_DATE = TO_CHAR(SYSDATE, 'YYYYMMDDHH24MISS')
            WHERE VBELG = P_VBELG
              AND STS = 'C'
              AND MES_FLAG IS NULL;
    
            -- UPDATE IF TRAILER INFO BY LEO 2020-08-14  
            UPDATE IF_AONE_TR_DETAIL_RECV SET 
                MES_FLAG ='Y', 
                MES_DATE = TO_CHAR(SYSDATE, 'YYYYMMDDHH24MISS')
            WHERE VBELG = P_VBELG;
    
            IF SQL%ROWCOUNT = 0 THEN
                RAISE TRAIL_DATA_MISSING;
            END IF;
    
            -- IF NO INSPECTION ITEMS RECEIVE
            FOR ROW_LOT IN (
                SELECT 
                    A.LOTNO,
                    CASE 
                        WHEN REGEXP_LIKE(A.MATNR, 'MTP') THEN REPLACE(A.MATNR, 'MTP', '')
                        WHEN REGEXP_LIKE(A.MATNR, 'TP[^M]') THEN REPLACE(A.MATNR, 'TP', '')
                        ELSE A.MATNR 
                    END AS MATNR,
                    A.EO_NO, 
                    A.QTY, 
                    A.MEINS, 
                    A.VD_CD, 
                    A.EBELN, 
                    A.PRODUCT_DT
                FROM IF_AONE_LP_LOT_RECV A
                WHERE A.VBELG = P_VBELG
                  AND A.STS = 'C'
                  AND NVL(A.GQMATV, 'N') = 'N'
            ) LOOP
    
                INSERT INTO MES_INV_CKD_LOT_TK(WERKS, SHPM_NO, CONTNR_NO, CASE_LABEL_ID, LOTNO, ITEM_NO, LOT_QTY, MEINS, VD_CD, EO_NO, PRODUCT_DT)
                VALUES('MX10', 'LP', ROW_LOT.EBELN, P_VBELG, ROW_LOT.LOTNO, ROW_LOT.MATNR, ROW_LOT.QTY, ROW_LOT.MEINS, ROW_LOT.VD_CD, REPLACE(ROW_LOT.EO_NO, '　' ,''), ROW_LOT.PRODUCT_DT);
    
                IF SQL%ROWCOUNT = 0 THEN
                    RAISE NO_DATA_FOUND;
                END IF;
    
                PKG_MES_PDA.SET_LOT_STOCK_IN_PROC(
                    V_FACTORY, 
                    V_TRAN_CODE, 
                    ROW_LOT.LOTNO, 
                    ROW_LOT.MATNR, 
                    ROW_LOT.EO_NO, 
                    ROW_LOT.QTY, 
                    ROW_LOT.MEINS, 
                    V_IN_DATE,  
                    ROW_LOT.VD_CD, 
                    ROW_LOT.EBELN, 
                    ROW_LOT.PRODUCT_DT, 
                    P_VBELG, 
                    P_USER_ID
                ); 
    
    
                BEGIN
                    UPDATE MES_INV_LOT_TK SET 
                        LOC_NO = 'RAMPAS'
                    WHERE MAT_LOT_NO = ROW_LOT.LOTNO;
    
                    INSERT INTO MES_INV_LOT_LOC_TK (LOC_NO, MAT_LOT_NO)
                    VALUES ('RAMPAS', ROW_LOT.LOTNO);
                
                EXCEPTION WHEN OTHERS THEN
                    PKG_MES_PDA.SET_BACK_LOG('SET_LP_STOCK_IN', ROW_LOT.LOTNO ,'', P_VBELG,  SQLCODE || SUBSTR(SQLERRM,0, 200), P_USER_ID);
                END;
    
                V_FLAG := 1;
            END LOOP;
    
            
            IF V_FLAG != 0 THEN
                --5. ERP I/F 처리 
                INSERT INTO IF_ERP_INPUT(BUKRS, WERKS, PO_NO, PO_SEQ, PROC_DT, MAT_ID, QTY, VBELG,  STORAGE, IN_DATE)
                SELECT 
                    MAX(B.BUKRS), 
                    B.WERKS, 
                    A.EBELN, 
                    A.EBELP, 
                    TO_CHAR(SYSDATE, 'YYYYMMDDHH24MISS'), 
                    A.MATNR, 
                    SUM(A.QTY), 
                    MAX(A.VBELG), 
                    CASE 
                        WHEN B.WERKS = 'MX11' AND V_FACTORY IN ('A', 'V') THEN 'E110' 
                        WHEN B.WERKS = 'MX11' AND V_FACTORY = 'P' THEN 'D110' 
                        ELSE 'C110' 
                    END, 
                    TO_CHAR(SYSDATE, 'YYYYMMDD')
                FROM IF_AONE_LP_LOT_RECV A
                INNER JOIN (SELECT MAX(BUKRS) AS BUKRS, MIN(WERKS) AS WERKS, MAT_ID FROM IF_ERP_MAT GROUP BY MAT_ID ) B ON A.MATNR = B.MAT_ID
                WHERE A.VBELG = P_VBELG
                  AND A.STS = 'C'
                  AND NVL(A.GQMATV, 'N') = 'N'
                GROUP BY A.VBELG, A.EBELN, A.EBELP, A.MATNR, B.WERKS;
    
                IF SQL%ROWCOUNT = 0 THEN
                    RAISE NO_DATA_FOUND;
                END IF;
            END IF;
    
            IO_MESSAGE := 'OK';
            COMMIT;
    
        EXCEPTION  
            WHEN TRAIL_DATA_MISSING THEN 
                IO_MESSAGE := 'TRAILER DATA MISSING';         
                ROLLBACK;   
                PKG_MES_PDA.SET_BACK_LOG('SET_LP_STOCK_IN', V_MAT_LOT_NO ,'', P_VBELG,  'TRAILER DATA ' || SQLCODE || SUBSTR(SQLERRM,0, 200), P_USER_ID);
    
            WHEN NO_DATA_FOUND THEN 
                IO_MESSAGE := 'MASTER DATA MISSING, CHECK SAP PART NUMBER';         
                ROLLBACK;   
                PKG_MES_PDA.SET_BACK_LOG('SET_LP_STOCK_IN', V_MAT_LOT_NO ,'', P_VBELG,  'MASTER DATA MISSING ' || SQLCODE || SUBSTR(SQLERRM,0, 200), P_USER_ID);
    
            WHEN OTHERS THEN   
                IO_MESSAGE := 'OTHERS';         
                ROLLBACK;   
                PKG_MES_PDA.SET_BACK_LOG('SET_LP_STOCK_IN', V_MAT_LOT_NO ,'', P_VBELG,  SQLCODE || SUBSTR(SQLERRM,0, 200), P_USER_ID);
    END;


    /* GET_CC_ENTRY */
    PROCEDURE GET_CC_ENTRY(
        P_DELIVERY_NO IN  VARCHAR,
        IO_CURSOR     OUT SYS_REFCURSOR
    )IS BEGIN
        OPEN IO_CURSOR FOR
        SELECT 
            A.LOT_NO    AS LOT_NUMBER, 
            A.PART_NO   AS PART_NUMBER, 
            NVL(QTY, 0) AS QTY,
            A.EO_NO     AS EO_NUMBER ,
            A.DLV_NO    AS DELIVERY_NUMBER,
            NVL(C.USE_FLAG, 'Y') AS HAS_EO      
        FROM MES_GLOVIS_CC_OUTPUT     A
        LEFT JOIN IF_GLOVIS_WIA_INPUT B ON A.DLV_NO  = B.DLV_NO
        LEFT JOIN MES_INV_MAT_EO_MA   C ON A.PART_NO = C.PART_NO AND A.EO_NO = C.EO_NO
        WHERE B.DLV_NO IS NULL
          AND A.CANCEL_FLAG = 'N' 
          AND A.DLV_NO = P_DELIVERY_NO;
    END GET_CC_ENTRY;


    /* SET_CC_ENTRY */
    PROCEDURE SET_CC_ENTRY(
        P_DELIVERY_NO IN  VARCHAR2,
        P_USER_ID     IN  VARCHAR2,
        IO_MESSAGE    OUT VARCHAR2
    ) IS
        V_COUNT  VARCHAR2(3);
        V_LOT_NO ARR_VALUE;
        
        BEGIN
            SELECT NVL(COUNT(DLV_NO),0)
            INTO V_COUNT
            FROM IF_GLOVIS_WIA_INPUT
            WHERE DLV_NO = P_DELIVERY_NO;
                     
            IF V_COUNT > 0 THEN
                IO_MESSAGE := 'ORDER ALREADY RECEIVED';
                RETURN;
            END IF;    
                     
            SELECT LOT_NO
            BULK COLLECT INTO V_LOT_NO
            FROM MES_GLOVIS_CC_OUTPUT
            WHERE DLV_NO = P_DELIVERY_NO
              AND CANCEL_FLAG = 'N';   
                
            PKG_MES_PDA_CC.SET_LOT_LOC_CC(V_LOT_NO, 'CL', 'RAMPAS', P_USER_ID, IO_MESSAGE);
                     
            IF IO_MESSAGE = 'OK' THEN 
                INSERT INTO IF_GLOVIS_WIA_INPUT(DLV_NO, RECEIVE_TIME, RECEIVE_USER) 
                VALUES(P_DELIVERY_NO,TO_CHAR(SYSDATE, 'YYYYMMDDHH24MISS'), P_USER_ID);
            ELSE
                RAISE NO_DATA_FOUND;
            END IF;
            
            IO_MESSAGE := 'OK';
            
         EXCEPTION 
            WHEN NO_DATA_FOUND THEN    
                IO_MESSAGE := 'NO ORDER DATA';
            WHEN OTHERS THEN
                ROLLBACK;
                PKG_MES_PDA.SET_BACK_LOG('SET_CC_STOCK_IN', '', '', '', SQLCODE || SUBSTR(SQLERRM,0, 200), P_USER_ID);
                IO_MESSAGE := 'ERROR';                   
    END SET_CC_ENTRY;


    /* GET_GKD_ENTRY */
    PROCEDURE GET_GKD_ENTRY(
        P_LOT_NO  IN  VARCHAR2,
        IO_CURSOR OUT SYS_REFCURSOR
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
                    OPEN IO_CURSOR FOR
                    SELECT 
                        'NG' AS LOT_NUMBER, 
                        'NG' AS PART_NUMBER, 
                        0    AS QTY, 
                        'NG' AS EO_NUMBER, 
                        'NG' AS UNIT, 
                        'NG' AS VENDOR_CODE, 
                        'NG' AS PRODUCTION_DATE,       
                        'NG' AS VBELG
                    FROM DUAL;
                RETURN;        
        END;
    
        OPEN IO_CURSOR FOR
        SELECT 
            LOTNO       AS LOT_NUMBER, 
            MATNR       AS PART_NUMBER, 
            NVL(QTY, 0) AS QTY, 
            EO_NO       AS EO_NUMBER, 
            MEINS       AS UNIT, 
            VD_CD       AS VENDOR_CODE, 
            PRODUCT_DT  AS PRODUCTION_DATE,
            VBELG       AS VBELG
        FROM IF_AONE_LP_LOT_RECV
        WHERE MES_FLAG IS NULL  
          AND STS = 'C'
          AND VBELG = V_VBELG
        ORDER BY LOTNO;
    END GET_GKD_ENTRY;


    /* SET_GKD_ENTRY */
    PROCEDURE SET_GKD_ENTRY(
        P_LOT_NO    IN  VARCHAR2,
        P_PART_NO   IN  VARCHAR2,
        P_QTY       IN  VARCHAR2,
        P_UNIT      IN  VARCHAR2,
        P_PROD_DATE IN  VARCHAR2,
        P_EO_NO     IN  VARCHAR2,
        P_VD_CD     IN  VARCHAR2,
        P_WH_CD     IN  VARCHAR2,
        P_MODEL     IN  VARCHAR2,
        P_USER_ID   IN  VARCHAR2,
        IO_MESSAGE  OUT VARCHAR2
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

        IO_MESSAGE := 'OK';
        COMMIT;

        EXCEPTION
        WHEN OTHERS THEN   
            IO_MESSAGE := SUBSTR(SQLERRM,0, 20);         
            ROLLBACK;   
            PKG_MES_PDA.SET_BACK_LOG('SET_KD_STOCK_IN', CASE WHEN LENGTH(P_LOT_NO) > 30 THEN SUBSTR(P_LOT_NO,1,30) ELSE P_LOT_NO END ,'', '',  SUBSTR(SQLERRM,0, 300), P_USER_ID);
    END SET_GKD_ENTRY;


    /* SET_GKD_ENTRY_AONE */
    PROCEDURE SET_GKD_ENTRY_AONE(
        P_VBELG    IN  VARCHAR2,
        P_USER_ID  IN  VARCHAR2,
        IO_MESSAGE OUT VARCHAR2
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
    
        IO_MESSAGE := 'OK';
        COMMIT;
    
        EXCEPTION
            WHEN OTHERS THEN   
                IO_MESSAGE := SUBSTR(SQLERRM,0, 20);         
                ROLLBACK;   
                PKG_MES_PDA.SET_BACK_LOG('SET_KD_STOCK_AONE_IN', P_VBELG ,'', '',  SUBSTR(SQLERRM,0, 300), P_USER_ID);
    END SET_GKD_ENTRY_AONE; 


    /* GET_CONTAINER_DOWNLOAD */
    PROCEDURE GET_CONTAINER_DOWNLOAD(  
        P_ORD_NO  IN  VARCHAR2,  
        IO_CURSOR OUT SYS_REFCURSOR
    ) IS
        V_DOWNLOAD_TEXT VARCHAR2(20);
        V_LOAD_TEXT     VARCHAR2(20);  
        
        BEGIN        
            OPEN IO_CURSOR FOR         
            SELECT 
                CASE_LABEL_ID,
                CASE 
                    WHEN MAX (OP_TYPE) = 'D' THEN 'DOWNLOAD' 
                    ELSE 'LOAD' 
                END AS TYPE 
            FROM MES_INV_CONTNR_ORDER_DETAIL  A
            LEFT JOIN MES_INV_CONTNR_ORDER_DA B ON A.ORD_NO = B.ORD_NO 
            WHERE DOWNLOAD_QTY IS NULL 
              AND B.ORD_STATUS != 'M'
              AND A.ORD_NO     = P_ORD_NO
            GROUP BY CASE_LABEL_ID 
            ORDER BY MAX(OP_TYPE);      
    END GET_CONTAINER_DOWNLOAD;


    /* SET_CONTAINER_DOWNLOAD */
    PROCEDURE SET_CONTAINER_DOWNLOAD(
        P_ORD_NO        IN  VARCHAR2,
        P_CASE_LABEL_ID IN  ARR_VALUE,
        P_USER_ID       IN  VARCHAR2,
        IO_MESSAGE      OUT VARCHAR2
    ) IS    
        V_PEND_DOWN VARCHAR2(20);
        V_PEND_LOAD VARCHAR2(20);
    BEGIN
        
        FOR I IN P_CASE_LABEL_ID.FIRST .. P_CASE_LABEL_ID.LAST 
        LOOP
            FOR ROW IN (SELECT A.CASE_LABEL_ID,
                               A.MAT_LOT_NO,
                               A.QTY,
                               A.PART_NO,
                               A.STORAGE_CODE,
                               B.OP_TYPE
                        FROM MES_INV_LOT_TK A
                        LEFT JOIN MES_INV_CONTNR_ORDER_DETAIL B ON A.CASE_LABEL_ID = B.CASE_LABEL_ID 
                                                               AND A.MAT_LOT_NO    = B.MAT_LOT_NO  
                                                               AND B.ORD_NO        = P_ORD_NO
                        WHERE A.CASE_LABEL_ID = P_CASE_LABEL_ID(I)) 
            LOOP BEGIN                                                
                MERGE INTO MES_INV_CONTNR_ORDER_DETAIL A
                USING DUAL B ON (A.ORD_NO = P_ORD_NO AND A.CASE_LABEL_ID = P_CASE_LABEL_ID(I) AND A.MAT_LOT_NO = ROW.MAT_LOT_NO )
                WHEN NOT MATCHED THEN
                    INSERT (A.ORD_NO, A.CASE_LABEL_ID, A.MAT_LOT_NO, A.PART_NO, A.OP_TYPE,  A.DOWNLOAD_QTY, INPUTDATE, INPUTUSER, DOWN_USER)
                    VALUES (P_ORD_NO, P_CASE_LABEL_ID(I), ROW.MAT_LOT_NO,  ROW.PART_NO, 'N', ROW.QTY, SYSDATE ,P_USER_ID, P_USER_ID)
                WHEN MATCHED THEN                                                                          
                    UPDATE SET 
                    A.DOWNLOAD_QTY = A.QTY, 
                    A.UPDATEDATE   = SYSDATE, 
                    UPDATEUSER     = P_USER_ID, 
                    DOWN_USER      = P_USER_ID;    
                        
                UPDATE MES_INV_CONTNR_ORDER_DA SET 
                    ORD_STATUS = 'P' 
                WHERE ORD_NO = P_ORD_NO;
                
                IF (ROW.OP_TYPE = 'D' OR ROW.OP_TYPE IS NULL) AND SUBSTR(ROW.STORAGE_CODE,2,3) = '000' THEN
                    PKG_MES_PDA.SET_LOT_LOC(ROW.MAT_LOT_NO,'CL','RAMPAS', P_USER_ID, IO_MESSAGE);    
                    
                    UPDATE MES_INV_LOT_HI SET 
                        REMARK = P_ORD_NO
                    WHERE LOG_SEQ = (SELECT MAX(LOG_SEQ) FROM MES_INV_LOT_HI WHERE MAT_LOT_NO = ROW.MAT_LOT_NO);           
                END IF;
                        
                EXCEPTION WHEN OTHERS THEN
                    IO_MESSAGE := 'NG';      
                    PKG_MES_PDA.SET_BACK_LOG('SET_CONTAINER_DOWNLOAD', '' , '', ROW.MAT_LOT_NO,  SUBSTR(SQLERRM,0, 300), 'LOT MOVE ERROR');                   
                END;
            END LOOP;  
                
            SELECT 
                NVL(SUM(CASE WHEN OP_TYPE = 'D' AND DOWNLOAD_QTY IS NULL THEN 1 ELSE 0 END),0),
                NVL(SUM(CASE WHEN OP_TYPE = 'L' AND LOAD_QTY IS NULL THEN 1 ELSE 0 END),0) 
                INTO V_PEND_DOWN, V_PEND_LOAD
            FROM MES_INV_CONTNR_ORDER_DETAIL
            WHERE ORD_NO = P_ORD_NO;    
                
            IF V_PEND_DOWN = 0 AND V_PEND_LOAD = 0 THEN  
                UPDATE MES_INV_CONTNR_ORDER_DA SET 
                    ORD_STATUS = 'C' 
                WHERE ORD_NO = P_ORD_NO;       
            END IF;        
        END LOOP;

        IO_MESSAGE := 'OK';
    END SET_CONTAINER_DOWNLOAD;
    

    /* GET_CONTAINER_LOAD */
    PROCEDURE GET_CONTAINER_LOAD(  
        P_ORD_NO IN  VARCHAR2, 
        IO_CURSOR OUT SYS_REFCURSOR
    ) IS     
        V_LOAD_COUNT         VARCHAR2(5);
        V_PENDING_DOWN_COUNT VARCHAR2(5);    
    BEGIN 
                      
        SELECT 
            NVL(SUM(CASE WHEN OP_TYPE = 'L' THEN 1 ELSE 0 END),0) ,
            NVL(SUM(CASE WHEN OP_TYPE = 'D' AND NVL(DOWNLOAD_QTY,0) = 0 THEN 1 ELSE 0 END),0) 
        INTO V_LOAD_COUNT, V_PENDING_DOWN_COUNT
        FROM MES_INV_CONTNR_ORDER_DETAIL 
        WHERE ORD_NO = P_ORD_NO;  
                
        IF V_LOAD_COUNT = 0 AND V_PENDING_DOWN_COUNT = 0 THEN 
            OPEN IO_CURSOR FOR
            SELECT 
                'RELOAD CONTAINER' AS CASE_LABEL_ID, 
                '' AS TYPE
            FROM DUAL;
            
        ELSE
            OPEN IO_CURSOR FOR          
            SELECT 
                CASE_LABEL_ID,
                'LOAD' TYPE 
            FROM MES_INV_CONTNR_ORDER_DETAIL A
            LEFT JOIN MES_INV_CONTNR_ORDER_DA B ON A.ORD_NO = B.ORD_NO 
            WHERE A.ORD_NO = P_ORD_NO 
              AND DOWNLOAD_QTY IS NOT NULL 
              AND LOAD_QTY IS NULL 
              AND OP_TYPE = 'L' 
              AND B.ORD_STATUS != 'M' 
            GROUP BY CASE_LABEL_ID ORDER BY MAX(OP_TYPE);
        END IF; 
    END GET_CONTAINER_LOAD;
    

    /* SET_CONTAINER_LOAD */
    PROCEDURE SET_CONTAINER_LOAD(
        P_ORD_NO        IN  VARCHAR2,
        P_CASE_LABEL_ID IN  ARR_VALUE,
        P_USER_ID       IN  VARCHAR2,
        IO_MESSAGE      OUT VARCHAR2
    ) IS           
        V_CONTNR_NO VARCHAR2(30);
        V_PEND_DOWN VARCHAR2(20);
        V_PEND_LOAD VARCHAR2(20);    
    BEGIN
        
        FOR I IN P_CASE_LABEL_ID.FIRST .. P_CASE_LABEL_ID.LAST
        LOOP
            FOR ROW IN (SELECT 
                            CASE_LABEL_ID,
                            MAT_LOT_NO,
                            QTY,
                            PART_NO
                        FROM MES_INV_LOT_TK
                        WHERE CASE_LABEL_ID = P_CASE_LABEL_ID(I))
            LOOP BEGIN                    
                MERGE INTO MES_INV_CONTNR_ORDER_DETAIL A
                USING DUAL B ON (A.ORD_NO = P_ORD_NO AND A.CASE_LABEL_ID = P_CASE_LABEL_ID(I) AND A.MAT_LOT_NO = ROW.MAT_LOT_NO )
                WHEN NOT MATCHED THEN
                    INSERT (A.ORD_NO, A.CASE_LABEL_ID, A.MAT_LOT_NO, A.PART_NO, A.OP_TYPE,  A.LOAD_QTY, INPUTDATE, INPUTUSER, LOAD_USER)
                    VALUES (P_ORD_NO, P_CASE_LABEL_ID(I), ROW.MAT_LOT_NO,  ROW.PART_NO, 'R', ROW.QTY, SYSDATE ,P_USER_ID, P_USER_ID)
                WHEN MATCHED  THEN                                                                          
                    UPDATE SET 
                        A.LOAD_QTY   = A.QTY, 
                        A.UPDATEDATE = SYSDATE, 
                        UPDATEUSER   = P_USER_ID, 
                        LOAD_USER    = P_USER_ID;    
                        
                EXCEPTION WHEN OTHERS THEN
                    IO_MESSAGE := 'NG';  
                    PKG_MES_PDA.SET_BACK_LOG('PRC_SET_CONTAINER_LOAD', '' , '', ROW.MAT_LOT_NO,  SUBSTR(SQLERRM,0, 300), 'ORDER UPDATE ERROR');                       
                END;
            END LOOP;                
                
            SELECT 
                NVL(SUM(CASE WHEN OP_TYPE = 'D' AND DOWNLOAD_QTY IS NULL THEN 1 ELSE 0 END),0) ,
                NVL(SUM(CASE WHEN OP_TYPE = 'L' AND LOAD_QTY IS NULL THEN 1 ELSE 0 END),0) 
            INTO V_PEND_DOWN, V_PEND_LOAD
            FROM MES_INV_CONTNR_ORDER_DETAIL
            WHERE ORD_NO = P_ORD_NO;
                 
            IF V_PEND_DOWN = 0 AND V_PEND_LOAD = 0 THEN
                SELECT CONTNR INTO V_CONTNR_NO
                FROM MES_INV_CONTNR_ORDER_DA WHERE ORD_NO = P_ORD_NO;
                     
                FOR ROW IN (SELECT 
                                CASE_LABEL_ID,
                                MAT_LOT_NO,
                                QTY,
                                OP_TYPE
                            FROM MES_INV_CONTNR_ORDER_DETAIL
                            WHERE ORD_NO = P_ORD_NO AND OP_TYPE = 'R')
                LOOP BEGIN                                           
                    
                    PKG_MES_PDA.SET_LOT_LOC(ROW.MAT_LOT_NO,'CY',V_CONTNR_NO, P_USER_ID, IO_MESSAGE); 
        
                    UPDATE MES_INV_LOT_HI SET 
                        REMARK = P_ORD_NO
                    WHERE LOG_SEQ = (SELECT MAX (LOG_SEQ) FROM MES_INV_LOT_HI WHERE MAT_LOT_NO = ROW.MAT_LOT_NO);           
                                
                    EXCEPTION WHEN OTHERS THEN
                        IO_MESSAGE := 'ORDER COMP. ERROR';      
                        PKG_MES_PDA.SET_BACK_LOG('PRC_SET_CONTAINER_DOWNLOAD', '' , '', ROW.MAT_LOT_NO,  SUBSTR(SQLERRM,0, 300), 'ORDER COMP. ERROR');                   
                    END;
                END LOOP;  
                     
                UPDATE MES_INV_CONTNR_ORDER_DA SET 
                    ORD_STATUS = 'C' 
                WHERE ORD_NO = P_ORD_NO;        
            END IF;   
        END LOOP;
    END SET_CONTAINER_LOAD;


    /* CHECK_CONTAINER_ORDER */
    PROCEDURE CHECK_CONTAINER_ORDER(
        P_ORD_NO        IN  VARCHAR2,
        P_CASE_LABEL_ID IN  VARCHAR2,
        IO_MESSAGE      OUT VARCHAR2
    ) IS
        V_CASE_LABEL_ID VARCHAR2(17);
        V_OP_TYPE       VARCHAR2(1);
        V_LOAD_QTY      VARCHAR2(4);
        
    BEGIN      
        SELECT CASE_LABEL_ID, MAX (OP_TYPE), MAX (LOAD_QTY)
        INTO V_CASE_LABEL_ID, V_OP_TYPE, V_LOAD_QTY
        FROM MES_INV_CONTNR_ORDER_DETAIL
        WHERE CASE_LABEL_ID = P_CASE_LABEL_ID AND ORD_NO = P_ORD_NO
        GROUP BY CASE_LABEL_ID;
                 
        IF V_OP_TYPE = 'D' THEN 
            IO_MESSAGE := 'CONTENEDOR MARCADO PARA DESCARGA';
        ELSIF V_OP_TYPE = 'L' AND V_LOAD_QTY IS NOT NULL THEN
            IO_MESSAGE := 'CASE YA CARGADO';
        ELSE
            IO_MESSAGE := 'OK';
        END IF;
                                    
        EXCEPTION 
            WHEN NO_DATA_FOUND THEN    
                IO_MESSAGE := 'OK';
            WHEN OTHERS THEN
                IO_MESSAGE := 'NG';                   
    END CHECK_CONTAINER_ORDER;

END PKG_HWMX_PDA_STORE;