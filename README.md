### Nest Command line

- nest new [project-name]
- nest g module [module-name]
- nest g controller tasks --no-spec
- nest g service tasks --no-spec

### Modules

- Singleton

### Services

- Source of business logic
- Not all providers are services
- @Injectable -> singleton -> single source of trurth

## DTO: Data Transfer Object

- Reduce boilerplate code
- Data validation
- Define shape of data for specific case (creating a task), thus not model definition
  > createShippingDto
  > updateShippingAddressDto
  > CreateTransitDto
- Use Class, not Interface

### Controller

- Handlers, annotated with @GET(), @POST(), ...
- Annotate params of handlers

> one shot: @Body(): body
> multiple shots: @Body('name') name: string, @Body('age') age: number ...

### Pipes

- Process arguments before they are passed into route handlers
  > data transformation: modify data and pass down
  > data validation: throw exceptions
- Can be Async (DB checking operations)
- Types of pipe:
  > Built-in: ValidationPipe, ParseIntPipe
  > Custom: @Injectable, implement PipeTransform, transform(value, metadata)
- Consume Pipes:
  > Handler level
  > Param Level
  > Global Level
- Validation Lib: class-validator, class-transformer

### Exception Handling

- Excections thrown if not handled in current scope, would be escalated to higher scopes

  > exceptions thrown at Service level
  > exception NotFound thrown at findById is escalated to either update or delete (code reuse, modular code)
  > flow: service -> route handler -> nestjs

- Exceptions are thrown at services

### TypeORM

- Concepts:
  > Entity: like Model, represent a table, on which we perform operations
  > Repository: compose complex db logic (using Entity), service will rely on repository and delegate work for it to process
- Repository:
  > Built-in methods
  > Custom methods
- Resources:
  > http://typeorm.delightful.studio
- Questions:
  - save() or insert()
  - remove() or delete()
    - remove = 2 operations = findById + remove (pros: findById can be reused)
    - delete = 1 operation (using less query to db)
      > DeleteResult { raw: [], affected: 1 }
- Db Migration
  - https://github.com/ambroiseRabier/typeorm-nestjs-migration-example

### Heroku stuff

- Link to App: https://task-management-nestjs.herokuapp.com/
- Set up CI
  > Create heroku app, turn on auto deploy when pushing to Github, if passing CI
  > Connect travis to Github repo
  > heroku logs --app task-management-nestjs

### Notes:

- value "1566029814429" is out of range for type integer
  > Uncaught error currently, seems like a postgres error, when find by id
- What is the role of ParseIntPipe
  > Validation failed (numeric string is expected)
- What to put in Repository, what not?
- signUp user:
  - First way: findOne({ username }) -> check exists -> save()
  - Second way: Restrict on db level: QueryFailedError: duplicate key value violates unique constraint "UQ_9b998bada7cff93fcb953b0c37e"
    > e.code = 23505

### Authentication

- Register (imports) JwtModule and PassportModule with AuthModule
- JwtModule internally exports JwtService, so we can inject it into AuthModule for our own sake

### Jest Testing

- expect(fn).rejects.toThrow()
- Make TypeORM easy to test:
  > new UserEntity(); -> this.create()
- jest.fn()
  > .mockReturnValue() -> sync function
  > .mockResolveValue() -> async function -> return a promise
  > .mockRejectedValue() -> async function
