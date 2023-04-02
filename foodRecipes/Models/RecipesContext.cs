using System.Collections.Generic;
using System.Reflection.Emit;
using System.Reflection.Metadata;
using Microsoft.EntityFrameworkCore;
namespace foodRecipes.Models
{
    public class RecipesContext : DbContext
    {
        public RecipesContext(DbContextOptions<RecipesContext> options)
           : base(options)
        {

        }
        public DbSet<Recipes> Recipes => Set<Recipes>();
        public DbSet<User> Users => Set<User>();
    }
}
