namespace Bord.Server.Models
{
    public class Thread
    {    
        public int? Id { get; set; }
        public int BoardId { get; set; }
        public int CreatorId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }

        public Thread()
        {
            
        }

        public Thread(int id, int boardId, int creatorId, string title, string content)
        {
            Id = id;
            BoardId = boardId;
            CreatorId = creatorId;
            Title = title;
            Content = content;
        }




    }

}
