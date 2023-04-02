using MessagePack;
using System.ComponentModel.DataAnnotations;

namespace foodRecipes.Models
{
    public class Recipes
    {
        public int Id { get; set; }
        public string? recipeName { get; set; }
        public int cookingTime { get; set; }
        public string? cuisine { get; set; }
        public string? ImageURL { get; set; }

        public string? ingredients { get; set; }
        public string? method { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
    }
}
