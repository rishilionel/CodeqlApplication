using NSubstitute;
using DotnetMongo.Test.Framework;
using DotnetMongo.Business.Services;
using DotnetMongo.Data.Interfaces;

namespace DotnetMongo.Test.Business.PersonServiceSpec
{
    public abstract class UsingPersonServiceSpec : SpecFor<PersonService>
    {
        protected IPersonRepository _personRepository;

        public override void Context()
        {
            _personRepository = Substitute.For<IPersonRepository>();
            subject = new PersonService(_personRepository);

        }

    }
}
