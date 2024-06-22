using Bord.Server.Models;
using System.Data.SqlClient;

namespace Bord.Server.DataAccessLayer
{
    public class DAL
    {
        private static string connStr = "Initial Catalog=BordDB;Data Source=LUCAS;Integrated Security=True;Encrypt=False;";

        public class BoardDAL
        {
            public void CreateBoard(Board board)
            {
                string query = "INSERT INTO Board (name, creatorId) VALUES (@name, @creatorId);";
                try
                {
                    using (SqlConnection connection = new SqlConnection(connStr))
                    {
                        connection.Open();

                        using (SqlCommand command = new SqlCommand(query, connection))
                        {
                            command.Parameters.AddWithValue("@name", board.Name);
                            command.Parameters.AddWithValue("@creatorId", board.CreatorId);
                            command.ExecuteNonQuery();
                        }
                    }
                }
                catch (Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine("Failed to create new board: " + ex.Message);
                }
            }

            public List<Board> GetAllBoards()
            {
                string query = "SELECT * FROM Board;";
                List<Board> boards = new List<Board>();
                try
                {
                    using (SqlConnection connection = new SqlConnection(connStr))
                    {
                        connection.Open();

                        using (SqlCommand command = new SqlCommand(query, connection))
                        {
                            using (SqlDataReader reader = command.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    Board board = new Board();
                                    board.Id = reader.GetInt32(0);
                                    board.Name = reader.GetString(1);
                                    boards.Add(board);
                                }
                            }
                        }
                    }
                    return boards;
                }

                catch (Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine("Failed to get boards: " + ex.Message);
                    return null;
                }

            }
        }


        public class UserDAL
        {
            public void CreateUser(User user)
            {
                // check if display name already exists
                if (ValidateRegistration(user))
                {
                    System.Diagnostics.Debug.WriteLine("User already exists");
                    return;
                }

                string query = "INSERT INTO [User] (name, password, display) VALUES (@name, @password, @display);";
                System.Diagnostics.Debug.WriteLine(user.Name);
                try
                {
                    using (SqlConnection connection = new SqlConnection(connStr))
                    {
                        System.Diagnostics.Debug.WriteLine(user.Name);
                        connection.Open();

                        using (SqlCommand command = new SqlCommand(query, connection))
                        {
                            command.Parameters.AddWithValue("@name", user.Name);
                            command.Parameters.AddWithValue("@password", user.Password);
                            command.Parameters.AddWithValue("@display", user.Display);
                            command.ExecuteNonQuery();
                        }
                    }
                }
                catch (Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine("Failed to create new user: " + ex.StackTrace);
                }
            }

            public User GetUserById(int userId)
            {
                string query = $"SELECT * FROM [User] WHERE id = @userId;";
                User user = new User();
                try
                {
                    using (SqlConnection connection = new SqlConnection(connStr))
                    {
                        connection.Open();

                        using (SqlCommand command = new SqlCommand(query, connection))
                        {
                            command.Parameters.AddWithValue("@userId", userId);
                            using (SqlDataReader reader = command.ExecuteReader())
                            {
                                if (reader.Read())
                                {
                                    user.Id = reader.GetInt32(0);
                                    user.Name = reader.GetString(1);
                                    user.Display = reader.GetString(2);
                                    // andere info nog
                                }
                            }
                        }
                    }
                    return user;
                }
                catch (Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine("Failed to get user: " + ex.Message);
                    return null;
                }
            }

