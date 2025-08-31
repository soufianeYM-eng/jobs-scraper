# Jobs Scraper with Telegram Bot Integration

## Description
This NestJS application combines job scraping functionality with Telegram bot integration to provide job alerts via Telegram. The project is structured with two main modules:
- `JobsScraperModule` for job data extraction
- `TelegramModule` for bot communication

## Features
- REST API endpoints for job scraping
- Telegram bot integration for job alerts
- Environment configuration via `.env` file
- Modular architecture with clear separation of concerns

## Project Setup
```bash
# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Start development server
npm run start:dev
```

## Environment Variables
```env
# Required for Telegram bot functionality
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
```

## Endpoints
```bash
# Jobs Scraper Endpoints
GET /jobs
POST /jobs/trigger

# Telegram Bot Endpoints
GET /telegram
POST /telegram/webhook
```

## Telegram Bot Integration
The application includes:
- Telegraf bot framework integration
- ThrottlerGuard for rate limiting
- Update handlers in `src/telegram/telegram.update.ts`
- Service layer in `src/telegram/telegram.service.ts`

## Development
```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Testing
```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Implementation Details
1. **Jobs Scraper Module** (`src/jobs-scraper/`)
   - Controller: `jobs-scraper.controller.ts` (defines `/jobs` routes)
   - Service: `jobs-scraper.service.ts` (currently empty, ready for scraping logic implementation)
   - Module: `jobs-scraper.module.ts` (registers the module components)

2. **Telegram Module** (`src/telegram/`)
   - Bot configuration in `telegram.module.ts`
   - Update handlers in `telegram.update.ts` (currently empty)
   - Service layer in `telegram.service.ts` (currently empty)

3. **Configuration**
   - Uses NestJS ConfigModule for environment variables
   - Requires Telegram bot token for operation

## Architecture
The application follows NestJS modular pattern with:
- Core `AppModule` bootstrapping the application
- Feature modules for specific functionality
- Service layer for business logic
- Controller layer for HTTP endpoints
- Update handlers for Telegram bot interactions

## License
MIT License - see LICENSE file

## Author
Soufiane YM
