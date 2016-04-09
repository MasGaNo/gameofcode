
declare module GameOfCode {

    interface IPosition {
        lat: number;
        lng: number;
    }

    module GoogleApi {

        interface IGoogleWaypoints {
            geocoder_status: string;//'OK',
            partial_match: boolean;// true,
            place_id: string;//'ChIJ0X0Wi4hubIcRQTQt_4vqs1U',
            types: any;
        }

        interface IGoogleValue {
            text: string;
            value: number;
        }

        interface IGoogleBounds {
            northeast: IPosition;
            southwest: IPosition;
        }

        interface IGoogleLeg {
            distance: {
                text: string;
                value: number;
            };
            duration: {
                text: string;
                value: number;
            };
            end_address: string;
            end_location: IPosition;
            start_address: string;
            steps: IGoogleStep[];
            via_waypoint: any[];
        }

        interface IGoogleRoute {
            bounds: IGoogleBounds;
            copyrights: string;
            legs: IGoogleLeg[];
            overview_polyline: {
                points: string;
            };
            summary: string;
            warnings: any[];
            waypoint_order: any[];
        }

        interface IGoogleResponse {
            geocoded_waypoints: IGoogleWaypoints[];
            routes: IGoogleRoute[];
            status: string;
        }

        interface IGoogleStep {
            distance: IGoogleValue;
            duration: IGoogleValue;
            end_location: IPosition;
            html_instructions: string;//"Head <b>south</b> on <b>Rue des Abanis</b> toward <b>Rue de Longwy</b>",
            polyline: {
                points: string;//"_gcmHygcb@FBBBDB`BxAHJHJ"
            };
            start_location: IPosition;
            travel_mode: string;//"DRIVING"
        }

        interface IGoogleDirectionParams {
            origin: string;
            destination: string;
            mode: string;
            waypoints?: string;
            alternatives?: boolean;
            avoid?: string;
            language?: string;
            region?: string;
            units?: string;
            departure_time?: number;
            arrival_time?: number;
            traffic_model?: string;
        }

    }

    module RealApi {

        interface IRealStep {
            distance: number;//m
            duration: number;//seconds
            position: {
                from: IPosition;
                to: IPosition;
            };
            description: string;
            mode: string;
        }

        interface IRealRoute {
            steps: IRealStep[];
            infos: {
                bounds: {
                    northeast: IPosition;
                    southwest: IPosition;
                };
                distance: number;
                duration: number;
            }
        }

        interface IRealQueryDirection {
            uid: string;
            position: {
                from: IPosition;
                to: IPosition;
            }
            modes: string[];
            options: string[];
        }

        interface IRealResponse {
            headers: {
                status: string;
                code: number;
            };
            result: any;
        }

    }


    interface IUserPoint {
        uid: string;
        time: Date;
    }

    interface IDirectionApiOptions {
        uid: string;
        isAlternatives: boolean;
    }

}