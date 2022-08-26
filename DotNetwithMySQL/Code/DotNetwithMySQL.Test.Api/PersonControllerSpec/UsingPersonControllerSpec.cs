using NSubstitute;
using DotNetwithMySQL.Test.Framework;
using DotNetwithMySQL.Api.Controllers;
using DotNetwithMySQL.Business.Interfaces;


namespace DotNetwithMySQL.Test.Api.PersonControllerSpec
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
