using System.Text.Json.Serialization;

namespace WebAPI_EmprestimoConsignado.Enums
{

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TipoEmprestimoEnum
    {
        INSS, 
        ServidorPublico, 
        Militar,
        Privado, 
    }
}
