using NSubstitute;
using DotNetwithMySQL.Test.Framework;
using DotNetwithMySQL.Business.Services;
using DotNetwithMySQL.Data.Interfaces;

namespace DotNetwithMySQL.Test.Business.PersonServiceSpec
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
