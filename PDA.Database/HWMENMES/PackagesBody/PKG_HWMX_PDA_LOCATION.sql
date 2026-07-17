CREATE OR REPLACE PACKAGE BODY PKG_HWMX_PDA_LOCATION AS

    /* GET_MATERIAL_BY_LOCATION */
    PROCEDURE GET_MATERIAL_BY_LOCATION (
        P_LOCATION IN  VARCHAR2,
        P_CURSOR   OUT SYS_REFCURSOR
    )
    IS BEGIN
        OPEN P_CURSOR FOR
        SELECT 
            LOC_NO  AS "LOCATION",
            PART_NO AS PART_NUMBER
        FROM MES_RACK_LOC_PART_MA
        WHERE LOC_NO = P_LOCATION
        ORDER BY PART_NO ASC;
    END GET_MATERIAL_BY_LOCATION;

	
    /* SET_LOTS_IN_LOCATION */
    PROCEDURE SET_LOTS_IN_LOCATION (
        P_LOT_NO       IN  ARR_VALUE,
        P_STORAGE_CODE IN  VARCHAR2,
        P_LOC_NO       IN  VARCHAR2,
        P_USER_ID      IN  VARCHAR2,
        P_RETURN_MSG   OUT VARCHAR2
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
    
        P_RETURN_MSG := 'OK';
        COMMIT;
    
        EXCEPTION 
            WHEN LOC_EXCEPT THEN
                ROLLBACK;
                PKG_MES_PDA.SET_BACK_LOG('SET_LOT_LOC', '' ,P_LOC_NO, '',  'DIFFERENT PART ALLOCATE', P_USER_ID);
            WHEN OTHERS THEN
                P_RETURN_MSG := SUBSTR(SQLERRM,0,20);
                ROLLBACK;
                PKG_MES_PDA.SET_BACK_LOG('SET_LOT_LOC', '' ,P_LOC_NO, '',  SUBSTR(SQLERRM,0, 300), P_USER_ID);
    
    END SET_LOTS_IN_LOCATION;

 END PKG_HWMX_PDA_LOCATION;