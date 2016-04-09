/**
 * Created by Joe on 09/04/16.
 */
var GameOfCode;
(function (GameOfCode) {
    var Configuration;
    (function (Configuration) {
        Configuration.Server = {
            host: 'realmobiliteitserver.westeurope.cloudapp.azure.com',
            port: 80,
            protocole: 'http'
        };
        Object.defineProperty(Configuration.Server, 'url', {
            enumerable: true,
            get: function () {
                return Configuration.Server.protocole + "://" + Configuration.Server.host + ":" + Configuration.Server.port;
            }
        });
    })(Configuration = GameOfCode.Configuration || (GameOfCode.Configuration = {}));
})(GameOfCode || (GameOfCode = {}));
//# sourceMappingURL=configuration.js.map