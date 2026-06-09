CREATE DATABASE IF NOT EXISTS development_meetings;
USE development_meetings;

CREATE TABLE IF NOT EXISTS groups (
    group_id INT AUTO_INCREMENT PRIMARY KEY,
    group_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS meetings (
    meeting_id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    description TEXT NOT NULL,
    room VARCHAR(100) NOT NULL,
    FOREIGN KEY (group_id) REFERENCES groups(group_id) ON DELETE CASCADE
);

INSERT INTO groups (group_name) VALUES
('Team UI'),
('Team Mobile'),
('Team React'),
('Team Backend'),
('Team DevOps');

INSERT INTO meetings (group_id, start_time, end_time, description, room) VALUES
(1, DATE_ADD(NOW(), INTERVAL 2 DAY), DATE_ADD(NOW(), INTERVAL 2 DAY + INTERVAL 1 HOUR), 'Sprint planning Q3', 'Blue Room'),
(1, DATE_SUB(NOW(), INTERVAL 3 DAY), DATE_SUB(NOW(), INTERVAL 3 DAY - INTERVAL 2 HOUR), 'UI Review session', 'New York Room'),
(2, DATE_ADD(NOW(), INTERVAL 1 DAY), DATE_ADD(NOW(), INTERVAL 1 DAY + INTERVAL 2 HOUR), 'Mobile release prep', 'Large Board Room'),
(3, DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY - INTERVAL 1 HOUR), 'React 18 migration', 'Blue Room'),
(3, DATE_ADD(NOW(), INTERVAL 5 DAY), DATE_ADD(NOW(), INTERVAL 5 DAY + INTERVAL 3 HOUR), 'Component library review', 'New York Room'),
(4, DATE_SUB(NOW(), INTERVAL 7 DAY), DATE_SUB(NOW(), INTERVAL 7 DAY - INTERVAL 1 HOUR), 'API design review', 'Large Board Room');
