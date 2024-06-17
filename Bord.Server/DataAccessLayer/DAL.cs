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
        }



    }
}
