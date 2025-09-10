-- Καθηγητές
INSERT INTO users (role, user_code, first_name, last_name, email, password_hash, phone_mobile, phone_landline, address, created_at) VALUES
('faculty', 'F1001', 'Ελένη', 'Μαυρίδου', 'eleni.mavridou@mail.gr', '$2b$12$W8b9qdcGoZZOXixsZfQMuOoXxzQd1H/nBa9AjU0UpfEoA7CH/4V8e', '6990000001', '2100000001', 'Διεύθυνση', NOW()),
('faculty', 'F1002', 'Νίκος', 'Χατζηδάκης', 'nikos.chatzidakis@mail.gr', '$2b$12$U6KyojSL6GOfUsLPJzLs1.1TXofqKZjiX/oexZC7hZ9nNlzm3uP/S', '6990000002', '2100000002', 'Διεύθυνση', NOW()),
('faculty', 'F1003', 'Σοφία', 'Αρβανίτη', 'sofia.arvaniti@mail.gr', '$2b$12$7HHmki0Nnh8ZUZYyDW5XHeI2C.jFQv8jG0pjCZazXcNf5rQZTfgj2', '6990000003', '2100000003', 'Διεύθυνση', NOW()),
('faculty', 'F1004', 'Γιώργος', 'Δημόπουλος', 'giorgos.dimopoulos@mail.gr', '$2b$12$X3JxU03aMTW9V7QZIM/0E.CmO2Ig6WWG7el9MYE2U2eTFCE55kiG.', '6990000004', '2100000004', 'Διεύθυνση', NOW()),
('faculty', 'F1005', 'Άννα', 'Κωνσταντίνου', 'anna.konstantinou@mail.gr', '$2b$12$qzIaVqjzr8FhY9mk2EoPIe4mNU7SvAJj9e5IvMz2GyjIQvZc49ibW', '6990000005', '2100000005', 'Διεύθυνση', NOW());

-- Γραμματείες
INSERT INTO users (role, user_code, first_name, last_name, email, password_hash, phone_mobile, phone_landline, address, created_at) VALUES
('secretariat', 'S1001', 'Μαρία', 'Τσαούση', 'maria.tsaousi@mail.gr', '$2b$12$DYhOuqwREeTMLChQx.WHyOf/ArNnkG3uEPqJhHuYY/UfHSkGiMGbi', '6990000011', '2100000011', 'Διεύθυνση', NOW()),
('secretariat', 'S1002', 'Χρήστος', 'Ζήσης', 'christos.zisis@mail.gr', '$2b$12$KrE4K.NN2iH5E7DOcyFxge7Ssf8bD3CMMxF4A1bFFKLFgx.PsTXtC', '6990000012', '2100000012', 'Διεύθυνση', NOW()),
('secretariat', 'S1003', 'Κατερίνα', 'Πάνου', 'katerina.panou@mail.gr', '$2b$12$uU60MGQ6ZtFZDNebfv0/y.JzBSc9bmZzWV5a/7XhXvSBkFnyI8r22', '6990000013', '2100000013', 'Διεύθυνση', NOW()),
('secretariat', 'S1004', 'Σπύρος', 'Ρούσσος', 'spyros.roussos@mail.gr', '$2b$12$qT5m94O7WeZyYo1D9TyE5uPgK/dVGeq6cDaJIX/RY8lGAcvq7MLvq', '6990000014', '2100000014', 'Διεύθυνση', NOW()),
('secretariat', 'S1005', 'Αγγελική', 'Παπαδάκη', 'angeliki.papadaki@mail.gr', '$2b$12$yY6uqI7LtLVN53Qp6Gijv.TuHkQ.G9lqZ5ZpJ/Y/wHkq7H44RcPxO', '6990000015', '2100000015', 'Διεύθυνση', NOW());
