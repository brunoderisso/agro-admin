import { EventEmitter } from "events"


const envUsers = [
  {
    "uuid": "0a227955-48be-472f-b8a3-0632a0e94189",
    "isowner": false,
    "istechnical": false,
    "status": "Overdue",
    "name": "Elician",
    "surname": "Silva",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ3FDbDo9eC1VmEO-nfIwRZurBbA9DIG7cW7bZ6avig=s96-c",
    "createdat": "2023-10-24T17:28:52.589209Z",
    "crop": "milho",
    "updateat": "2023-10-24T17:28:52.589209Z"
  },
  {
    "uuid": "1",
    "isowner": false,
    "istechnical": false,
    "status": "Active",
    "name": "Usuário Ativo 1",
    "surname": "Sobre",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ3FDbDo9eC1VmEO-nfIwRZurBbA9DIG7cW7bZ6avig=s96-c",
    "createdat": "2023-01-01T00:00:00.000Z",
    "crop": "milho",
    "updateat": "2024-03-05T10:00:00.000Z"
  },
  {
    "uuid": "2",
    "isowner": false,
    "istechnical": false,
    "status": "Active",
    "name": "Usuário Ativo 2",
    "surname": "Sob 2",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ3FDbDo9eC1VmEO-nfIwRZurBbA9DIG7cW7bZ6avig=s96-c",
    "createdat": "2023-01-01T00:00:00.000Z",
    "crop": "soja",
    "updateat": "2024-03-04T10:00:00.000Z"
  },
  {
    "uuid": "3",
    "isowner": false,
    "istechnical": false,
    "status": "Active",
    "name": "Usuário Ativo 3",
    "surname": "Sob 3",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ3FDbDo9eC1VmEO-nfIwRZurBbA9DIG7cW7bZ6avig=s96-c",
    "createdat": "2023-01-01T00:00:00.000Z",
    "crop": "trigo",
    "updateat": "2024-03-01T10:00:00.000Z"
  },
  {
    "uuid": "4",
    "isowner": false,
    "istechnical": false,
    "status": "Active",
    "name": "Usuário Ativo 4",
    "surname": "Sob 4",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ3FDbDo9eC1VmEO-nfIwRZurBbA9DIG7cW7bZ6avig=s96-c",
    "createdat": "2023-01-01T00:00:00.000Z",
    "crop": "arroz",
    "updateat": "2024-02-28T10:00:00.000Z"
  },
  {
    "uuid": "5",
    "isowner": false,
    "istechnical": false,
    "status": "Active",
    "name": "Usuário Ativo 5",
    "surname": "Sob 5",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ3FDbDo9eC1VmEO-nfIwRZurBbA9DIG7cW7bZ6avig=s96-c",
    "createdat": "2023-01-01T00:00:00.000Z",
    "crop": "feijão",
    "updateat": "2024-02-25T10:00:00.000Z"
  },
  {
    "uuid": "6",
    "isowner": false,
    "istechnical": false,
    "status": "Absent",
    "name": "Usuário Ausente 1",
    "surname": "Sob 6",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ3FDbDo9eC1VmEO-nfIwRZurBbA9DIG7cW7bZ6avig=s96-c",
    "createdat": "2023-01-01T00:00:00.000Z",
    "crop": "milho",
    "updateat": "2024-02-20T10:00:00.000Z"
  },
  {
    "uuid": "7",
    "isowner": false,
    "istechnical": false,
    "status": "Absent",
    "name": "Usuário Ausente 2",
    "surname": "Sob 7",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ3FDbDo9eC1VmEO-nfIwRZurBbA9DIG7cW7bZ6avig=s96-c",
    "createdat": "2023-01-01T00:00:00.000Z",
    "crop": "soja",
    "updateat": "2024-02-10T10:00:00.000Z"
  },
  {
    "uuid": "8",
    "isowner": false,
    "istechnical": false,
    "status": "Inactive",
    "name": "Usuário Inativo 1",
    "surname": "Sob 8",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ3FDbDo9eC1VmEO-nfIwRZurBbA9DIG7cW7bZ6avig=s96-c",
    "createdat": "2023-01-01T00:00:00.000Z",
    "crop": "trigo",
    "updateat": "2024-01-01T10:00:00.000Z"
  },
  {
    "uuid": "9",
    "isowner": false,
    "istechnical": false,
    "status": "Inactive",
    "name": "Usuário Inativo 2",
    "surname": "Sob 9",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ3FDbDo9eC1VmEO-nfIwRZurBbA9DIG7cW7bZ6avig=s96-c",
    "createdat": "2023-01-01T00:00:00.000Z",
    "crop": "arroz",
    "updateat": "2023-12-01T10:00:00.000Z"
  },
  {
    "uuid": "10",
    "isowner": false,
    "istechnical": false,
    "status": "Inactive",
    "name": "Usuário Inativo 3",
    "surname": "Sob 10",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ3FDbDo9eC1VmEO-nfIwRZurBbA9DIG7cW7bZ6avig=s96-c",
    "createdat": "2023-01-01T00:00:00.000Z",
    "crop": "feijão",
    "updateat": "2023-11-01T10:00:00.000Z"
  },
  {
    "uuid": "584af3fb-fda8-4b13-83d4-44cd191bc6b4",
    "isowner": false,
    "istechnical": false,
    "name": "Gustavo",
    "status": "Active",
    "surname": "Palandi",
    "crop": "soja",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ3FDbDo9eC1VmEO-nfIwRZurBbA9DIG7cW7bZ6avig=s96-c",
    "createdat": "2022-07-29T22:04:27.028202Z",
    "updateat": "2022-07-29T22:04:27.028202Z"
  },
  {
    "uuid": "85ed352c-f1f7-4658-8c9f-eeaef77b689d",
    "isowner": false,
    "istechnical": false,
    "status": "Active",
    "crop": "soja",
    "name": "Gustavo ",
    "surname": "Palandi",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ3FDbDo9eC1VmEO-nfIwRZurBbA9DIG7cW7bZ6avig=s96-c",
    "createdat": "2023-08-26T21:35:19.37998Z",
    "updateat": "2023-08-26T21:35:19.37998Z"
  },
  {
    "uuid": "dcead437-2281-4148-b043-9ce324b20328",
    "isowner": false,
    "istechnical": false,
    "status": "Active",
    "crop": "milho",
    "name": "Bruno",
    "surname": "Fortunato",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ3FDbDo9eC1VmEO-nfIwRZurBbA9DIG7cW7bZ6avig=s96-c",
    "createdat": "2023-05-01T14:46:52.073752Z",
    "updateat": "2023-05-01T14:46:52.073752Z"
  },
  {
    "uuid": "3dba4ae6-97fc-41a0-8f41-78d2bb721be4",
    "isowner": false,
    "istechnical": false,
    "name": "Alberto",
    "status": "Suspended",
    "crop": "milho",
    "surname": "Oliveira",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ3FDbDo9eC1VmEO-nfIwRZurBbA9DIG7cW7bZ6avig=s96-c",
    "createdat": "2023-08-02T14:23:38.486118Z",
    "updateat": "2023-08-02T14:23:38.486118Z"
  },
  {
    "uuid": "cfd80056-ce1f-4ea8-a0da-037b07347335",
    "isowner": false,
    "istechnical": false,
    "crop": "milho",
    "status": "Suspended",
    "name": "Camilo",
    "surname": "Ramos",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ3FDbDo9eC1VmEO-nfIwRZurBbA9DIG7cW7bZ6avig=s96-c",
    "createdat": "2023-02-14T12:23:03.001538Z",
    "updateat": "2023-02-14T12:23:03.001538Z"
  },
  {
    "uuid": "ea02329b-c732-47ad-b5ac-8de2a8b5ba92",
    "isowner": true,
    "istechnical": true,
    "status": "Suspended",
    "crop": "soja",
    "name": "Jeferson",
    "surname": "Rodrigues",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ3FDbDo9eC1VmEO-nfIwRZurBbA9DIG7cW7bZ6avig=s96-c",
    "createdat": "2021-07-19T13:22:19.237209Z",
    "updateat": "2021-08-19T18:13:53.975167Z"
  },
  {
    "uuid": "1e90a62d-11e1-410f-98c2-6e63aa591415",
    "isowner": false,
    "istechnical": false,
    "status": "Active",
    "crop": "maçã",
    "name": "Administrator",
    "surname": "Prediza",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ3FDbDo9eC1VmEO-nfIwRZurBbA9DIG7cW7bZ6avig=s96-c",
    "createdat": "2021-07-19T13:13:23.167409Z",
    "updateat": "2021-07-19T13:13:23.167409Z"
  },
  {
    "uuid": "09447b1d-55b4-4424-8476-55c31e38cfa9",
    "isowner": false,
    "istechnical": false,
    "crop": "milho",
    "name": "João",
    "status": "Overdue",
    "surname": "Silveira",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ3FDbDo9eC1VmEO-nfIwRZurBbA9DIG7cW7bZ6avig=s96-c",
    "createdat": "2023-12-04T19:37:47.527955Z",
    "updateat": "2023-12-04T19:37:47.527955Z"
  },
  {
    "uuid": "16498881-8cac-4280-8e97-1d625a1ccf85",
    "isowner": false,
    "crop": "milho",
    "istechnical": false,
    "status": "Overdue",
    "name": "Filipe",
    "surname": "Gusmão de Melo",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ3FDbDo9eC1VmEO-nfIwRZurBbA9DIG7cW7bZ6avig=s96-c",
    "createdat": "2023-11-21T18:06:07.691678Z",
    "updateat": "2023-11-21T18:06:07.691678Z"
  },
  {
    "uuid": "6498908d-d1fd-4c33-a988-5fbfba4cca71",
    "isowner": false,
    "istechnical": false,
    "crop": "soja",
    "status": "Active",
    "name": "Yuri",
    "surname": "Bernardi",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ3FDbDo9eC1VmEO-nfIwRZurBbA9DIG7cW7bZ6avig=s96-c",
    "createdat": "2022-03-01T13:41:14.819713Z",
    "updateat": "2022-03-01T13:41:14.819711Z"
  },
  {
    "uuid": "aeecdaea-0b81-4b78-aea3-16f803f0e1eb",
    "isowner": false,
    "istechnical": false,
    "crop": "soja",
    "status": "Suspended",
    "name": "Gabriel",
    "surname": "Portela",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ3FDbDo9eC1VmEO-nfIwRZurBbA9DIG7cW7bZ6avig=s96-c",
    "createdat": "2024-01-17T19:59:12.922761Z",
    "updateat": "2024-01-17T19:59:12.922761Z"
  }
]

