using System.ComponentModel.DataAnnotations;

namespace BillsService.Models
{
    public class Bill
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Il nome è obbligatorio")]
        [StringLength(100, ErrorMessage = "il nome non può superare 100 caratteri")]
        public string BillName { get; set; }
        [Range(0, 1000000, ErrorMessage = "L'importo deve essere compreso tra 0 e 1.000.000")]
        [Required(ErrorMessage = "l'importo è obbligatoria")]
        public decimal Amount { get; set; }
        [Required(ErrorMessage = "Il date è obbligatorio")]
        public DateTime Date { get; set; }
        [Required(ErrorMessage = "Lo stato è obbligatorio")]
        public string Status { get; set; }
    }
}
