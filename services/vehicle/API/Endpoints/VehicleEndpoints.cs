using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace API.Endpoints;

// 1. Create a static class
public static class TodoEndpoints
{
    // 2. Create an extension method for IEndpointRouteBuilder
    public static void MapVehicleEndpoints(this IEndpointRouteBuilder app)
    {
        // 3. Define your group inside this method
        var group = app.MapGroup("/todos")
                       .WithTags("Todos"); // 'WithTags' organizes them in Swagger UI

        // 4. Define your routes using the group
        group.MapGet("/", (TodoService service) => service.GetAll());

        group.MapGet("/{id}", (int id, TodoService service) => service.GetById(id));

        group.MapPost("/", (TodoTask task, TodoService service) =>
        {
            service.Add(task);
            return Results.Created($"/todos/{task.Id}", task);
        });
    }
}
