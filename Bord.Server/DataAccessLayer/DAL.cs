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
                string query = "INSERT INTO Board (name) VALUES (@name);";
                System.Diagnostics.Debug.WriteLine(board.Name);
                try
                {
                    using (SqlConnection connection = new SqlConnection(connStr))
                    {
                        System.Diagnostics.Debug.WriteLine(board.Name);
                        connection.Open();

                        using (SqlCommand command = new SqlCommand(query, connection))
                        {
                            command.Parameters.AddWithValue("@name", board.Name);
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
                string query = "INSERT INTO User (name, display) VALUES (@name, @display);";
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
                            command.Parameters.AddWithValue("@display", user.Display);
                            command.ExecuteNonQuery();
                        }
                    }
                }
                catch (Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine("Failed to create new user: " + ex.Message);
                }
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


    }
}
