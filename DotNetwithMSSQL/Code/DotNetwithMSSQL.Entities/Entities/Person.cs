using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DotNetwithMSSQL.Entities.Entities
{
    [BsonIgnoreExtraElements]
    public class Person
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id  { get; set; }
        public string Name  { get; set; }
        
    }

}
