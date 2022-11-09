# Makefile for alive kiosk
include .env
all:
	@echo Make what?!

deploy-dev:
	npm run deploy:dev

install:
	@echo "Installing dependencies..."
	npm install

deploy-dev-alive-kiosk:
	@echo "Deploying alive kiosk..."
	@echo "Installing dependencies..."
	cd src/alive-kiosk && npm run watch

deploy-dev-kiosk:
	@echo "Deploying kiosk ${PROJECT_NAME}..."
	cd src/kiosks/${PROJECT_NAME} && npm run watch

deploy-dev-web-sockets:
	@echo "Deploying web sockets..."
	cd src/web-sockets && npm run watch

deploy-tests:
	@echo "Deploying tests..."
	cd src/tests && npm run watch