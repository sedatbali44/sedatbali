CREATE OR REPLACE PROCEDURE SOS_TABS.SOS_MAIL_GRUP_TNM_YAZILI
IS

m_subj  SOS_MES_DEF.MES_CODE%TYPE;
v_subj VARCHAR2(50);

m_body  SOS_MES_DEF.MES_EXPLANATION%TYPE;
v_body VARCHAR2(3000);

to_mail    SOS_MAIL_GRUP_TNM.MAILS%TYPE;
v_to VARCHAR2(1000);


CURSOR cur_email IS

SELECT * FROM SOS_MAIL_GRUP_TNM sos
 LEFT JOIN  SER_CAGRI_LOG ser
 ON sos.GRP_KOD =ser.ISLEM_KODU
 WHERE ser.ISLEM_KODU ='YAZILISKYT' AND  sos.MAILS  IS NOT NULL;

crm cur_email%ROWTYPE;

BEGIN
  SELECT MES_CODE,MES_EXPLANATION INTO m_subj,m_body FROM SOS_MES_DEF  WHERE MES_CODE =  'YAZILI_KAYIT_MES' OR MES_CODE = 'YAZILI_KAYIT_MES_SUBJECT';
  SELECT MAILS INTO to_mail  FROM SOS_MAIL_GRUP_TNM;

	FOR crm IN cur_email
	   LOOP
            BEGIN

        v_to   := to_mail;
        v_subj := m_subj;
        v_body := m_body;

                IF v_to IS NOT NULL
                THEN
                    sis_pkg_mail.insert_email(
                        NULL,
                        NULL,
                        NULL,
                        NULL,
                        v_to,
                        v_subj,
                        v_body);
                END IF;
            END;
        END LOOP;

END SOS_MAIL_GRUP_TNM_YAZILI;