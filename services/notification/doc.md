# Authentication Microservice Project Proposal

## 1. Project Overview

This project is an **authentication microservice** that other microservices in the system will use for authentication and authorization functionality. Performance is critical, as this service will be called frequently by other services to validate and authorize users.

The system must provide secure JWT-based authentication with refresh tokens, role-based access control (RBAC), and claims hierarchy management.

---

## 2. Domain Model

### 2.1 User

- Each user has:
  - `userId`
  - `roles` (one or more)
  - `claims` (see below)
- Users can register and login via API endpoints.

### 2.2 Roles

- Roles are predefined sets of claims.
- Example: `ProductManager` role automatically includes the `ProductService` claim.
- CRUD operations are required for roles:
  - Create, Read, Update, Delete
  - Assign claims to roles

### 2.3 Claims

- Claims are hierarchical:
  - **Service claim** → top-level claim
  - **Controller claim** → under a service
  - **Action claim** → under a controller
- Rules:
  - If a user has a service claim, they automatically have access to all its controllers and actions.
  - If a user has a controller claim, they have access to its actions.
  - Action claims are checked at the end for fine-grained authorization.
- CRUD operations are required for claims:
  - Create, Read, Update, Delete
- **Claim tree endpoint**: External services can fetch the hierarchical tree of claims at startup to perform authorization based on tokens.

---

## 3. Authentication & Authorization

### 3.1 JWT Access Tokens

- Tokens include payload:
  - `userId`
  - `userRole`
  - `claims` (only top-level claims, do **not** include children to reduce token size)
- Claims hierarchy is implicit:
  - Service claim covers all child controllers and actions.

### 3.2 Refresh Tokens

- Refresh tokens are stored in a persistent database for later validation and revocation.
- Endpoint for renewing access tokens using a refresh token is required.

---

## 4. API Endpoints

### 4.1 Authentication

- `POST /login` – user login
- `POST /register` – user registration
- `POST /inspect-token` – verify token validity
- `POST /renew-token` – renew access token using refresh token

### 4.2 Claims

- `GET /claims` – get all claims (for tree structure)
- `POST /claims` – create claim
- `PUT /claims/:id` – update claim
- `DELETE /claims/:id` – delete claim

### 4.3 Roles

- `GET /roles` – get all roles and their claims
- `POST /roles` – create role with claims
- `PUT /roles/:id` – update role and claims
- `DELETE /roles/:id` – delete role

---

## 5. Technical Implementation

### 5.1 Technology Stack

- **Node.js 24** with **Fastify** (performance critical)
- **TypeScript** for type safety
- **Prisma ORM** for database interactions
- **Zod** for request validation
- **Caching system** for cacheable scopes and claims

### 5.2 Architecture

- **Procedural and modular design**
- **Layers:**
  - **Controller** – handles HTTP requests and responses
  - **Service** – business logic
  - **Domain** – entities, models
  - **Infrastructure** – database access, cache, external service integration
- **Communication:**
  - Controllers communicate with services
  - Services communicate with infrastructure
- Use a **high-performance DTO mapping system** to convert entities to DTOs efficiently.

### 5.3 Performance Considerations

- Minimize token size by including only top-level claims.
- Use caching for frequently accessed claim trees.
- Keep architecture modular to optimize request handling.
- Avoid heavy frameworks; plain Fastify for minimal overhead.

---

## 6. Future Considerations

- Additional microservice-specific claims or roles may be added.
- Additional endpoints or optimizations for scaling under high load.
- Logging, metrics, and monitoring to track token validation and claims checks.

---

## 7. Notes

- This proposal may be updated as additional requirements are discovered.
- Any changes in domain, claims, roles, or endpoints should update this document accordingly.
