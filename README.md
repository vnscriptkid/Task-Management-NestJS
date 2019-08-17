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
