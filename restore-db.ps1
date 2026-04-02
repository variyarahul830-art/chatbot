# Database Recovery Script for Docker Compose

Write-Host "=== Starting Database Recovery ===" -ForegroundColor Green

# Step 1: Start all containers
Write-Host "`n[1/7] Starting containers..." -ForegroundColor Cyan
docker-compose up -d
Start-Sleep -Seconds 5

# Step 2: Wait for PostgreSQL to be healthy
Write-Host "[2/7] Waiting for PostgreSQL to be ready..." -ForegroundColor Cyan
Start-Sleep -Seconds 30

# Step 3: Restore backend schema
Write-Host "[3/7] Restoring backend schema..." -ForegroundColor Cyan
Get-Content ./backend/schema.sql | docker-compose exec -T postgres psql -U postgres -d hasuradb

# Step 4: Restore Hasura schema
Write-Host "[4/7] Restoring Hasura schema..." -ForegroundColor Cyan
Get-Content ./hasura_schema.sql | docker-compose exec -T postgres psql -U postgres -d hasuradb

# Step 5: Apply migrations
Write-Host "[5/7] Applying migrations..." -ForegroundColor Cyan
Get-Content ./backend/migrations/add_role_to_users.sql | docker-compose exec -T postgres psql -U postgres -d hasuradb
Get-Content ./backend/migrations/add_answer_to_nodes.sql | docker-compose exec -T postgres psql -U postgres -d hasuradb
Get-Content ./backend/migrations/add_response_to_nodes.sql | docker-compose exec -T postgres psql -U postgres -d hasuradb
Get-Content ./backend/migrations/make_node_text_unique.sql | docker-compose exec -T postgres psql -U postgres -d hasuradb
Get-Content ./backend/migrations/update_chat_sessions_schema.sql | docker-compose exec -T postgres psql -U postgres -d hasuradb

# Step 6: Restart Hasura
Write-Host "[6/7] Restarting Hasura..." -ForegroundColor Cyan
docker-compose restart hasura
Start-Sleep -Seconds 10

# Step 7: Verify all containers
Write-Host "[7/7] Verifying containers..." -ForegroundColor Cyan
docker-compose ps

Write-Host "`n=== Database Recovery Complete ===" -ForegroundColor Green
Write-Host "Hasura: http://localhost:8081" -ForegroundColor Yellow
Write-Host "Admin Secret: myadminsecret" -ForegroundColor Yellow
Write-Host "Backend: http://localhost:8000" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Yellow
