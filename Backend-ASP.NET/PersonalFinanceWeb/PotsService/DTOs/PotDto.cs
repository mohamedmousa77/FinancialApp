using System.ComponentModel.DataAnnotations;

namespace PotsService.DTOs
{
    public class PotDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Il nome è obbligatorio")]
        [StringLength(100, ErrorMessage = "il nome non può superare 100 caratteri")]
        public string Name { get; set; }
        [Range(0, 1000000, ErrorMessage = "L'importo deve essere compreso tra 0 e 1.000.000")]
        [Required(ErrorMessage = "l'importo è obbligatoria")]
        public decimal TargetAmount { get; set; }
        public decimal CurrentAmount { get; set; }
        public string Color { get; set; }
    }
}
