namespace Bord.Server.Models
{
    public class FeedPostComment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int FeedPostId { get; set; }
        public int CreatorId { get; set; }

        public FeedPostComment()
        {

        }

    }
}
