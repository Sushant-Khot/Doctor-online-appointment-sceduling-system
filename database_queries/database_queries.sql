select * from users;
select * from appointments;
SELECT * FROM doctors;

SET FOREIGN_KEY_CHECKS = 0;  -- Disable foreign key checks
TRUNCATE TABLE users;      -- Now truncate the patients table
SET FOREIGN_KEY_CHECKS = 1;  -- Re-enable foreign key checks

drop table appointments;
drop table patients;
drop table doctors;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('Patient', 'Doctor') NOT NULL
);

CREATE TABLE doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    timeslot VARCHAR(100) NOT NULL DEFAULT '9:00-10:30,  11:00-1:00,  2:30-4:00,  6:00-9:00'
);



CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    patient_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    appointment_date DATE NOT NULL,
    timeslot VARCHAR(50) NOT NULL,
    appointment_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    specialization VARCHAR(100) NOT NULL,
    doctor_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',  -- e.g., pending, Aproved, canceled, completed
    FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
);

    --procedure for create user
DELIMITER //
CREATE PROCEDURE create_user(
    IN p_name VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_password CHAR(255),
    IN p_role enum('User','Patient','Doctor')
)
BEGIN

    -- Check if a user with the same name, email, already exists
    IF EXISTS (SELECT 1 FROM users WHERE username = p_name AND email = p_email ) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User already exists';
    ELSE
        -- Generate new user ID and insert new user if no duplicates found
        INSERT INTO users (username, email, password, role) values (p_name, p_email, p_password, p_role);
        
    END IF;
END //
DELIMITER ;

/* Automatically Update status Based on Appointment Time */

DELIMITER //

CREATE FUNCTION has_appointment_passed(appointment_date DATE, timeslot VARCHAR(50))
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    DECLARE appointment_datetime DATETIME;
    
    -- Convert the date and timeslot to a datetime
    SET appointment_datetime = STR_TO_DATE(CONCAT(appointment_date, ' ', LEFT(timeslot, 5)), '%Y-%m-%d %H:%i');
    
    -- Check if this datetime is before the current time
    RETURN appointment_datetime < NOW();
END;
//

DELIMITER ;

DELIMITER //

CREATE TRIGGER before_appointment_update
BEFORE UPDATE ON appointments
FOR EACH ROW
BEGIN
    -- Use the custom function to check if the appointment date and time have passed
    IF has_appointment_passed(NEW.appointment_date, NEW.timeslot) AND NEW.status = 'Pending' THEN
        -- If the appointment has passed and status is 'Pending', set status to 'Completed'
        SET NEW.status = 'Completed';
    ELSE
        -- Otherwise, keep the status as 'Pending'
        SET NEW.status = 'Pending';
    END IF;
END;
//

DELIMITER ;



//

DELIMITER ;



INSERT INTO doctors (id, name, specialization) VALUES
(1, 'Dr. John Smith', 'Cardiology'),
(2, 'Dr. Jane Doe', 'Dermatology'),
(3, 'Dr. Lee', 'Pediatrics'),
(4, 'Dr. Emily Johnson', 'Neurology'),
(5, 'Dr. Michael Brown', 'Orthopedics'),
(6, 'Dr. Sarah Wilson', 'Cardiology'),
(7, 'Dr. David Garcia', 'Dermatology'),
(8, 'Dr. Jessica Martinez', 'Pediatrics'),
(9, 'Dr. William Anderson', 'Neurology'),
(10, 'Dr. Olivia Thomas', 'Orthopedics');





CREATE EVENT update_appointments_status
ON SCHEDULE EVERY 1 HOUR
DO
  UPDATE appointments
  SET status = CASE
    WHEN CURDATE() > appointment_date OR
         (CURDATE() = appointment_date AND NOW() > appointment_time)
    THEN 'completed'
    ELSE 'pending'
  END;


