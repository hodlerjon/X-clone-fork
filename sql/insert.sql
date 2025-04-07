INSERT INTO users (username, email, password_hash, full_name, bio, profile_image_url)
VALUES
('ali123', 'ali@example.com', 'hash1', 'Ali Valiyev', 'Developer from Tashkent', NULL),
('lola_dev', 'lola@example.com', 'hash2', 'Lola Karimova', NULL, NULL),
('bekzod777', 'bekzod@example.com', 'hash3', 'Bekzod Salimov', 'Full-stack dev', NULL),
('zzz_ux', 'zzz@example.com', 'hash4', 'Zokir Qodirov', 'UX designer', NULL),
('qobil_uz', 'qobil@example.com', 'hash5', 'Qobil Jalolov', 'Backend guy', NULL),
('nargiza007', 'nargiza@example.com', 'hash6', 'Nargiza Nazarova', NULL, NULL),
('dev_sardor', 'sardor@example.com', 'hash7', 'Sardor Abdullayev', 'Rust developer', NULL),
('malika', 'malika@example.com', 'hash8', 'Malika Yunusova', 'Writes tech tutorials', NULL),
('programmer_abdu', 'abdu@example.com', 'hash9', 'Abdu Samadov', 'Mobile dev', NULL),
('dilnoza_designs', 'dilnoza@example.com', 'hash10', 'Dilnoza Zokirova', NULL, NULL);

INSERT INTO tweets (user_id, text_content, media_content, created_at)
VALUES
(1, 'Salom, bu mening birinchi tvitim!', NULL, '2025-03-01 09:15:00'),
(2, 'Bugun juda yaxshi kun bo‘ldi.', NULL, '2025-03-02 10:30:00'),
(3, 'Kod yozishdan charchadim, lekin davom etaman!', NULL, '2025-03-03 18:05:00'),
(4, 'Frontendmi, backendmi? Qaysi birini olasan', NULL, '2025-03-04 12:45:00'),
(5, 'Hayotda sabrli bo‘lish muhim.', NULL, '2025-03-05 08:20:00'),
(6, 'SQL o‘rganish qiziqarli ekan.', NULL, '2025-03-06 15:10:00'),
(7, 'Python bilan ishlash yoqimli.', NULL, '2025-03-07 13:50:00'),
(1, 'Yangi loyiha ustida ishlayapman.', NULL, '2025-03-09 16:45:00'),
(2, 'Telegram botlar haqida o‘ylayapman.', NULL, '2025-03-10 19:10:00'),
(3, 'Rest API haqida savollarim bor.', NULL, '2025-03-11 14:25:00'),
(4, 'Docker haqida o‘rganishni boshladim.', NULL, '2025-03-12 17:35:00'),
(5, 'Bugun juda sovuq havo.', NULL, '2025-03-13 09:05:00'),
(7, 'Bugun juda charchadim.', NULL, '2025-03-15 21:00:00'),
(8, 'O‘rganishni hech qachon to‘xtatma.', NULL, '2025-03-16 22:15:00'),
(1, 'Flask bilan mini ijtimoiy tarmoq qilayapman.', NULL, '2025-03-17 10:10:00'),
(2, 'Ma’lumotlar bazasini normalizatsiya qilishni o‘rgandim.', NULL, '2025-03-18 11:50:00'),
(3, 'Bugun juda foydali maqola o‘qidim.', NULL, '2025-03-19 13:00:00'),
(4, 'Har kuni bitta yangi narsa o‘rgan.', NULL, '2025-03-20 14:40:00'),
(7, 'Bugun Flask va PostgreSQL bilan ishladim.', NULL, '2025-03-23 15:45:00'),
(8, 'Frontend biroz chalkash, lekin o‘rgansa bo‘ladi.', NULL, '2025-03-24 08:10:00'),
(1, 'Twitter kloni yaratish ajoyib g‘oya!', NULL, '2025-03-25 18:20:00'),
(2, 'Har bir kod satri tajriba.', NULL, '2025-03-26 13:15:00'),
(3, 'Bugun test yozishni o‘rganayapman.', NULL, '2025-03-27 17:00:00'),
(4, 'Fikrlarimni kod bilan ifoda etaman.', NULL, '2025-03-28 21:10:00'),
(5, 'Yangi frameworkni sinab ko‘rdim.', NULL, '2025-04-01 14:25:00')
(1, 'Tondons Team :)', NULL, '2025-04-07 22:32:27.156391');
