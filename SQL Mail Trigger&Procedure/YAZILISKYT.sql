CREATE OR REPLACE TRIGGER SOS_TABS.SOS_MAIL_GRUP_TNM_MAIL_TRG_YAZILI
   AFTER INSERT
   ON SOS_TABS.SER_CAGRI_LOG
   REFERENCING NEW AS NEW OLD AS OLD
   FOR EACH ROW

DECLARE
PRAGMA AUTONOMOUS_TRANSACTION;
   v_grp_kod VARCHAR2(20);
   v_islem_kodu VARCHAR2(25);

BEGIN
   IF :NEW.ISLEM_KODU = 'YAZILISKYT' AND MAILS IS NOT NULL
   THEN

   v_grp_kod := :NEW.GRP_KOD;
   v_islem_kodu := :NEW.ISLEM_KODU;
      SOS_TABS.SOS_MAIL_GRUP_TNM_YAZILI(v_grp_kod, v_islem_kodu);
END IF;
COMMIT;
END;