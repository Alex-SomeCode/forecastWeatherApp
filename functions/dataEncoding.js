import { opnWthr } from "../urlValues.js"


export class DataEncoding {

    static decodingForecast() {


        return atob(opnWthr.urlForecast)
    }


    static decodingLocation() {

        return atob(opnWthr.urlLocation)
    }

}

