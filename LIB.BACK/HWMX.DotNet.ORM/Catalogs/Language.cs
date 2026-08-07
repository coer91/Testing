namespace HWMX.DotNet.ORM
{
    public static class LANGUAGE
    { 
        public static class ENGLISH
        {
            public const string Id = "en_US";
            public const string Name = "English";
        }

        public static class SPANISH
        {
            public const string Id = "es_MX";
            public const string Name = "Español";
        }

        public static class KOREAN
        {
            public const string Id = "ko-KR";
            public const string Name = "한국어";
        }

        public static class MESSAGE
        {
            public static string SuccessfulTransaction(string languageId) => languageId switch
            {
                SPANISH.Id => "Transacción exitosa",
                KOREAN.Id  => "성공적인 거래",
                _          => "Successful transaction",
            };
        }
    }
}