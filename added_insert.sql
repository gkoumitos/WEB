INSERT INTO thesis_topics
  (title, summary, description_file, created_by, created_at, is_active)
VALUES
  (
    'Ανάπτυξη Συνεργατικού Συστήματος Υποστήριξης Διπλωματικών',
    'Υλοποίηση web συστήματος με ρόλους (φοιτητής/διδάσκων/γραμματεία), ροές κατάστασης και AJAX front-end.',
    '/uploads/pdf/diplomatikes_support_spec.pdf',
    11,
    NOW(),
    TRUE
  );
INSERT INTO theses
(topic_id, student_id, supervisor_id, status, started_at)
VALUES
  (
    (SELECT id FROM thesis_topics WHERE title = 'Ανάπτυξη Συνεργατικού Συστήματος Υποστήριξης Διπλωματικών' ORDER BY id DESC LIMIT 1),
    (SELECT id FROM users WHERE role='student' AND email='valanto.mpakostergioy@mail.gr' LIMIT 1),
    11,
    'proposed',
    CURDATE()
  );

-- Δήλωσε accepted
UPDATE committee_invitations
SET response='accepted', responded_at = NOW()
WHERE thesis_id = 2
  AND invitee_id IN (13, 14);

-- Βάλ’ τους και στον πίνακα μελών (αν δεν μπήκαν ακόμη)
INSERT INTO committee_members (thesis_id, faculty_id, is_supervisor)
SELECT 2, 13, 0
WHERE NOT EXISTS (
  SELECT 1 FROM committee_members
  WHERE thesis_id=2 AND faculty_id=13
);

INSERT INTO committee_members (thesis_id, faculty_id, is_supervisor)
SELECT 2, 14, 0
WHERE NOT EXISTS (
  SELECT 1 FROM committee_members
  WHERE thesis_id=2 AND faculty_id=14
);

-- Αν έχουν γίνει accepted τουλάχιστον 2 μέλη, κάνε την διπλωματική active
UPDATE theses t
SET t.status = 'active'
WHERE t.id = 2
  AND (
    SELECT COUNT(*) FROM committee_members cm
    WHERE cm.thesis_id = t.id AND cm.is_supervisor = 0
  ) >= 2;

-- Προαιρετικά: ακύρωσε τυχόν υπόλοιπες εκκρεμείς προσκλήσεις
UPDATE committee_invitations
SET response='cancelled', responded_at=NOW()
WHERE thesis_id = 2 AND response='pending';

-- Παράδειγμα: 3 κριτήρια + συνολικός (overall). Βάλε ό,τι νούμερα θες.
INSERT INTO grades (thesis_id, grader_id, criterion_1, criterion_2, criterion_3, overall, submitted_at)
VALUES
  (2, 13, 8, 9, 9, 8.7, NOW()),
  (2, 14, 9, 8, 9, 8.7, NOW()),
  (2, 12, 9, 9, 10, 9.3, NOW())
ON DUPLICATE KEY UPDATE
  criterion_1 = VALUES(criterion_1),
  criterion_2 = VALUES(criterion_2),
  criterion_3 = VALUES(criterion_3),
  overall     = VALUES(overall),
  submitted_at= VALUES(submitted_at);
