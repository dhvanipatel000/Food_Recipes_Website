﻿using foodRecipes.Data;
using foodRecipes.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace foodRecipes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepo _authRepo;
        public AuthController(IAuthRepo authRepo)
        {
            _authRepo = authRepo;
        }

        [HttpPost("Register")]
        public async Task<ActionResult> Register(UserRegisterDTO userDTO)
        {
            var res = await _authRepo.Register(new User() { UserName = userDTO.Username }, userDTO.Password);
            if (res == 0)
            {
                return BadRequest($"Cannot register {userDTO.Username}");
            }
            return Ok($"User registered successfully!");
        }

        [HttpPost("Login")]
        public async Task<ActionResult> Login(UserLoginDTO userDTO)
        {
            var res = await _authRepo.Login(userDTO.Username, userDTO.Password);
            if (res == null)
            {
                return BadRequest($"Incorrect username or password!");
            }
            return Ok(new {Token=res,status=200});
        }
    }
}
