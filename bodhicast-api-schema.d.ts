/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Read Root */
        get: operations["read_root__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/forecasts/spots/{date}/{spot_lat}/{spot_lng}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Forecast By Lat Lng
         * @description Retrieve wave forecasts for a specific spot based on date and coordinates.
         *
         *     - This function creates a PostGIS point using the provided latitude (spot_lat) and longitude
         *       (spot_lng) as the origin.
         *     - It then calculates the nearest data point by distance to this origin.
         *     - Forecasts where significant combined swell and wind wave height (swh) values
         *       are null are excluded, as null values indicate land areas rather than water.
         *     - Additional logic will need to be added to handle rolling forecast updates
         *       if fetching from NOAA multiple times per day
         *
         *     Args:
         *         date (str): The date in the format 'YYYYMMDD'.
         *         spot_lat (str): The latitude of the spot.
         *         spot_lng (str): The longitude of the spot.
         *         db (Session, optional): The database session. Defaults to Depends(get_db).
         *
         *     Returns:
         *         list: A list of dictionaries containing the forecast data for each valid time.
         */
        get: operations["get_forecast_by_lat_lng_forecasts_spots__date___spot_lat___spot_lng__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/spots": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get All Spots
         * @description Retrieve all spots from the database.
         *
         *     Parameters:
         *     - db: The database session.
         *
         *     Returns:
         *     - A list of dictionaries representing each spot.
         */
        get: operations["get_all_spots_spots_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/addspot": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create Spot
         * @description Create a new spot and store it in the database.
         *
         *     This endpoint accepts spot details, including its name, geographical coordinates, and street address, and creates a new record in the database.
         *
         *     Args:
         *         spot (SpotCreate): A Pydantic model representing the new spot's data, including latitude (lat), longitude (lng), spot name, and street address.
         *         db (Session, optional): The database session injected by FastAPI's dependency injection system. Defaults to the session provided by Depends(get_db).
         *
         *     Returns:
         *         dict: A dictionary with a message indicating the successful creation of the spot. For example, {"message": "Spot successfully created"}.
         *
         *     Example:
         *         Input:
         *             {
         *                 "lat": 36.83055459542353,
         *                 "lng": -75.96764801341773,
         *                 "spot_name": "1st Street Jetty",
         *                 "street_address": "Virginia Beach, Va 23451"
         *             }
         *
         *         Output:
         *             {
         *                 "message": "Spot successfully created"
         *             }
         *     Raises:
         *         HTTPException: An error message and status code if the spot cannot be created due to specific conditions (not shown here but consider implementing error handling for database operations).
         */
        post: operations["create_spot_addspot_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/current/spots/{range}/{lat}/{lng}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Nearby Station Data
         * @description Retrieve nearby weather station data within a specified range. The station data is populated to redis in near realtime via consumption from a kafka topic
         *
         *
         *     Parameters:
         *     - range (str): The range in meters(m) within which to search for nearby stations.
         *     - lat (str): The latitude of the location.
         *     - lng (str): The longitude of the location.
         *     - db (Session, optional): The database session. Defaults to Depends(get_db).
         *
         *     Returns:
         *     - List[Dict[str, Any]]: A list of dictionaries containing the station data.
         */
        get: operations["get_nearby_station_data_current_spots__range___lat___lng__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/forecasts/nearest/{date}/{spot_lat}/{spot_lng}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Forecasts By Spot */
        get: operations["get_forecasts_by_spot_forecasts_nearest__date___spot_lat___spot_lng__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** HTTPValidationError */
        HTTPValidationError: {
            /** Detail */
            detail?: components["schemas"]["ValidationError"][];
        };
        /** SpotCreate */
        SpotCreate: {
            /** Lat */
            lat: number;
            /** Lng */
            lng: number;
            /** Spot Name */
            spot_name: string;
            /** Street Address */
            street_address: string;
        };
        /** ValidationError */
        ValidationError: {
            /** Location */
            loc: (string | number)[];
            /** Message */
            msg: string;
            /** Error Type */
            type: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    read_root__get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    get_forecast_by_lat_lng_forecasts_spots__date___spot_lat___spot_lng__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                date: string;
                spot_lat: string;
                spot_lng: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_all_spots_spots_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    create_spot_addspot_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SpotCreate"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_nearby_station_data_current_spots__range___lat___lng__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                range: string;
                lat: string;
                lng: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_forecasts_by_spot_forecasts_nearest__date___spot_lat___spot_lng__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                date: string;
                spot_lat: string;
                spot_lng: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
}
