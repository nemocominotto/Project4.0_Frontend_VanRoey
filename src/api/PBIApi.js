import axios from "axios"

const BaseUrl = 'https://api.powerbi.com/v1.0/myorg'

class PBIApi {
    // generate embed token
    static generateToken(reportID, datasetID){
        let data =
        {
            "datasets": [
              {
                "id": datasetID
              }
            ],
            "reports": [
              {
                "id": reportID
              }
            ],
            "lifetimeInMinutes": 10
          }
        return axios.post(BaseUrl + '/GenerateToken', data)
    }
}

export default PBIApi