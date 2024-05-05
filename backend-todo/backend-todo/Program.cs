using backend_todo.Context;
using backend_todo.Interface;
using backend_todo.Mapping;
using backend_todo.Middleware;
using backend_todo.Models;
using backend_todo.Repositories;
using backend_todo.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<TareasDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("TareasDbContext"));
});

// interface
builder.Services.AddScoped<ITareaService, TareaService>();

builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

//automapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddIdentityApiEndpoints<ApplicationUser>()
    .AddEntityFrameworkStores<TareasDbContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGroup("/itentity").MapIdentityApi<ApplicationUser>();

app.UseAuthorization();

app.MapControllers();

app.Run();
