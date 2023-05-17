CREATE TABLE Therapist (
  TherapistID INT(10) NOT NULL AUTO_INCREMENT,
  Name VARCHAR(100),
  Email VARCHAR(100),
  Password VARCHAR(100),
  PRIMARY KEY (TherapistID)
);

CREATE TABLE Client (
  ClientID INT(10) NOT NULL AUTO_INCREMENT,
  Name VARCHAR(100),
  OuchButton INT(10),
  TherapistID INT(10),
  PRIMARY KEY (ClientID),
  FOREIGN KEY (TherapistID) REFERENCES Therapist(TherapistID)
);

CREATE TABLE OuchButtonData (
  OuchButtonDataID INT(10) NOT NULL AUTO_INCREMENT,
  OuchButtonID INT(10),
  Location VARCHAR(100),
  Time TIMESTAMP,
  ClientID INT(10),
  PRIMARY KEY (OuchButtonDataID),
  FOREIGN KEY (ClientID) REFERENCES Client(ClientID)
);
