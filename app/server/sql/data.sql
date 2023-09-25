-- Insert dummy data for the Therapist table
INSERT INTO TherapistData (TherapistName, TherapistEmail, TherapistPassword)
VALUES
('John Doe', 'johndoe@example.com', 'password123'),
('Jane Smith', 'janesmith@example.com', 'letmein'),
('Bob Johnson', 'bjohnson@example.com', 'securepassword'),
('Sarah Brown', 'sarahbrown@example.com', '123456'),
('David Lee', 'davidlee@example.com', 'password');

-- Insert dummy data for the Client table
INSERT INTO ClientData (ClientName, ClientOuchButton, TherapistID)
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
INSERT INTO OuchButtonData (OuchButtonID, Latitude, Longitude, Time, ClientID)
VALUES
(1, 34.123456, -118.789012, DATE_ADD(NOW(), INTERVAL -1 DAY), 1),
(2, 34.234567, -118.890123, DATE_ADD(NOW(), INTERVAL -2 DAY), 1),
(1, 34.345678, -118.901234, DATE_ADD(NOW(), INTERVAL -3 DAY), 2),
(2, 34.456789, -118.912345, DATE_ADD(NOW(), INTERVAL -4 DAY), 2),
(1, 34.567890, -118.923456, DATE_ADD(NOW(), INTERVAL -5 DAY), 3),
(2, 34.678901, -118.934567, DATE_ADD(NOW(), INTERVAL -6 DAY), 3),
(3, 34.789012, -118.945678, DATE_ADD(NOW(), INTERVAL -7 DAY), 4),
(3, 34.890123, -118.956789, DATE_ADD(NOW(), INTERVAL -8 DAY), 4);