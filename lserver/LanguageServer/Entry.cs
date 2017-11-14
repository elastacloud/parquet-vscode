using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace LanguageServer
{
   class Entry
   {
      //see https://github.com/OmniSharp/csharp-language-server-protocol/tree/master/sample/SampleServer

      static async Task Main(string[] args)
      {
         var server = new OmniSharp.Extensions.LanguageServer.LanguageServer(
            Console.OpenStandardInput(),
            Console.OpenStandardOutput(),
            new LoggerFactory());

         await server.Initialize();

         await server.WasShutDown;
      }
   }
}
