using System.Text.Json.Serialization;

namespace WebAPI_EmprestimoConsignado.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum StatusEmprestimoEnum
    {
        EmAnalise,
        Aprovado,
        Reprovado,
        Liquidado,
        Inadimplente
    }
}
