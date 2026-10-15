using HWMX.DotNet;
using HWMX.DotNet.ORM;
using Repositories.Database;

namespace Microservices.Interfaces
{
    /// <summary>
    /// Hecho por la mera pirinola (COER)
    /// </summary>
    public interface IDataSessionService
    { 
        Task<ResponseList<DATA_SESSION_DTO>> GetDataSession(string pageCode, string operation);

        Task<ResponseList<DATA_SESSION_DTO>> GetLastDataSession(string pageCode);

        Task<ResponseDTO<DATA_SESSION_DTO>> GetDetailDataSession(string pageCode, string detail);

        Task<ResponseDTO<string>> GetStatusDataSession(string pageCode, string detail);

        /// <summary>
        /// Agrega un registro
        /// </summary> 
        Task<ResponseDTO<string>> AddDataSession(string pageCode, string operation, string detail, string json);

        /// <summary>
        /// Elimina todo por operacion, luego inserta
        /// </summary> 
        Task<ResponseDTO<string>> SetDataSession(string pageCode, string operation, string[][] detail);

        /// <summary>
        /// Elimina un registro
        /// </summary> 
        Task<ResponseDTO<string>> DeleteDataSession(string pageCode, string operation, string detail);

        /// <summary>
        /// Elimina todo por operacion
        /// </summary> 
        Task<ResponseDTO<string>> ClearDataSession(string pageCode, string operation);
    }
} 