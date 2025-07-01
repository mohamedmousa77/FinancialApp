using System.ComponentModel.DataAnnotations;

namespace BudgetsService.DTOs
{
    public class BudgetDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "La categoria è obbligatoria")]
        [StringLength(100, ErrorMessage = "la categoria non può superare 100 caratteri")]
        public string Category { get; set; }

        [Range(0, 1000000, ErrorMessage = "L'importo deve essere compreso tra 0 e 1.000.000")]
        [Required(ErrorMessage = "l'importo è obbligatoria")]
        public int Amount { get; set; }

        public int Spent { get; set; }

        public string Color { get; set; }
    }
}
