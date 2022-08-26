using MongoDB.Driver;

namespace DotnetMongo.Data.Interfaces
{
    public interface IGateway
    {
        IMongoDatabase GetMongoDB();
    }
}
