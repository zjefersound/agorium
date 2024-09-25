.PHONY: default dev install lazy help stop

default: help

dev:
	@echo "Starting backend and frontend servers in screen sessions..."
	@screen -dmS backend_server bash -c 'cd backend && composer serve && composer consume'
	@screen -dmS frontend_server bash -c 'cd frontend && npm run dev'
	@echo "Servers started. Use 'screen -ls' to list active sessions."

install:
	@echo "Installing backend and frontend dependencies..."
	@(cd backend && composer install)
	@(cd frontend && npm install)

i:
	@$(MAKE) install

migrate:
	@echo "Migrating database..."
	@(cd backend && composer migrate)

seed:
	@echo "Seeding database..."
	@(cd backend && composer seed)

consume:
	@echo "Running consumer..."
	@(cd backend && composer consume)

lazy:
	@echo "Starting backend server in screen session..."
	@(cd backend && composer install)
	@(cd backend && composer migrate)
	@(cd backend && composer seed)
	@screen -dmS backend_server bash -c 'cd backend && composer serve && composer consume'
	@echo "Installing frontend dependencies and starting frontend server in screen session..."
	@screen -dmS frontend_server bash -c 'cd frontend && npm i && npm run dev'
	@echo "Servers started. Use 'screen -ls' to list active sessions."

stop:
	@echo "Stopping backend and frontend servers..."
	@screen -S backend_server -X quit || echo "Backend server not running"
	@screen -S frontend_server -X quit || echo "Frontend server not running"
	@echo "Servers stopped."

help:
	@echo "Makefile Helper."
	@echo ""
	@echo "Usage: make [target]..."
	@echo ""
	@echo "Targets:"
	@echo "  dev        Start backend and frontend servers in screen sessions"
	@echo "  install    Install backend and frontend dependencies"
	@echo "  lazy       Install frontend dependencies and start servers in screen sessions"
	@echo "  stop       Stop backend and frontend servers running in screen sessions"
	@echo "  help       Show this help message"