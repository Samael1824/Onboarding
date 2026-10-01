using Microsoft.EntityFrameworkCore;
using Onboarding.Api.Models;

namespace Onboarding.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<OnboardingApplication> Applications => Set<OnboardingApplication>();
    public DbSet<CompanyProfile> CompanyProfiles => Set<CompanyProfile>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<OnboardingApplication>()
            .HasOne(a => a.User)
            .WithMany(u => u.Applications)
            .HasForeignKey(a => a.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<OnboardingApplication>()
            .HasOne(a => a.CompanyProfile)
            .WithOne(p => p.Application)
            .HasForeignKey<CompanyProfile>(p => p.ApplicationId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<OnboardingApplication>()
            .Property(a => a.Status)
            .HasConversion<string>();
    }
}
