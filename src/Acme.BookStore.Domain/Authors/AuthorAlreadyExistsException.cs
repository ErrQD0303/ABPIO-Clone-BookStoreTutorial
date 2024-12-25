using Volo.Abp;

namespace Acme.BookStore.Authors;

// It is a good practice to throw Business Exceptions defined in the domain layer.
public class AuthorAlreadyExistsException : BusinessException
{
    public AuthorAlreadyExistsException(string name)
        : base(BookStoreDomainErrorCodes.AuthorAlreadyExists)
    {
        // {name} in the localization file will be replaced by the name parameter's value
        WithData("name", name); // WithData method is used to add custom properties to the exception object that will later be used in the localization message or for some other purpose
    }
}