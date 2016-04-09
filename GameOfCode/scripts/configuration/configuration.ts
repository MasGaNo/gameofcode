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

            host: 'localhost',
            port: 3000,
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