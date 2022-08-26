using DotnetMongo.Data.Interfaces;
using DotnetMongo.Entities.Entities;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Core.Bindings;
using System;
using System.Collections.Generic;
using System.Text;

namespace DotnetMongo.Data.Repositories
{
    public class PersonRepository : IPersonRepository
    {
        private IGateway _gateway;
        private string _collectionName = "Person";

        public PersonRepository(IGateway gateway)
        {
            _gateway = gateway;
        }
        public IEnumerable<Person> GetAll()
        {
            var result = _gateway.GetMongoDB().GetCollection<Person>(_collectionName)
                            .Find(new BsonDocument())
                            .ToList();
            return result;
        }

        public bool Save(Person entity)
        {
            _gateway.GetMongoDB().GetCollection<Person>(_collectionName)
                .InsertOne(entity);
            return true;
        }

        public Person Update(string id, Person entity)
        {
            var update = Builders<Person>.Update
                .Set(e => e.Name, entity.Name );

            var result = _gateway.GetMongoDB().GetCollection<Person>(_collectionName)
                .FindOneAndUpdate(e => e.Id == id, update);
            return result;
        }

        public bool Delete(string id)
        {
            var result = _gateway.GetMongoDB().GetCollection<Person>(_collectionName)
                         .DeleteOne(e => e.Id == id);
            return result.IsAcknowledged;
        }
    }
}
