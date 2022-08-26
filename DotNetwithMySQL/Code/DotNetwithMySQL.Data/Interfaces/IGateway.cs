using MongoDB.Driver;

namespace DotNetwithMySQL.Data.Interfaces
{
    public interface IGateway
    {
        IMongoDatabase GetMongoDB();
    }
}