            public User ValidateLogin(User user)
            {
                string query = $"SELECT * FROM [User] WHERE name = @name AND password = @password;";
                try
                {
                    using (SqlConnection connection = new SqlConnection(connStr))
                    {
                        connection.Open();

                        using (SqlCommand command = new SqlCommand(query, connection))
                        {
                            command.Parameters.AddWithValue("@name", user.Name);
                            command.Parameters.AddWithValue("@password", user.Password);
                            using (SqlDataReader reader = command.ExecuteReader())
                            {
                                if (reader.Read())
                                {
                                    user.Id = reader.GetInt32(0);
                                    user.Name = reader.GetString(1);
                                    user.Display = reader.GetString(2);
                                    // andere info nog
                                    return user;
                                }
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine("Failed to validate login: " + ex.Message);
                    return null;
                }
                return null;
            }

            public bool ValidateRegistration(User user)
            {
                string query = $"SELECT * FROM [User] WHERE name = @name";
                try
                {
                    using (SqlConnection connection = new SqlConnection(connStr))
                    {
                        connection.Open();

                        using (SqlCommand command = new SqlCommand(query, connection))
                        {
                            command.Parameters.AddWithValue("@name", user.Name);
                            using (SqlDataReader reader = command.ExecuteReader())
                            {
                                if (reader.Read())
                                {
                                    return true;
                                    //user.Id = reader.GetInt32(0);
                                    //user.Display = reader.GetString(2);
                                }
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine("Failed to validate registration: " + ex.Message);
                    return false;
                }
                return false;
            }
        }


        public class ThreadDAL
        {
            public void CreateThread(Models.Thread thread)
            {
                string query = "INSERT INTO Thread (boardId, OPId, postcontent, title) VALUES (@boardId, @OPId, @postcontent, @title);";
                System.Diagnostics.Debug.WriteLine(thread.Title);
                try
                {
                    using (SqlConnection connection = new SqlConnection(connStr))
                    {

                        connection.Open();

                        using (SqlCommand command = new SqlCommand(query, connection))
                        {
                            command.Parameters.AddWithValue("@title", thread.Title);
                            command.Parameters.AddWithValue("@postcontent", thread.Content);
                            command.Parameters.AddWithValue("@boardId", thread.BoardId);
                            command.Parameters.AddWithValue("@OPId", thread.CreatorId);
                            command.ExecuteNonQuery();
                        }
                    }
                }
                catch (Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine("Failed to create new thread: " + ex.Message);
                }
            }

            public List<Models.Thread> GetAllThreadsByBoardId(int boardId)
            {
                string query = $"SELECT * FROM Thread WHERE boardId = {boardId};";
                List<Models.Thread> threads = new List<Models.Thread>();
                try
                {
                    using (SqlConnection connection = new SqlConnection(connStr))
                    {
                        connection.Open();

                        using (SqlCommand command = new SqlCommand(query, connection))
                        {
                            using (SqlDataReader reader = command.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    Models.Thread thread = new Models.Thread();
                                    thread.Id = reader.GetInt32(0);
                                    thread.BoardId = reader.GetInt32(1);
                                    thread.CreatorId = reader.GetInt32(2);
                                    thread.Content = reader.GetString(3);
                                    thread.Title = reader.GetString(4);
                                    threads.Add(thread);
                                }
                            }
                        }
                    }
                    return threads;
                }

                catch (Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine("Failed to get threads: " + ex.Message);
                    return null;
                }



            }
        }

        public class CommentDAL
        {
            public void CreateThreadComment(Comment comment)
            {
                string query = "INSERT INTO Comment (threadId, userId, postcontent) VALUES (@threadId, @creatorId, @postcontent);";
                try
                {
                    using (SqlConnection connection = new SqlConnection(connStr))
                    {
                        connection.Open();

                        using (SqlCommand command = new SqlCommand(query, connection))
                        {
                            command.Parameters.AddWithValue("@threadId", comment.ThreadId);
                            command.Parameters.AddWithValue("@creatorId", comment.CreatorId);
                            command.Parameters.AddWithValue("@postcontent", comment.Content);
                            command.ExecuteNonQuery();
                        }
                    }
                }
                catch (Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine("Failed to create new comment: " + ex.Message);
                }
            }
            public List<Comment> GetCommentByThreadId(int threadId)
            {
                string query = "SELECT * FROM Comment WHERE threadId = @threadId;";
                List<Comment> comments = new List<Comment>();
                try
                {
                    using (SqlConnection connection = new SqlConnection(connStr))
                    {
                        connection.Open();

                        using (SqlCommand command = new SqlCommand(query, connection))
                        {
                            command.Parameters.AddWithValue("@threadId", threadId);

                            using (SqlDataReader reader = command.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    Comment comment = new Comment();
                                    comment.Id = reader.GetInt32(0);
                                    comment.ThreadId = reader.GetInt32(1);
                                    comment.CreatorId = reader.GetInt32(2);
                                    comment.Content = reader.GetString(3);
                                    comments.Add(comment);
                                }
                            }
                        }
                    }
                    return comments;
                }

                catch (Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine("Failed to get comments: " + ex.Message);
                    return null;
                }
            }
        }


        public class FeedDAL
        {
            public void CreateFeedPost(FeedPost feedpost)
            {
                string query = "INSERT INTO FeedPost (creatorId, postcontent) VALUES (@creatorId, @postcontent);";
                try
                {
                    using (SqlConnection connection = new SqlConnection(connStr))
                    {
                        connection.Open();

                        using (SqlCommand command = new SqlCommand(query, connection))
                        {
                            command.Parameters.AddWithValue("@creatorId", feedpost.CreatorId);
                            command.Parameters.AddWithValue("@postcontent", feedpost.PostContent);
                            command.ExecuteNonQuery();
                        }
                    }
                }
                catch (Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine("Failed to create new feedpost: " + ex.Message);
                }
            }


            public List<FeedPost> GetFeedById(int creatorId)
            {
                string query = "SELECT * FROM FeedPost WHERE creatorId = @creatorId;";
                List<FeedPost> feedposts = new List<FeedPost>();
                try
                {
                    using (SqlConnection connection = new SqlConnection(connStr))
                    {
                        connection.Open();

                        using (SqlCommand command = new SqlCommand(query, connection))
                        {
                            command.Parameters.AddWithValue("@creatorId", creatorId);

                            using (SqlDataReader reader = command.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    FeedPost feedpost = new FeedPost();
                                    feedpost.Id = reader.GetInt32(0);
                                    feedpost.CreatorId = reader.GetInt32(1);
                                    feedpost.PostContent = reader.GetString(2);
                                    feedposts.Add(feedpost);
                                }
                            }
                        }
                    }
                    return feedposts;
                }

                catch (Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine("Failed to get feedposts: " + ex.Message);
                    return null;
                }
            }


        }
    }
}


