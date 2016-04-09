/**
 * Created by Joe on 09/04/16.
 */
module GameOfCode {

    interface IServerConfiguration {
        host: string;
        port:number;
        protocole:string;
        url?:string;
    }

    export module Configuration {

        export var Server: IServerConfiguration = {

            host: 'realmobiliteitserver.westeurope.cloudapp.azure.com',
            port: 80,
            protocole: 'http'

        }

        Object.defineProperty(Server, 'url', {
            enumerable: true,
            get: () => {
                return `${Server.protocole}://${Server.host}:${Server.port}`;
            }
        })


    }

}