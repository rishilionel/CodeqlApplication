using NSubstitute;
using DotNetwithMSSQL.Test.Framework;
using DotNetwithMSSQL.Business.Services;
using DotNetwithMSSQL.Data.Interfaces;

namespace DotNetwithMSSQL.Test.Business.PersonServiceSpec
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
