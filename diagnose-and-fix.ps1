# Comprehensive Diagnostic and Fix Script

Write-Host "=== Starting Diagnostic Check ===" -ForegroundColor Green

# Step 1: Check all containers
Write-Host "`n[1/8] Checking containers..." -ForegroundColor Cyan
docker-compose ps

# Step 2: Check database tables exist
Write-Host "`n[2/8] Verifying database tables..." -ForegroundColor Cyan
docker-compose exec postgres psql -U postgres -d hasuradb -c "SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;"

# Step 3: Check table record counts
Write-Host "`n[3/8] Checking record counts..." -ForegroundColor Cyan
docker-compose exec postgres psql -U postgres -d hasuradb -c "
SELECT 'users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'workflows' as table_name, COUNT(*) as count FROM workflows
UNION ALL
SELECT 'nodes' as table_name, COUNT(*) as count FROM nodes
UNION ALL
SELECT 'edges' as table_name, COUNT(*) as count FROM edges
UNION ALL
SELECT 'chat_sessions' as table_name, COUNT(*) as count FROM chat_sessions
UNION ALL
SELECT 'faqs' as table_name, COUNT(*) as count FROM faqs
UNION ALL
SELECT 'pdf_documents' as table_name, COUNT(*) as count FROM pdf_documents
ORDER BY table_name;"

# Step 4: Check backend is healthy
Write-Host "`n[4/8] Checking backend health..." -ForegroundColor Cyan
docker-compose logs backend --tail=20

# Step 5: Restart backend
Write-Host "`n[5/8] Restarting backend..." -ForegroundColor Cyan
docker-compose restart backend
Start-Sleep -Seconds 10

# Step 6: Restart Hasura
Write-Host "`n[6/8] Restarting Hasura..." -ForegroundColor Cyan
docker-compose restart hasura
Start-Sleep -Seconds 10

# Step 7: Test API endpoints
Write-Host "`n[7/8] Testing API endpoints..." -ForegroundColor Cyan
Write-Host "Testing GET /api/sessions:" -ForegroundColor Yellow
Invoke-WebRequest -Uri "http://localhost:8000/api/sessions" -Method GET -ErrorAction SilentlyContinue | Select-Object StatusCode

Write-Host "Testing POST /api/workflows (create test workflow):" -ForegroundColor Yellow
$workflowData = @{
    name = "Test Workflow"
    description = "Auto-generated test workflow"
} | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:8000/api/workflows" -Method POST -ContentType "application/json" -Body $workflowData -ErrorAction SilentlyContinue | Select-Object StatusCode

# Step 8: Verify Hasura is tracking tables
Write-Host "`n[8/8] Checking Hasura GraphQL Schema..." -ForegroundColor Cyan
docker-compose logs hasura --tail=20

Write-Host "`n=== Diagnostic Complete ===" -ForegroundColor Green
Write-Host "✅ If all containers show 'healthy' or 'running', your system is ready!" -ForegroundColor Green
Write-Host "`nAccess points:" -ForegroundColor Yellow
Write-Host "  - Hasura: http://localhost:8081 (Admin Secret: myadminsecret)" -ForegroundColor Yellow
Write-Host "  - Backend API: http://localhost:8000/docs" -ForegroundColor Yellow
Write-Host "  - Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host "`nIf you still see errors, check the logs above for details." -ForegroundColor Cyan
