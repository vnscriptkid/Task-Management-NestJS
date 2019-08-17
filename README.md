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
