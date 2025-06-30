using BudgetsService.DTOs;
using BudgetsService.Services;
using Microsoft.AspNetCore.Mvc;

namespace BudgetsService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BudgetsController : ControllerBase
    {
        private readonly IBudgetServices _budgetsService;

        public BudgetsController(IBudgetServices budgetsService)
        {
            _budgetsService = budgetsService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BudgetDto>>> GetAll()
        {
            var transactions = await _budgetsService.GetAllBudgets();
            return Ok(transactions);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BudgetDto>> Get(int id)
        {
            var t = await _budgetsService.GetBudgetById(id);
            if (t == null) return NotFound();

            return Ok(t);
        }

        [HttpPost]
        public async Task<ActionResult<BudgetDto>> Create([FromBody] BudgetDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var newTransaction = await _budgetsService.CreateBudget(dto);

            return CreatedAtAction(nameof(Get), new { id = newTransaction.Id }, newTransaction);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] BudgetDto dto)
        {
            if (id != dto.Id) return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            bool success = await _budgetsService.UpdateBudget(id, dto);

            if (!success)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            bool success = await _budgetsService.DeleteBudget(id);

            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
