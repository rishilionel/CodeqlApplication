using NSubstitute;
using DotNetwithMSSQL.Test.Framework;
using DotNetwithMSSQL.Api.Controllers;
using DotNetwithMSSQL.Business.Interfaces;


namespace DotNetwithMSSQL.Test.Api.PersonControllerSpec
{
    public abstract class UsingPersonControllerSpec : SpecFor<PersonController>
    {
        protected IPersonService _personService;

        public override void Context()
        {
            _personService = Substitute.For<IPersonService>();
            subject = new PersonController(_personService);

        }

    }
}