const endAdornment = {
  "objectid": "bkbau6tvva44af0lbiog",
  "name": "Prediza",
  "description": "Prediza Tecnologia da Informação",
  "altitude": 819.7548,
  "latitude": -29.1628,
  "longitude": -51.1504,
  "geohash": "6fgdh516mk13",
  "timezone": "America/Sao_Paulo",
  "device": "2d8aeb80c369b707",
  "devices": [
    {
      "deveui": "e55d5e67da3d0732",
      "description": "Soil @Escadaria BL59997676",
      "latitude": -29.16608,
      "longitude": -51.14725,
      "rssi": -90,
      "updateGPSPosition": false,
      "name": "P1C060",
      "tag": "P1C060",
      "measurements": [
        {
          "name": "AirDewpoint",
          "meta": {
            "gradientobjectid": "c4nrklrqeou3t3lnvu8g",
            "fill": "none",
            "function": "MEAN",
            "scale": "auto",
            "measure": null,
            "xlegend": "data",
            "ylegend": "ºC",
            "title": "Ponto de Orvalho",
            "blur": null,
            "gradient": "{\"0.00\":\"#0000ff\",\"0.05\":\"#0032ff\",\"0.10\":\"#0064ff\",\"0.15\":\"#0096ff\",\"0.20\":\"#00c8ff\",\"0.25\":\"#00ffff\",\"0.30\":\"#00ff00\",\"0.35\":\"#32ff00\",\"0.40\":\"#64ff00\",\"0.45\":\"#96ff00\",\"0.50\":\"#c8ff00\",\"0.55\":\"#ffff00\",\"0.60\":\"#ffc800\",\"0.65\":\"#ff9600\",\"0.70\":\"#ff6400\",\"0.75\":\"#ff3200\",\"0.80\":\"#ff0000\",\"0.85\":\"#b22222\",\"0.90\":\"#8b0000\",\"1.00\":\"#800000\"}",
            "radius": null,
            "max": null,
            "min": null,
            "precision": 1
          },
          "gradient": {
            "objectid": "c4nrklrqeou3t3lnvu8g",
            "gradient": [
              {
                "objectid": "c4nrkrbqeou3t3lnvu90",
                "hex": "#0000FF",
                "r": 0,
                "g": 0,
                "b": 255,
                "a": 1,
                "indice": 0,
                "lower": -14,
                "upper": -7,
                "createdat": "2021-09-01T17:37:49.739867Z",
                "updatedat": "2021-09-01T17:37:49.739866Z"
              },
              {
                "objectid": "c4nrkssaqof5uve8dge0",
                "hex": "#0032FF",
                "r": 0,
                "g": 50,
                "b": 255,
                "a": 1,
                "indice": 0.05,
                "lower": -7,
                "upper": 0,
                "createdat": "2021-09-01T17:37:55.941565Z",
                "updatedat": "2021-09-01T17:37:55.941564Z"
              }

            ],
            "dissipating": null,
            "maxIntensity": null,
            "opacity": null,
            "radius": null,
            "createdat": "2021-09-01T17:37:27.74865Z",
            "updatedat": "2021-09-01T17:37:27.748649Z"
          }
        },
        {
          "name": "AirHumidity",
          "meta": {
            "gradientobjectid": "c4og9orqeou3t3lpoq3g",
            "fill": "none",
            "function": "mean",
            "scale": "auto",
            "measure": null,
            "xlegend": "data",
            "ylegend": "%",
            "title": "Umidade do ar",
            "blur": 3,
            "gradient": "{\"0.00\":\"#FF0000\",\"0.05\":\"#FF4500\",\"0.10\":\"#FF8C00\",\"0.20\":\"#FFA500\",\"0.30\":\"#FFFF00\",\"0.40\":\"#ADFF2F\",\"0.50\":\"#7FFF00\",\"0.60\":\"#00FF00\",\"0.70\":\"#32CD32\",\"0.80\":\"#00BFFF\",\"0.90\":\"#1E90FF\",\"0.95\":\"#0000FF\",\"1.00\":\"#0000CD\"}",
            "radius": 100,
            "max": null,
            "min": null,
            "precision": 1
          },
          "gradient": {
            "objectid": "c4og9orqeou3t3lpoq3g",
            "gradient": [
              {
                "objectid": "c4og9u3qeou3t3lpoq40",
                "hex": "#FF0000",
                "r": 255,
                "g": 0,
                "b": 0,
                "a": 1,
                "indice": 0,
                "lower": 0,
                "upper": 10,
                "createdat": "2021-09-02T17:08:08.188092Z",
                "updatedat": "2021-09-02T17:08:08.18809Z"
              },
              {
                "objectid": "c4oga0jqeou3t3lpoq4g",
                "hex": "#FF4500",
                "r": 255,
                "g": 69,
                "b": 0,
                "a": 1,
                "indice": 0.05,
                "lower": 10,
                "upper": 20,
                "createdat": "2021-09-02T17:08:18.1822Z",
                "updatedat": "2021-09-02T17:08:18.182199Z"
              }
            ],
            "dissipating": null,
            "maxIntensity": null,
            "opacity": null,
            "radius": null,
            "createdat": "2021-09-02T17:07:47.096772Z",
            "updatedat": "2023-08-12T00:32:37.358773Z"
          }
        }
      ],
      "digesteredat": "2022-12-21T23:45:43.930388Z",
      "lastseenat": "2023-03-10T21:41:55.557469Z",
      "createdat": "2022-01-12T18:59:50.297959Z"
    }
  ],
  "Measurements": [
    {
      "name": "AirDewpoint",
      "meta": {
        "gradientobjectid": "c4nrklrqeou3t3lnvu8g",
        "fill": "none",
        "function": "MEAN",
        "scale": "auto",
        "measure": null,
        "xlegend": "data",
        "ylegend": "ºC",
        "title": "Ponto de Orvalho",
        "blur": null,
        "gradient": "{\"0.00\":\"#0000ff\",\"0.05\":\"#0032ff\",\"0.10\":\"#0064ff\",\"0.15\":\"#0096ff\",\"0.20\":\"#00c8ff\",\"0.25\":\"#00ffff\",\"0.30\":\"#00ff00\",\"0.35\":\"#32ff00\",\"0.40\":\"#64ff00\",\"0.45\":\"#96ff00\",\"0.50\":\"#c8ff00\",\"0.55\":\"#ffff00\",\"0.60\":\"#ffc800\",\"0.65\":\"#ff9600\",\"0.70\":\"#ff6400\",\"0.75\":\"#ff3200\",\"0.80\":\"#ff0000\",\"0.85\":\"#b22222\",\"0.90\":\"#8b0000\",\"1.00\":\"#800000\"}",
        "radius": null,
        "max": null,
        "min": null,
        "precision": 1
      },
      "gradient": {
        "objectid": "c4nrklrqeou3t3lnvu8g",
        "gradient": [
          {
            "objectid": "c4nrkrbqeou3t3lnvu90",
            "hex": "#0000FF",
            "r": 0,
            "g": 0,
            "b": 255,
            "a": 1,
            "indice": 0,
            "lower": -14,
            "upper": -7,
            "createdat": "2021-09-01T17:37:49.739867Z",
            "updatedat": "2021-09-01T17:37:49.739866Z"
          },
          {
            "objectid": "c4nrkssaqof5uve8dge0",
            "hex": "#0032FF",
            "r": 0,
            "g": 50,
            "b": 255,
            "a": 1,
            "indice": 0.05,
            "lower": -7,
            "upper": 0,
            "createdat": "2021-09-01T17:37:55.941565Z",
            "updatedat": "2021-09-01T17:37:55.941564Z"
          },

        ],
        "dissipating": null,
        "maxIntensity": null,
        "opacity": null,
        "radius": null,
        "createdat": "2021-09-01T17:37:27.74865Z",
        "updatedat": "2021-09-01T17:37:27.748649Z"
      }
    },
    {
      "name": "AirHumidity",
      "meta": {
        "gradientobjectid": "c4og9orqeou3t3lpoq3g",
        "fill": "none",
        "function": "mean",
        "scale": "auto",
        "measure": null,
        "xlegend": "data",
        "ylegend": "%",
        "title": "Umidade do ar",
        "blur": 3,
        "gradient": "{\"0.00\":\"#FF0000\",\"0.05\":\"#FF4500\",\"0.10\":\"#FF8C00\",\"0.20\":\"#FFA500\",\"0.30\":\"#FFFF00\",\"0.40\":\"#ADFF2F\",\"0.50\":\"#7FFF00\",\"0.60\":\"#00FF00\",\"0.70\":\"#32CD32\",\"0.80\":\"#00BFFF\",\"0.90\":\"#1E90FF\",\"0.95\":\"#0000FF\",\"1.00\":\"#0000CD\"}",
        "radius": 100,
        "max": null,
        "min": null,
        "precision": 1
      },
      "gradient": {
        "objectid": "c4og9orqeou3t3lpoq3g",
        "gradient": [
          {
            "objectid": "c4og9u3qeou3t3lpoq40",
            "hex": "#FF0000",
            "r": 255,
            "g": 0,
            "b": 0,
            "a": 1,
            "indice": 0,
            "lower": 0,
            "upper": 10,
            "createdat": "2021-09-02T17:08:08.188092Z",
            "updatedat": "2021-09-02T17:08:08.18809Z"
          },
          {
            "objectid": "c4oga0jqeou3t3lpoq4g",
            "hex": "#FF4500",
            "r": 255,
            "g": 69,
            "b": 0,
            "a": 1,
            "indice": 0.05,
            "lower": 10,
            "upper": 20,
            "createdat": "2021-09-02T17:08:18.1822Z",
            "updatedat": "2021-09-02T17:08:18.182199Z"
          },

        ],
        "dissipating": null,
        "maxIntensity": null,
        "opacity": null,
        "radius": null,
        "createdat": "2021-09-02T17:07:47.096772Z",
        "updatedat": "2023-08-12T00:32:37.358773Z"
      }
    },

  ],
  "area": 77269.39265489083,
  "bounds": "((-8.680201329794073,-39.16103292721983),(-8.67977107732367,-39.16086128395838),(-8.679620842908818,-39.1607957735506),(-8.679567890872688,-39.16086432458518),(-8.678384069127059,-39.16235532465466),(-8.678339457790894,-39.16232569415188),(-8.679409547157595,-39.16086356086928),(-8.679345842099016,-39.16083217022507),(-8.679392589345007,-39.16076813285921),(-8.677007753092772,-39.158098563053194),(-8.676346954592713,-39.1610659976545),(-8.678698268593177,-39.16165163065055),(-8.678746966140531,-39.16168696819815),(-8.67833324856232,-39.16227783801773),(-8.678246092438778,-39.16247726472766),(-8.677922082399057,-39.16264125136038),(-8.677877657419065,-39.16271931056089),(-8.677622989584204,-39.16283795858862),(-8.677524045858435,-39.16311317696005),(-8.677461487469744,-39.16312230642075),(-8.677179275932815,-39.163977752118),(-8.678236457162635,-39.1643432049786),(-8.67881086900622,-39.16254047174589),(-8.678977038564842,-39.16260067952482),(-8.679905425766522,-39.16140575573118),(-8.680201329794073,-39.16103292721983))",
  "zoninginfo": null,
  "protect_accidental": true
}


class AdministrativeStore extends EventEmitter {
  constructor(props) {
    super(props)

    this.props = props
  }

  getEnvironmentUsers(environment, callBack) {

    return callBack(envUsers)
  }

  getEnvironment() {
    return endAdornment
  }
}

const administrativeStore = new AdministrativeStore()
export default administrativeStore
