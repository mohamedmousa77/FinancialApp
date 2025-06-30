using System.ComponentModel.DataAnnotations;

namespace TransactionsService.DTOs
{
    public class TransactionDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Il nome è obbligatorio")]
        [StringLength(100, ErrorMessage = "Il nome non può superare 100 caratteri")]
        public string Name { get; set; }

        [Range(-1000000, 1000000, ErrorMessage = "L'importo deve essere compreso tra -1.000.000 e 1.000.000")]
        public decimal Amount { get; set; }

        [Required(ErrorMessage = "La data è obbligatoria")]
        public DateTime TransactionDate { get; set; }

        [Required(ErrorMessage = "La categoria è obbligatoria")]
        [StringLength(50, ErrorMessage = "La categoria non può superare 50 caratteri")]
        public string Category { get; set; }
    }
}
