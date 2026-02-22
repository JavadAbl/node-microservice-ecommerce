# Authentication Microservice

This is an authentication microservice that provides JWT-based authentication with role-based access control (RBAC) and claims hierarchy management. It is built with Node.js, Fastify, TypeScript, and Prisma ORM.

## Features

- JWT-based authentication with access/refresh tokens
- Role-based access control (RBAC)
- Hierarchical claims management (Service → Controller → Action)
- Fast and efficient token validation
- Claims tree endpoint for external service authorization
- User registration and login
- Token renewal and inspection

## Tech Stack

- **Node.js** - JavaScript runtime
- **Fastify** - Web framework for maximum performance
- **TypeScript** - Type safety
- **Prisma** - Database toolkit and ORM
- **SQLite** - Database for development
- **Zod** - Request validation
- **Bcrypt** - Password hashing
- **@fastify/jwt** - JWT authentication plugin

## Project Structure

```
src/
├── controllers/      # HTTP request handlers (not used due to Fastify structure)
├── services/         # Business logic
├── domain/           # Entities and interfaces
├── infrastructure/   # Database, config, external services
├── middleware/       # Authentication and authorization middleware
├── routes/           # API route definitions
├── utils/            # Utility functions
├── types/            # TypeScript type definitions
└── index.ts          # Application entry point
```

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/inspect-token` - Verify token validity
- `POST /auth/renew-token` - Renew access token

### Claims
- `GET /claims` - Get all claims
- `GET /claims/tree` - Get hierarchical claims tree
- `POST /claims` - Create claim
- `PUT /claims/:id` - Update claim
- `DELETE /claims/:id` - Delete claim

### Roles
- `GET /roles` - Get all roles
- `POST /roles` - Create role with claims
- `PUT /roles/:id` - Update role
- `DELETE /roles/:id` - Delete role

## Environment Variables

- `PORT` - Server port (default: 3000)
- `JWT_SECRET` - Secret for JWT signing
- `JWT_ACCESS_EXPIRES_IN` - Access token expiration (default: 15m)
- `JWT_REFRESH_EXPIRES_IN` - Refresh token expiration (default: 7d)
- `DATABASE_URL` - Database connection string
- `BCRYPT_SALT_ROUNDS` - Salt rounds for password hashing (default: 10)

## Scripts

- `npm run dev` - Start development server with auto-reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run lint` - Lint code
- `npm run prettier` - Format code

## Architecture

The service follows a clean architecture with clear separation of concerns:

- **Domain Layer**: Contains entities and interfaces
- **Service Layer**: Contains business logic
- **Infrastructure Layer**: Handles database and external services
- **Presentation Layer**: API routes and request handling

## Claims Hierarchy

The system implements a hierarchical claims system:
- **Service claims**: Top-level claims that grant access to all controllers/actions in that service
- **Controller claims**: Grant access to all actions in that controller
- **Action claims**: Fine-grained access to specific actions

When a service claim is included in a user's token, they automatically have access to all its controllers and actions, but only the service claim is stored in the token to reduce token size.

## Performance Considerations

- Minimal token payload (only top-level claims included)
- Fastify for optimal request handling performance
- Prisma for efficient database queries
- Caching-friendly architecture for claims trees