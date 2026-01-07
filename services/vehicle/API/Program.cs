using API.Endpoints;
using Application.Contracts.Repositories;
using Infrastructure.Database.Extensions;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddApplicationDbContext(builder.Configuration);

builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.MapVehicleEndpoints();

await app.RunAsync();
