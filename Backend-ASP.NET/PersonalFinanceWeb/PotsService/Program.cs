using Microsoft.EntityFrameworkCore;
using PotsService.Data;
using PotsService.Services;

namespace PotsService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddScoped<IPotServices, PotServices>();

            // Add the Controller
            builder.Services.AddControllers();

            //add the dbcontext
            builder.Services.AddDbContext<PotsDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            // Add the swegger for testing
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Add the cors for Angular
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
