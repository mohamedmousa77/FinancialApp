using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TransactionsService.Data;
using TransactionsService.DTOs;
using TransactionsService.Models;
using TransactionsService.Services;

namespace TransactionsService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactionsController( ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        // GET api/transactions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> GetAll()
        {
            var transactions = await _transactionService.GetAllTransactions();
            return Ok(transactions);
        }

        // GET api/transactions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TransactionDto>> Get(int id)
        {
            var t = await _transactionService.GetTransactionById(id);
            if (t == null) return NotFound();

            return Ok(t);
        }

        // POST api/transactions
        [HttpPost]
        public async Task<ActionResult<TransactionDto>> Create([FromBody] TransactionDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var newTransaction = await _transactionService.CreateTransaction(dto);
            
            return CreatedAtAction(nameof(Get), new { id = newTransaction.Id }, newTransaction);
        }

        // PUT api/transactions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] TransactionDto dto)
        {
            if (id != dto.Id) return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            bool success = await _transactionService.UpdateTransaction(id, dto);

            if (!success)
                return NotFound();
            
            return NoContent();
        }

        // DELETE api/transactions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            bool success = await _transactionService.DeleteTransaction(id);

            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
