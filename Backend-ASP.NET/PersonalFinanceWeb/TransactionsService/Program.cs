using Microsoft.EntityFrameworkCore;
using TransactionsService.Data;
using TransactionsService.Services;

namespace TransactionsService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddScoped<ITransactionService, TransactionService>();

            builder.Services.AddControllers();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Add the DbContext
            builder.Services.AddDbContext<TransactionsDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngularClient",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:4200")
                              .AllowAnyHeader()
                              .AllowAnyMethod();
                    });
            });

            var app = builder.Build();

            app.UseCors("AllowAngularClient");

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                //app.UseSwaggerUI();
                app.UseSwaggerUI(config =>
                {
                    config.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
                    config.RoutePrefix = string.Empty;
                });
            }

            // Configure the HTTP request pipeline.

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
