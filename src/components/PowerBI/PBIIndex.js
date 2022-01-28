import './PBIIndex.css'
import React from 'react';
import { Link } from 'react-router-dom';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client'
import PBIApi from '../../api/PBIApi'


let reportID = "80f92996-0760-4561-8779-1300c644562e";
let datasetID = "313afc2c-1b0a-46e7-9292-f9516a3a8f74"

const PBIIndex = () => {

    // PBIApi.generateToken(reportID, datasetID).then(res => {
    //     if (res.status(200)) {
    //         console.log(res.data);
    //     }
    //     if (res.status(403)) {
    //         console.log("FUCKKKKKK DIT ")
    //         console.log(res.statusText);
    //     }

    // }).catch(error => {
    //     console.log(error);
    // })

return (
    <div className='pbiContainer'>
        <PowerBIEmbed
            embedConfig={{
                type: 'report',   // Supported types: report, dashboard, tile, visual and qna
                id: '83ccd83b-d74e-4549-80e3-db5905de31ba',
                embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=83ccd83b-d74e-4549-80e3-db5905de31ba&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLU5PUlRILUVVUk9QRS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsImFuZ3VsYXJPbmx5UmVwb3J0RW1iZWQiOnRydWUsImNlcnRpZmllZFRlbGVtZXRyeUVtYmVkIjp0cnVlLCJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZSwic2tpcFpvbmVQYXRjaCI6dHJ1ZX19',
                accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzdkMzNjYzUtYzliNC00NzY2LTk1YzctZWQ1YjUxNWUxY2NlLyIsImlhdCI6MTY0MzMyMTQ5OCwibmJmIjoxNjQzMzIxNDk4LCJleHAiOjE2NDMzMjY1MjUsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUFzU3pDNnRHYTUwM0huUy83S0hNZytMeXIzZ0orTk5PenZ5S0hTd0JXaFJEaTJrUDRnWlNOSjZXMXZyWVFLTE43IiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMiIsImZhbWlseV9uYW1lIjoiSG91c2VuIiwiZ2l2ZW5fbmFtZSI6IkpvcnJlIiwiaXBhZGRyIjoiMjEyLjIzOS4yMTAuMTEwIiwibmFtZSI6IkpvcnJlIEhvdXNlbiIsIm9pZCI6IjUxYjUzYzhmLTBiYzMtNDJhNC1iOGE5LTQxYmU0NWUxYTQxYSIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS05MjI2MjA0MzktMTg1MDI1NDM2LTI5MjExOTI5ODctOTg2MTkiLCJwdWlkIjoiMTAwMzIwMDA1RkI5MDJEQyIsInJoIjoiMC5BUXdBeFR6VGQ3VEpaa2VWeC0xYlVWNGN6ZzhCSElkaFhyRlBnNnlZWVFwLWtSQU1BRm8uIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoiVzl0amNaZUJSQ3lYUnJJcG1Na1Nick5XZk80c0tSTVNYZnFuYlVfUDBUMCIsInRpZCI6Ijc3ZDMzY2M1LWM5YjQtNDc2Ni05NWM3LWVkNWI1MTVlMWNjZSIsInVuaXF1ZV9uYW1lIjoicjA3OTY0NDhAc3R1ZGVudC50aG9tYXNtb3JlLmJlIiwidXBuIjoicjA3OTY0NDhAc3R1ZGVudC50aG9tYXNtb3JlLmJlIiwidXRpIjoiTmkyUHRXWjdNRVNyWWc2VUt2RXRBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.o4V6wSXXGFE09GOFnY35g4p-Ax_Cc9sSfE6idCqjB-fAdrEsUNtIcyBKf9Em7TRTIhYfwTtHM7NieM_qr8BxVwjZ4_UwSilTbfq3iNe8xHnwT5yZhS1pG6H3zXHFFZf2mC6WLMyy9re0NAJdbJldvgU9qSY_g277zq0Qy6Fr2zIKbjQsrAjGQUbHYpC0TDgHHFLpXGg-bELOodYjLrNWbpARXq0OxOavqaTn2jCZ-BaICfEz06-1d-LcyZ_6q4qxYV4GoHHSZr8k9r61iCxPGZsOeH30Fd71HwiH01YQD8xnb9g3mpXLxjuK3J0p_sLdUHkkgoxwyPrSdLk5-dGbeA',
                tokenType: models.TokenType.Aad,
                settings: {
                    panes: {
                        filters: {
                            expanded: false,
                            visible: false
                        },
                        pageNavigation: {
                            visible: false
                        }
                    },
                    background: models.BackgroundType.Transparent,
                }
            }}

            eventHandlers={
                new Map([
                    ['loaded', function () { console.log('Report loaded'); }],
                    ['rendered', function () { console.log('Report rendered'); }],
                    ['error', function (event) { console.log(event.detail); }]
                ])
            }

            cssClassName={"Embed-container"}

            getEmbeddedComponent={(embeddedReport) => {
                window.report = embeddedReport;
            }}
        />
    </div>
)
};

export default PBIIndex;