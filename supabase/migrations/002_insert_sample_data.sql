-- 샘플 데이터 삽입
-- 작성일: 2025-11-18

-- 1. 수집 에이전트 샘플 데이터
INSERT INTO agents (name, server_ip, version, install_path, status, collection_rate, processed_events, error_rate, last_connection) VALUES
('Log-01', '10.0.0.1', 'v2.4.1', '/opt/logmons/agent', 'normal', '98.5%', 1234567, '0.2%', NOW() - INTERVAL '1 minute'),
('Log-02', '10.0.0.2', 'v2.4.1', '/opt/logmons/agent', 'normal', '99.1%', 987654, '0.1%', NOW() - INTERVAL '5 minutes'),
('Log-03', '10.0.0.1', 'v2.4.0', '/opt/logmons/agent', 'disconnected', NULL, 0, NULL, NULL),
('Log-04', '10.0.0.2', 'v2.3.9', '/opt/logmons/agent', 'disconnected', NULL, 0, NULL, NULL),
('Log-05', '10.0.0.3', 'v2.4.1', '/opt/logmons/agent', 'error', '85.3%', 456789, '2.5%', NOW() - INTERVAL '30 minutes')
ON CONFLICT (name) DO NOTHING;

-- 2. 수집 대상 샘플 데이터
INSERT INTO targets (agent_id, name, type, status, size, last_collected) VALUES
((SELECT id FROM agents WHERE name = 'Log-01'), '/var/log/application.log', 'file', 'normal', '2.3GB', NOW() - INTERVAL '1 minute'),
((SELECT id FROM agents WHERE name = 'Log-01'), '/var/log/system.log', 'file', 'normal', '1.1GB', NOW() - INTERVAL '1 minute'),
((SELECT id FROM agents WHERE name = 'Log-01'), '/var/log/error.log', 'file', 'warning', '245MB', NOW() - INTERVAL '5 minutes'),
((SELECT id FROM agents WHERE name = 'Log-02'), '/var/log/nginx/access.log', 'file', 'normal', '5.2GB', NOW() - INTERVAL '5 minutes'),
((SELECT id FROM agents WHERE name = 'Log-05'), '/var/log/database.log', 'file', 'error', '892MB', NOW() - INTERVAL '30 minutes');

-- 3. Kafka 채널 샘플 데이터
INSERT INTO channels (channel_name, topic_name, partitions, offset_value, status, message_rate) VALUES
('log-collection-01', 'logs.application', 3, 1234567, 'normal', '1.2K msg/s'),
('log-collection-02', 'logs.system', 3, 987654, 'normal', '850 msg/s'),
('log-collection-03', 'logs.error', 2, 456789, 'normal', '320 msg/s'),
('log-collection-04', 'logs.nginx', 4, 2345678, 'normal', '1.8K msg/s'),
('log-collection-05', 'logs.database', 2, 654321, 'warning', '180 msg/s'),
('log-collection-06', 'logs.audit', 1, 123456, 'normal', '95 msg/s'),
('log-collection-07', 'logs.security', 2, 789012, 'normal', '420 msg/s'),
('log-collection-08', 'logs.analytics', 3, 345678, 'inactive', '-'),
('log-collection-09', 'logs.monitoring', 2, 567890, 'inactive', '-'),
('log-collection-10', 'logs.backup', 1, 234567, 'normal', '65 msg/s')
ON CONFLICT (channel_name) DO NOTHING;

-- 4. 배포 이력 샘플 데이터
INSERT INTO deployments (agent_id, deployment_type, version, status, started_at, completed_at, deployed_by) VALUES
((SELECT id FROM agents WHERE name = 'Log-01'), 'install', 'v2.4.1', 'completed', NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days' + INTERVAL '5 minutes', 'admin'),
((SELECT id FROM agents WHERE name = 'Log-02'), 'install', 'v2.4.1', 'completed', NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days' + INTERVAL '4 minutes', 'admin'),
((SELECT id FROM agents WHERE name = 'Log-03'), 'update', 'v2.4.0', 'failed', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days' + INTERVAL '2 minutes', 'admin'),
((SELECT id FROM agents WHERE name = 'Log-05'), 'install', 'v2.4.1', 'completed', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days' + INTERVAL '6 minutes', 'admin');

-- 5. 에이전트 활동 로그 샘플 데이터
INSERT INTO agent_activities (agent_id, action, result, details, created_at) VALUES
((SELECT id FROM agents WHERE name = 'Log-01'), '수집 시작', 'success', 'application.log', NOW() - INTERVAL '30 minutes'),
((SELECT id FROM agents WHERE name = 'Log-01'), '설정 업데이트', 'success', '수집 주기 변경', NOW() - INTERVAL '35 minutes'),
((SELECT id FROM agents WHERE name = 'Log-01'), '재시작', 'success', '시스템 재시작', NOW() - INTERVAL '40 minutes'),
((SELECT id FROM agents WHERE name = 'Log-02'), '수집 시작', 'success', 'nginx/access.log', NOW() - INTERVAL '32 minutes'),
((SELECT id FROM agents WHERE name = 'Log-05'), '수집 시작', 'failed', 'connection timeout', NOW() - INTERVAL '31 minutes');
