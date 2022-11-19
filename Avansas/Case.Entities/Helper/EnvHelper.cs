namespace Case.Entities.Helper;

public class EnvHelper
{
    public static string ConnectionString { get; } = Environment.GetEnvironmentVariable("connectionstring") ??
                                                     @"server=localhost;userid=root;pwd=toorroot;port=3306;database=avansascase;sslmode=none;Convert Zero Datetime=true; Allow Zero Datetime=true";
}