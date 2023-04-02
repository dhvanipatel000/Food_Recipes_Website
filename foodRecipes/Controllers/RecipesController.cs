using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using foodRecipes.Models;
using Microsoft.AspNetCore.Authorization;
using System.Reflection.Metadata;

namespace foodRecipes.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly RecipesContext _context;

        public RecipesController(RecipesContext context)
        {
            _context = context;
        }

        // GET: api/Recipes
        [AllowAnonymous]
        [HttpGet]
        public IQueryable<Object> GetRecipe()
        {
            //return await _context.Blogs.ToListAsync();
            return from r in _context.Recipes
                   join u in _context.Users on r.UserId equals u.Id
                   select new
                   {
                       id = r.Id,
                       recipeName = r.recipeName,
                       cookingTime = r.cookingTime,
                       cuisine = r.cuisine,
                       ImageURL = r.ImageURL,
                       ingredients = r.ingredients,
                       method = r.method,
                       UserName = u.UserName

                   };

        }

        // get recipe by user id    
        [AllowAnonymous]
        [HttpGet("/recipe/{id}")]
        public async Task<ActionResult<IEnumerable<Recipes>>> GetRecipesById(long id)
        {
            return await _context.Recipes.Where(x => x.UserId == id).ToListAsync();

        }

        [AllowAnonymous]
        // GET: api/Recipes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Recipes>> GetRecipes(int id)
        {
            var recipes = await _context.Recipes.FindAsync(id);

            if (recipes == null)
            {
                return NotFound();
            }

            return recipes;
        }

        // PUT: api/Recipes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecipes(int id, Recipes recipes)
        {
            if (id != recipes.Id)
            {
                return BadRequest();
            }

            _context.Entry(recipes).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecipesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Recipes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Recipes>> PostRecipes(Recipes recipes)
        {
            _context.Recipes.Add(recipes);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecipes", new { id = recipes.Id }, recipes);
        }

        // DELETE: api/Recipes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecipes(int id)
        {
            var recipes = await _context.Recipes.FindAsync(id);
            if (recipes == null)
            {
                return NotFound();
            }

            _context.Recipes.Remove(recipes);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RecipesExists(int id)
        {
            return _context.Recipes.Any(e => e.Id == id);
        }
    }
}
