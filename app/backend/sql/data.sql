-- Insert dummy data for the Therapist table
INSERT INTO Therapist (TherapistName, TherapistEmail, TherapistPassword)
VALUES
('John Doe', 'johndoe@example.com', 'password123'),
('Jane Smith', 'janesmith@example.com', 'letmein'),
('Bob Johnson', 'bjohnson@example.com', 'securepassword'),
('Sarah Brown', 'sarahbrown@example.com', '123456'),
('David Lee', 'davidlee@example.com', 'password');

-- Insert dummy data for the Client table
INSERT INTO Client (ClientName, ClientOuchButton, TherapistID)
VALUES
('Alice Brown', 1, 1),
('Bob Green', 2, 1),
('Charlie Grey', 1, 2),
('Eve White', 3, 3),
('Frank Black', 2, 3),
('Grace Taylor', 1, 4),
('Henry Carter', 2, 5),
('Ivy Anderson', 3, 5),
('Jack Roberts', 1, 2),
('Kelly Davis', 2, 4),
('Liam Wilson', 3, 1),
('Mia Thomas', 1, 3),
('Noah Harris', 2, 5),
('Olivia Clark', 1, 4),
('Penelope Young', 2, 3),
('Quinn Adams', 3, 2),
('Ryan Scott', 1, 5),
('Sofia Turner', 2, 2),
('Tyler Evans', 3, 1),
('Victoria Hill', 1, 4),
('William Allen', 2, 3);

-- Insert dummy data for the OuchButtonData table
INSERT INTO OuchButtonData (OuchButtonID, Location, Time, ClientID)
VALUES
(2, 'Living room', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY), 6),
(1, 'Kitchen', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY), 6),
(3, 'Bedroom', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY), 7),
(1, 'Bathroom', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY), 7),
(2, 'Living room', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY), 8),
(3, 'Kitchen', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY), 8),
(1, 'Bedroom', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY), 9),
(2, 'Bathroom', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY), 9),
(1, 'Living room', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY), 10),
(3, 'Kitchen', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY), 10),
(2, 'Bedroom', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY), 11),
(1, 'Bathroom', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY), 11),
(3, 'Living room', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY), 12),
(1, 'Kitchen', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY), 12),
(2, 'Bedroom', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY), 13),
(1, 'Bathroom', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY), 13),
(3, 'Living room', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY), 14),
(1, 'Kitchen', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY), 14),
(2, 'Bedroom', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY), 15),
(1, 'Bathroom', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY), 15),
(1, 'Living room', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY), 6),
(2, 'Kitchen', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY), 6),
(3, 'Bedroom', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY), 6),
(1, 'Bathroom', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY), 9),
(2, 'Living room', DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY), 10);