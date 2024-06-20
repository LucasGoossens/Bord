namespace Bord.Server.Models
{
    public class FeedPost
    {
        public int? Id{ get; set; }
        public int CreatorId { get; set; }
        public string PostContent { get; set; }

        public FeedPost()
        {
            
        }

    }
}
