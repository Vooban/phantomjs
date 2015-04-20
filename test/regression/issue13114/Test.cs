[TestFixture]
public class Test
{
    [Test]
    public void Csp()
    {
        using (var driver = new PhantomJSDriver())
        {
            driver.Navigate().GoToUrl("http://localhost:8000/");

            Console.WriteLine(driver.Url);
        }
    }
}