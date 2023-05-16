-- Dummy data for the purposes of testing --
INSERT INTO Therapist (Name, Email, Password)
VALUES
('John Doe', 'johndoe@example.com', 'password123'),
('Jane Smith', 'janesmith@example.com', 'letmein'),
('Bob Johnson', 'bjohnson@example.com', 'securepassword');

INSERT INTO Client (Name, OuchButton, TherapistID)
VALUES
('Alice Brown', 1, 1),
('Bob Green', 2, 1),
('Charlie Grey', 1, 2),
('Dave Black', 2, 2),
('Eve White', 3, 3);

INSERT INTO OuchButtonData (OuchButtonID, Location, Time, ClientID)
VALUES
(1, 'Living room', '2022-01-01 08:00:00', 1),
(2, 'Bedroom', '2022-01-02 09:30:00', 2),
(1, 'Kitchen', '2022-01-03 13:15:00', 3),
(3, 'Bathroom', '2022-01-04 18:45:00', 4),
(1, 'Office', '2022-01-05 21:00:00', 5);