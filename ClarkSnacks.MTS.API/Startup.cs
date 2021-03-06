﻿using ClarkSnacks.MTS.API.Mapping;
using ClarkSnacks.MTS.EntityFramework.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using StructureMap;
using System;
using System.Security.Claims;

namespace ClarkSnacks.MTS.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            // Fix issue with looping
            services.AddControllers().AddNewtonsoftJson(x => 
                x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            //Add EF DataContext
            services.AddDbContext<MTSDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"),
                b => b.MigrationsAssembly("ClarkSnacks.MTS.EntityFramework")));

            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { 
                
                    Title = "Clark  Snacks - API",
                    Description = "Collection of Clark Snacks RESTful APIs.",
                    Contact = new Microsoft.OpenApi.Models.OpenApiContact { 
                        Name = "Clark Snacks", 
                        Email = "agatlin3@hotmail.com", Url = new Uri("http://localhost") },
                        Version = "1.0"
                });
            });

            // Setup AutoMapper
            var config = new AutoMapper.MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new ServiceMappingProfile());
            });
            services.AddSingleton(config.CreateMapper());

            // Enable Cors
            services.AddCors(options =>
            {
                // this defines a CORS policy called "default"
                options.AddPolicy("default", policy =>
                {
                    policy.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            services.AddMvc(option => option.EnableEndpointRouting = false)
                .SetCompatibilityVersion(CompatibilityVersion.Version_3_0);

            ConfigureAuthenticationService(services);

            return ConfigureIoC(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("../swagger/v1/swagger.json", "Clark Snacks API");

            });

            // Enable authentication middleware
            app.UseAuthentication();

            app.UseHttpsRedirection();
            app.UseCors("default");
            app.UseMvc();
        }

        private static IServiceProvider ConfigureIoC(IServiceCollection services)
        {
            var container = new Container();
            container.Configure(config =>
            {

                config.Scan(_ =>
                {
                    _.AssembliesFromApplicationBaseDirectory(assm => assm.FullName.ToLower().StartsWith("clarksnacks"));
                    _.WithDefaultConventions();
                });

                //Populate the container using the service collection
                config.Populate(services);
            });

            return container.GetInstance<IServiceProvider>();
        }

        /// <summary>
        /// Add Authentication Services
        /// </summary>
        /// <param name="services"></param>
        private void ConfigureAuthenticationService(IServiceCollection services)
        {
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.Authority = "https://clarksnacks.us.auth0.com/";
                options.Audience = "https://api.clarksnacks.com";
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    NameClaimType = ClaimTypes.NameIdentifier
                };
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("read:lot", policy => policy.Requirements.Add(new HasScopeRequirement("read:lot", "https://clarksnacks.us.auth0.com/")));
                options.AddPolicy("write:lot", policy => policy.Requirements.Add(new HasScopeRequirement("write:lot", "https://clarksnacks.us.auth0.com/")));
                options.AddPolicy("read:inspection", policy => policy.Requirements.Add(new HasScopeRequirement("read:inspection", "https://clarksnacks.us.auth0.com/")));
                options.AddPolicy("write:inspection", policy => policy.Requirements.Add(new HasScopeRequirement("write:inspection", "https://clarksnacks.us.auth0.com/")));
            });

            // register the scope authorization handler
            services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();
        }
    };
}
