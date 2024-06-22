namespace Bord.Server.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int ThreadId { get; set; }
        public int CreatorId { get; set; }

        public Comment()
        {
            
        }

    }
}
