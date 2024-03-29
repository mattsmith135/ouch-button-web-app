CREATE TABLE TherapistData (
  TherapistID INT(10) NOT NULL AUTO_INCREMENT,
  TherapistName VARCHAR(100),
  TherapistEmail VARCHAR(100),
  TherapistPassword VARCHAR(100),
  PRIMARY KEY (TherapistID)
);

CREATE TABLE ClientData (
  ClientID INT(10) NOT NULL AUTO_INCREMENT,
  ClientName VARCHAR(100),
  ClientOuchButton INT(10),
  TherapistID INT(10),
  PRIMARY KEY (ClientID),
  FOREIGN KEY (TherapistID) REFERENCES TherapistData(TherapistID)
);

CREATE TABLE OuchButtonData (
  OuchButtonDataID INT(10) NOT NULL AUTO_INCREMENT,
  OuchButtonID INT(10),
  Latitude DECIMAL(8,6),
  Longitude DECIMAL(9,6),
  Time TIMESTAMP,
  ClientID INT(10),
  PRIMARY KEY (OuchButtonDataID),
  FOREIGN KEY (ClientID) REFERENCES ClientData(ClientID)
);
