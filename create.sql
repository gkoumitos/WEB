CREATE DATABASE web_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE thesis_system;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role ENUM('student', 'faculty', 'secretariat') NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone_mobile VARCHAR(20),
    phone_landline VARCHAR(20),
    address TEXT,
    user_code VARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE thesis_topics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    description_file VARCHAR(255),
    created_by INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE theses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    topic_id INT,
    student_id INT,
    supervisor_id INT,
    status ENUM('proposed', 'active', 'under_review', 'completed', 'cancelled') NOT NULL DEFAULT 'proposed',
    started_at DATE,
    completed_at DATE,
    review_date DATETIME,
    review_location VARCHAR(255),
    repository_url TEXT,
    secretariat_decision_no VARCHAR(100),
    FOREIGN KEY (topic_id) REFERENCES thesis_topics(id),
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (supervisor_id) REFERENCES users(id)
);

CREATE TABLE committee_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    thesis_id INT NOT NULL,
    faculty_id INT NOT NULL,
    is_supervisor BOOLEAN DEFAULT FALSE,
    accepted_at DATETIME,
    rejected_at DATETIME,
    FOREIGN KEY (thesis_id) REFERENCES theses(id),
    FOREIGN KEY (faculty_id) REFERENCES users(id)
);

CREATE TABLE committee_invitations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    thesis_id INT NOT NULL,
    invitee_id INT NOT NULL,
    invited_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    response ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    responded_at DATETIME,
    FOREIGN KEY (thesis_id) REFERENCES theses(id),
    FOREIGN KEY (invitee_id) REFERENCES users(id)
);

CREATE TABLE grades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    thesis_id INT NOT NULL,
    grader_id INT NOT NULL,
    criterion_1 INT,
    criterion_2 INT,
    criterion_3 INT,
    overall FLOAT,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (thesis_id) REFERENCES theses(id),
    FOREIGN KEY (grader_id) REFERENCES users(id)
);

CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    thesis_id INT NOT NULL,
    author_id INT NOT NULL,
    text VARCHAR(300),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (thesis_id) REFERENCES theses(id),
    FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE TABLE status_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    thesis_id INT NOT NULL,
    from_status ENUM('proposed', 'active', 'under_review', 'completed', 'cancelled'),
    to_status ENUM('proposed', 'active', 'under_review', 'completed', 'cancelled') NOT NULL,
    changed_by INT,
    changed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    reason TEXT,
    FOREIGN KEY (thesis_id) REFERENCES theses(id),
    FOREIGN KEY (changed_by) REFERENCES users(id)
);

CREATE TABLE presentation_announcements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    thesis_id INT NOT NULL,
    title TEXT NOT NULL,
    scheduled_at DATETIME NOT NULL,
    location TEXT,
    link TEXT,
    FOREIGN KEY (thesis_id) REFERENCES theses(id)
);
