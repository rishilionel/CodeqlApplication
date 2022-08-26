using MongoDB.Driver;

namespace DotNetwithMSSQL.Data.Interfaces
{
    public interface IGateway
    {
        IMongoDatabase GetMongoDB();
    }
}
