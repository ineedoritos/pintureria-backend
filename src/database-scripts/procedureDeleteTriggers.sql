-- EJECUTEN ESTO ANTES DE CUALQUIER COSA, PRIMERO EL XAMPP Y LUEGO ESTO EN PHP MYADMIN Y YA SI LE DAN NPM RUN DEV 

use pintureria;

DELIMITER //

CREATE PROCEDURE drop_all_bitacora_triggers()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE trigger_name VARCHAR(255);
    DECLARE cur CURSOR FOR 
        SELECT TRIGGER_NAME 
        FROM information_schema.TRIGGERS 
        WHERE TRIGGER_SCHEMA = DATABASE()
          AND TRIGGER_NAME LIKE 'trigger_%_after_%';

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur;

    read_loop: LOOP
        FETCH cur INTO trigger_name;
        IF done THEN
            LEAVE read_loop;
        END IF;
        SET @sql = CONCAT('DROP TRIGGER IF EXISTS ', trigger_name);
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END LOOP;

    CLOSE cur;
END;
//

DELIMITER ;
