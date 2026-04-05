Here are **professional rules / best practices** that developers follow when building a backend using **NestJS** on **Node.js**.

These are very important if you want to write **production-level backend code**.

---

# Professional NestJS Project Rules

## 1. Use Modular Architecture

Always organize by **feature modules**, not by file type globally.

✅ Correct:

```id="m2xv7k"
modules/
   users/
   auth/
   products/
   orders/
```

❌ Wrong:

```id="u5e6nl"
controllers/
services/
entities/
```

Feature-based structure is professional.

---

# 2. Controller Should Be Thin

Controllers should only:

* Handle request
* Call service
* Return response

❌ Don’t write business logic in controller
✅ Business logic goes in service

```id="bndb0t"
Controller → Service → Database
```

---

# 3. Services Contain Business Logic

All logic like:

* calculations
* database queries
* validations
* workflows

Must be inside **services**.

---

# 4. Always Use DTOs

Use DTO for:

* Request validation
* Data structure
* Security

```id="g0v8h9"
dto/
   create-user.dto.ts
   update-user.dto.ts
   login.dto.ts
```

Rule:

> Never accept raw request body without DTO.

---

# 5. Use Entities for Database Models

Entities represent database tables.

```id="a4wrmn"
entities/
   user.entity.ts
   product.entity.ts
```

DTO ≠ Entity
DTO = Request data
Entity = Database table

---

# 6. Use Config Module for Environment Variables

Never hardcode:

* Ports
* Database URLs
* Secrets
* API keys

Use `.env` and config folder.

```id="9k8b7v"
config/
   configuration.ts
```

---

# 7. Use Common Folder for Shared Code

```id="p8j7k1"
common/
   guards/
   interceptors/
   filters/
   decorators/
   pipes/
   middleware/
```

Reusable code goes here.

---

# 8. Naming Conventions (Very Important)

Follow consistent naming:

| Type       | Format              |
| ---------- | ------------------- |
| Files      | kebab-case          |
| Classes    | PascalCase          |
| Variables  | camelCase           |
| DTO        | create-user.dto.ts  |
| Service    | users.service.ts    |
| Controller | users.controller.ts |

Example:

```id="0xqg5m"
users.controller.ts
users.service.ts
create-user.dto.ts
user.entity.ts
```

---

# 9. One Module = One Feature

Each module should represent a **business feature**:

| Module         | Responsibility  |
| -------------- | --------------- |
| AuthModule     | login/register  |
| UsersModule    | user management |
| ProductsModule | products        |
| OrdersModule   | orders          |
| PaymentsModule | payments        |

---

# 10. Use Dependency Injection (Very Important)

Never manually create services using `new`.

❌ Wrong:

```ts id="yv3npd"
const service = new UsersService();
```

✅ Correct:

```ts id="f3x2lj"
constructor(private usersService: UsersService) {}
```

NestJS uses dependency injection system.

---

# 11. Write Unit Tests

Professional projects always include tests using **Jest**.

Test files:

```id="x6r8jt"
users.service.spec.ts
auth.service.spec.ts
```

---

# 12. Use Repository Pattern / ORM Properly

Do database operations in:

* Repository
* Service
* ORM models

Not in controllers.

---

# 13. Use Global Exception Filters

Handle errors globally instead of try/catch everywhere.

```id="m5k9qe"
common/filters/http-exception.filter.ts
```

---

# 14. Use Validation Pipes

Always validate incoming requests.

```ts id="g3q1rb"
app.useGlobalPipes(new ValidationPipe());
```

