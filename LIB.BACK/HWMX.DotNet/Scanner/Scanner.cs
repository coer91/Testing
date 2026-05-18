namespace HWMX.DotNet
{
    public static class Scanner
    {
        public static bool IsEncoded(string code)
        {
            return code.Contains("[)>")
                || code.Contains("\x001E")
                || code.Contains("\x001D");
        }


        public static ResponseDTO<ParsedCodeDTO> Decode(string code) 
        {
            //[)>06FMX12VAZEJP49557P7001LMX250214000555Q5000UEAT D4500657146N00010XZ900Y ZIMS4000145225EC235D0000200RM

            ResponseDTO<ParsedCodeDTO> response = new()
            {
                Data = new()
            };

            try
            { 
                if (string.IsNullOrEmpty(code))
                    return response.BadRequest("Code not provided");

                if (!code.Contains('\x001D'))
                    return response.BadRequest("Invalid Code");

                if (code.Contains("[)>")) code = code.Replace("[)>", "");
                if (code.Contains('\x001E')) code = code.Replace("\x001E", "");
                if (code.Contains('\x0003')) code = code.Replace("\x0003", "");
                string[] CODE_ARRAY = code.Split('\x001D');

                foreach (string item in CODE_ARRAY)
                {
                    string key = item[..1].Trim();
                    string value = item[1..].Trim();

                    switch (key)
                    {
                        case "F": response.Data.Plant        = value; break;
                        case "V": response.Data.Company      = value; break;
                        case "P": response.Data.PartNumber   = value; break;
                        case "L": response.Data.LotNummber   = value; break;
                        case "Q": response.Data.Qty          = value; break;
                        case "U": response.Data.Unit         = value; break;
                        case "D": response.Data.DeliverySlip = value; break;
                        case "N": response.Data.DeliveryItem = value; break;
                        case "X": response.Data.Repository   = value; break;
                        case "Z": response.Data.Category     = value; break;
                        case "E": response.Data.EoNumber     = value; break;
                        case "R": response.Data.ProdDate     = value; break;
                        case "M": response.Data.Model        = value; break;
                    }
                }
            }

            catch (Exception ex)
            {
                return response.Exception(ex);
            }

            return response;
        } 
    }
} 