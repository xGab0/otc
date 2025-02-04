/*

odoo.exceptions.AccessDenied: Access Denied
{
  "message": "Access Denied",
  "name": "odoo.exceptions.AccessDenied"
},
"message": "Odoo Server Error"
},
"id": 1,
"jsonrpc": "2.0"
}

// STATUS CODE 200 - Access Denied
// STATUS CODE 188 - Unable to authenticate

*/

import axios, { type AxiosInstance } from "axios";
import { OdooModule } from './module';
import type { OdooField } from "./fields";
import type { OdooModelData } from "./data";

const DEBUG: boolean = true;

export type ServerVersionInfo = [number, number, number, string, number, string];
export type OdooRecordSyntax = { [key: string]: any };
export type LogicType = '>=' | '<=' | '=' | '!=' | 'ilike';
export type LogicFilter = [string, LogicType, any];
export type FieldsFilter = string[] | ['*'];
export type OdooUid = {
  id: number,
  name: string
}

export class OdooConnection {
  public readonly host: string;
  public readonly client: AxiosInstance;
  public readonly serverVersion: string;
  public readonly serverVersionInfo: ServerVersionInfo;
  public readonly serverSerie: string;
  public readonly protocolVersion: number;

  public constructor(
    host: string,
    client: AxiosInstance,
    serverVersion: string,
    serverVersionInfo: ServerVersionInfo,
    serverSerie: string,
    protocolVersion: number
  ) {
    this.host = host;
    this.client = client;
    this.serverVersion = serverVersion;
    this.serverVersionInfo = serverVersionInfo;
    this.serverSerie = serverSerie;
    this.protocolVersion = protocolVersion;
  }

  async login(database: string, username: string, password: string): Promise<OdooUser> {
    const params = {
      'service': 'common',
      'method': 'login',
      'args': [
        database,
        username,
        password
      ]
    }

    const payload = {
      'jsonrpc': '2.0',
      'method': 'call',
      'params': params,
      'id': 1
    }

    try {
      const response = await this.client.post('', payload);

      if (response.data.error) {
        throw new Error(`Error: ${response.data.error.message}`);
      }

      const uid = response.data.result;
      return new OdooUser(this, database, uid, username, password)
      //return response.data.result;
    } catch (error: any) {
      console.error('Error while connecting to Odoo server:', error);
      throw new Error(`Connection failed: ${error.message}`);
    }
  }

  static async connect(host: string): Promise<OdooConnection> {
    const payload = {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        service: 'common',
        method: 'version',
        args: [],
      },
      id: 1
    };

    try {
      const response = await axios.post(host, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.error) {
        throw new Error(`Error: ${response.data.error.message}`);
      }

      const result = response.data.result;

      //console.log('Connected to Odoo successfully!');
      //console.log(result);

      const client: AxiosInstance = axios.create({
        baseURL: host,
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return new OdooConnection(
        host,
        client,
        result.server_version,
        result.server_version_info,
        result.server_serie,
        result.protocol_version
      );
    } catch (error: any) {
      console.error('Error while connecting to Odoo server:', error);
      throw new Error(`Connection failed: ${error.message}`);
    }
  }
}

export interface OdooRecord {
  id: number,

  create_date: string,
  create_uid: [number, string],

  write_date: string,
  write_uid: [number, string],

  __last_update: string
}

export class OdooUser {
  public readonly connection: OdooConnection;
  public readonly database: string;
  public readonly uid: number;
  public readonly username: string;
  public readonly password: string;

  public constructor(connection: OdooConnection, database: string, uid: number, username: string, password: string) {
    this.connection = connection;
    this.database = database;
    this.uid = uid;
    this.username = username;
    this.password = password;
  }

  public modelQueryBuilder<T>(modelName: string): ModelQueryBuilder<T> {
    return new ModelQueryBuilder<T>(this, modelName);
  }

  public getModule<T>(moduleName: string): OdooModule {
    return new OdooModule(this, 475, moduleName);
  }

  public async callFunction<T>(modelName: string, functionName: string, args: any[] = []): Promise<T> {
    const params = {
      service: 'object',
      method: 'execute_kw',
      args: [
        this.database,
        this.uid,
        this.password,
        modelName,
        functionName,
        args,
        {}
      ],
    }

    const payload = {
      jsonrpc: '2.0',
      method: 'call',
      params: params,
      id: 3,  // ID della richiesta
    };

    const response = await this.connection.client.post('', payload);

    if (DEBUG) {
      console.log(`
        OdooUser | callFunction
        - user_uid: ${this.uid}
        - password: ${this.password}
        - model: ${modelName}
        - function: ${functionName}
        - args: ${args}
        - response:
      `, response);
    }

    return response.data.result;
  }

  public async getAllModules(): Promise<any> {
    return await this.searchReadRecords('ir.module.module', [], [], undefined, undefined);
  }

  public async getModels(
    andFilters: LogicFilter[] = [],
    orFilters: LogicFilter[] = [],
    fields?: FieldsFilter,
    limit?: number
  ) {
    const params = {
      service: 'object',
      method: 'execute_kw',
      args: [
        this.database,
        this.uid,
        this.password,
        'ir.model',
        'search_read',
        [
          andFilters,
        ],
        {
          fields,
          limit,
        }
      ],
    };

    const payload = {
      'jsonrpc': '2.0',
      'method': 'call',
      'params': params,
      'id': 2
    }

    const response = await this.connection.client.post('', payload);
    console.log(response.data);

    return response.data.result;
  }

  public async searchModelFieldTypes(modelName: string): Promise<any> {
    const params = {
      service: 'object',
      method: 'execute_kw',
      args: [
        this.database,
        this.uid,
        this.password,
        modelName,
        'fields_get',
        [],
        {}
      ],
    }

    const payload = {
      jsonrpc: '2.0',
      method: 'call',
      params: params,
      id: 3,  // ID della richiesta
    };

    const response = await this.connection.client.post('', payload);

    return response.data.result;
  }

  /*
  async getModelFieldTypes(modelName: string) {
    const params = {
      service: 'object',
      method: 'execute_kw',
      args: [
        this.database,  // Nome del database
        this.uid,        // UID dell'utente
        this.password,   // Password dell'utente
        modelName,       // Il nome del modello per cui vogliamo ottenere la struttura
        'fields_get',    // Metodo 'fields_get' per ottenere la struttura dei campi
        [],              // Dominio vuoto perché vogliamo l'intera struttura del modello
        {},              // Parametri opzionali aggiuntivi (vuoto per questa richiesta)
      ]
    };

    const payload = {
      jsonrpc: '2.0',
      method: 'call',
      params: params,
      id: 3,  // ID della richiesta
    };

    try {
      const response = await this.connection.client.post('', payload);
      const fields = response.data.result;

      console.log(fields);

      // Estrai solo i tipi di campo (ttype)
      const fieldTypes = Object.values(fields).map(field => field.type);

      console.log(fieldTypes);  // Opzionale: visualizza i tipi di campo
      return fieldTypes;        // Restituisce solo i tipi di campo
    } catch (error) {
      console.error("Errore nel recuperare la struttura dei campi del modello:", error.message);
      return [];  // In caso di errore, restituisce un array vuoto
    }
  }
  */

  async getModelFields(modelName: string) {
    const params = {
      service: 'object',
      method: 'execute_kw',
      args: [
        this.database,  // Nome del database
        this.uid,        // UID dell'utente
        this.password,   // Password dell'utente
        'ir.model.fields',  // Modello 'ir.model.fields'
        'search_read',     // Metodo 'search_read' per ottenere direttamente i dati
        [
          ["model", "=", modelName]  // Dominio per filtrare i campi per il modello specificato
        ],
        {
          fields: [
            "name",               // Nome del campo
            "field_description",  // Descrizione del campo
            "ttype",              // Tipo del campo
            "model",              // Modello di appartenenza
            "required",           // Se il campo è obbligatorio
            "readonly",           // Se il campo è in sola lettura
            "default",            // Valore di default
            "store",              // Se il campo è memorizzato nel DB
            "related",            // Se è un campo relativo
            "selection",          // Se è un campo di tipo selection
          ]
        }
      ]
    };

    const payload = {
      jsonrpc: '2.0',
      method: 'call',
      params: params,
      id: 3,  // ID della richiesta, potrebbe essere anche dinamico se necessario
    };

    try {
      const response = await this.connection.client.post('', payload);
      console.log(response.data);  // Opzionale: puoi rimuoverlo in produzione
      return response.data.result;  // Restituisce i risultati
    } catch (error) {
      console.error("Errore nel recuperare i campi del modello:", error.message);
      return [];  // In caso di errore, restituisce un array vuoto
    }
  }

  public async getUsers() {
    const payload = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        model: "res.users", // Il modello degli utenti
        domain: [],
        fields: [
          "id", // ID dell'utente
          "name", // Nome dell'utente
          "image_1920", // Immagine del profilo (base64)
          "groups_id", // Gruppi a cui appartiene l'utente
        ]
      },
      id: 1
    };

    const response = await this.connection.client.post('', payload);
    console.log(response.data);

    return response.data.result;
  }

  public async getUserGroupsAndPermissions(userId: number) {
    const payload = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        model: "res.groups", // Modello dei gruppi
        domain: [["users", "in", [userId]]], // Filtra i gruppi in base agli utenti
        fields: [
          "name", // Nome del gruppo
          "model_access", // Permessi sul modello
          "users", // Gli utenti che appartengono al gruppo
        ]
      },
      id: 2
    };

    const response = await this.connection.client.post('', payload);
    console.log(response.data);

    return response.data.result;
  }

  public async createRecord(modelName: string, record: OdooRecordSyntax): Promise<number[]> {
    const params = {
      service: 'object',
      method: 'execute_kw',
      args: [
        this.database,
        this.uid,
        this.password,
        modelName,
        'create',
        [record],
      ],
    }

    const payload = {
      'jsonrpc': '2.0',
      'method': 'call',
      'params': params,
      'id': 1
    }

    const response = await this.connection.client.post('', payload);

    if (DEBUG) {
      console.log(`
        ModelQueryBuilder | readRecord
        - user: ${this.uid}
        - password: ${this.password}
        - response:`, 
        response
      );
    }

    return response.data.result;
  }

  public async createRecords(modelName: string, records: OdooRecordSyntax[]): Promise<number[]> {
    const params = {
      service: 'object',
      method: 'execute_kw',
      args: [
        this.database,
        this.uid,
        this.password,
        modelName,
        'create',
        records,
      ],
    }

    const payload = {
      'jsonrpc': '2.0',
      'method': 'call',
      'params': params,
      'id': 1
    }

    const response = await this.connection.client.post('', payload)

    return response.data.result;
  }

  public async writeRecords(modelName: string, recordsId: number[], body: OdooRecordSyntax): Promise<number[]> {
    const params = {
      service: 'object',
      method: 'execute_kw',
      args: [
        this.database,
        this.uid,
        this.password,
        modelName,
        'write',
        [
          recordsId,
          body
        ],
      ],
    }

    const payload = {
      'jsonrpc': '2.0',
      'method': 'call',
      'params': params,
      'id': 1
    }

    const response = await this.connection.client.post('', payload)

    return response.data.result;
  }

  public async multiWriteRecords(modelName: string, records: [number, OdooRecordSyntax][]): Promise<number[]> {
    const params = {
      service: 'object',
      method: 'execute_kw',
      args: [
        this.database,
        this.uid,
        this.password,
        modelName,
        'write',
        records
      ],
    }

    const payload = {
      'jsonrpc': '2.0',
      'method': 'call',
      'params': params,
      'id': 1
    }

    const response = await this.connection.client.post('', payload)

    return response.data.result;
  }

  /**
  * Get the list of records ids
  *
  * @param {string} modelName - The name of the registered Model
  * @param {LogicFilter[]} [andFilters="[]"] - The filters for the AND logic
  * @param {LogicFilter[]} [orFilters="[]"] - The filters for the OR logic
  * @param {FieldsFilter} [fields] - The filter for the fields you want to retrieve
  * @param {number} limit - The max number of records to be retrieved
  * @returns {Promise<number[]>} The ids of founds arrays
  */
  public async searchRecords(
    modelName: string,
    andFilters: LogicFilter[] = [],
    orFilters: LogicFilter[] = [],
    fields?: FieldsFilter,
    limit?: number
  ): Promise<number[]> {
    const params = {
      service: 'object',
      method: 'execute_kw',
      args: [
        this.database,
        this.uid,
        this.password,
        modelName,
        'search',
        [andFilters, orFilters],
        {
          fields,
          limit
        }
      ],
    }

    const payload = {
      'jsonrpc': '2.0',
      'method': 'call',
      'params': params,
      'id': 1
    }

    const response = await this.connection.client.post('', payload)

    return response.data.result;
  }

  /**
  * Get the list of records and their content
  *
  * @param {string} modelName - The name of the registered Model
  * @param {LogicFilter[]} [andFilters="[]"] - The filters for the AND logic
  * @param {LogicFilter[]} [orFilters="[]"] - The filters for the OR logic
  * @param {FieldsFilter} [fields] - The filter for the fields you want to retrieve
  * @param {number} limit - The max number of records to be retrieved
  * @returns {OdooRecord[]} List of the records
  */
  public async searchReadRecords<T extends OdooRecord>(
    modelName: string,
    andFilters: LogicFilter[] = [],
    orFilters: LogicFilter[] = [],
    fields?: FieldsFilter,
    limit?: number
  ): Promise<T[]> {
    // Combina i filtri AND e OR
    const filters = [
      ...andFilters, // I filtri AND
      ...(orFilters.length > 0 ? [orFilters] : []), // Aggiungi i filtri OR se presenti
    ];

    const params = {
      service: 'object',
      method: 'execute_kw',
      args: [
        this.database,
        this.uid,
        this.password,
        modelName,
        'search_read',
        [
          andFilters,
        ],
        {
          fields,
          limit,
        }

        /*
        [
          [
            ['check_in', '>=', `${formattedDate} 00:00:00`],
            //['check_out', '<=', `${formattedDate} 23:59:59`],
          ],
        ],
        {
          fields: [
            'id',
            'employee_id',
            'department_id',
            'check_in',
            'check_out'
          ],
          limit: 100
        }, // Campi da recuperare
        */
      ]
    }

    const payload = {
      'jsonrpc': '2.0',
      'method': 'call',
      'params': params,
      'id': 1
    }

    const response = await this.connection.client.post('', payload)

    if (DEBUG) {
      console.log(`
        ModelQueryBuilder | readRecord
        - user: ${this.uid}
        - password: ${this.password}
        - response:
      `, response.data);
    }

    return response.data.result;
  }

  public async readRecord(
    modelName: string,
    recordId: number,
    fields?: FieldsFilter,
    limit?: number
  ): Promise<T> {
    const params = {
      service: 'object',
      method: 'execute_kw',
      args: [
        this.database,
        this.uid,
        this.password,
        modelName,
        'read',
        [[recordId]],
        {
          fields,
          limit,
        }
      ],
    }

    const payload = {
      'jsonrpc': '2.0',
      'method': 'call',
      'params': params,
      'id': 1
    }

    const response = await this.connection.client.post('', payload);

    if (DEBUG) {
      console.log(`
        ModelQueryBuilder | readRecord
        - user: ${this.uid}
        - password: ${this.password}
        - response:
          ${JSON.stringify(response.data.result)}
      `);
    }

    return response.data.result[0];
  }

  public async readRecords(
    modelName: string,
    recordsId: number[],
    fields?: FieldsFilter,
    limit?: number
  ): Promise<T[]> {
    const params = {
      service: 'object',
      method: 'execute_kw',
      args: [
        this.database,
        this.uid,
        this.password,
        modelName,
        'read',
        [recordsId],
        {
          fields,
          limit,
        }
      ],
    }

    const payload = {
      'jsonrpc': '2.0',
      'method': 'call',
      'params': params,
      'id': 1
    }

    const response = await this.connection.client.post('', payload)

    return response.data.result;
  }
}

export class ModelQueryBuilder<T> {
  public readonly user: OdooUser;
  public readonly modelName: string;

  public constructor(user: OdooUser, modelName: string) {
    this.user = user;
    this.modelName = modelName;
  }

  public async searchData(): Promise<OdooModelData> {
    return await this.user.searchReadRecords('ir.model', [['model', '=', this.modelName]], [], [], undefined);
  }

  public async searchFieldTypes(): Promise<OdooField[]> {
    const params = {
      service: 'object',
      method: 'execute_kw',
      args: [
        this.user.database,
        this.user.uid,
        this.user.password,
        this.modelName,
        'fields_get',
        [],
        {}
      ],
    }

    const payload = {
      jsonrpc: '2.0',
      method: 'call',
      params: params,
      id: 3,  // ID della richiesta
    };

    const response = await this.user.connection.client.post('', payload);

    return response.data.result;
  }

  public async createRecord(body: OdooRecordSyntax): Promise<number> {
    const params = {
      service: 'object',
      method: 'execute_kw',
      args: [
        this.user.database,
        this.user.uid,
        this.user.password,
        this.modelName,
        'create',
        [body],
      ],
    }

    const payload = {
      'jsonrpc': '2.0',
      'method': 'call',
      'params': params,
      'id': 1
    }

    const response = await this.user.connection.client.post('', payload);

    if (DEBUG) {
      console.log(response.data);
      console.log(`
        ModelQueryBuilder | createRecord
        - user: ${this.user.uid}
        - password: ${this.user.password}
        - model_name: ${this.modelName}
        - body: ${JSON.stringify(body)}
        - response:
      `, response);
    }

    return response.data.result;
  }

  public async createRecords(records: OdooRecordSyntax[]): Promise<number[]> {
    const params = {
      service: 'object',
      method: 'execute_kw',
      args: [
        this.user.database,
        this.user.uid,
        this.user.password,
        this.modelName,
        'create',
        records,
      ],
    }

    const payload = {
      'jsonrpc': '2.0',
      'method': 'call',
      'params': params,
      'id': 1
    }

    const response = await this.user.connection.client.post('', payload)

    console.log(`
      ModelQueryBuilder | createRecords
      - user: ${this.user.uid}
      - password: ${this.user.password}
      - response:
      ${response.data.result}
    `);

    return response.data.result;
  }

  public async writeRecord(recordId: number, body: OdooRecordSyntax): Promise<boolean> {
    const params = {
      service: 'object',
      method: 'execute_kw',
      args: [
        this.user.database,
        this.user.uid,
        this.user.password,
        this.modelName,
        'write',
        [
          [recordId],
          body
        ],
      ],
    }

    const payload = {
      'jsonrpc': '2.0',
      'method': 'call',
      'params': params,
      'id': 1
    }

    const response = await this.user.connection.client.post('', payload)

    console.log(`
      ModelQueryBuilder | writeRecord
      - user_uid: ${this.user.uid}
      - password: ${this.user.password}
      - id: ${recordId}
      - body: ${JSON.stringify(body)}
      - response:
    `, response);

    return response.data.result;
  }

  public async writeRecords(recordsId: number[], body: OdooRecordSyntax): Promise<number[]> {
    const params = {
      service: 'object',
      method: 'execute_kw',
      args: [
        this.user.database,
        this.user.uid,
        this.user.password,
        this.modelName,
        'write',
        [
          recordsId,
          body
        ],
      ],
    }

    const payload = {
      'jsonrpc': '2.0',
      'method': 'call',
      'params': params,
      'id': 1
    }

    const response = await this.user.connection.client.post('', payload);

    console.log(`
      ModelQueryBuilder | writeRecords
      - user: ${this.user.uid}
      - password: ${this.user.password}
      - response:
      ${response.data.result}
    `);

    return response.data.result;
  }

  public async multiWriteRecords(records: [number, OdooRecordSyntax][]): Promise<number[]> {
    const params = {
      service: 'object',
      method: 'execute_kw',
      args: [
        this.user.database,
        this.user.uid,
        this.user.password,
        this.modelName,
        'write',
        records
      ],
    }

    const payload = {
      'jsonrpc': '2.0',
      'method': 'call',
      'params': params,
      'id': 1
    }

    const response = await this.user.connection.client.post('', payload)

    return response.data.result;
  }

  /**
  * Get the list of records ids
  *
  * @param {LogicFilter[]} [andFilters="[]"] - The filters for the AND logic
  * @param {LogicFilter[]} [orFilters="[]"] - The filters for the OR logic
  * @param {FieldsFilter} [fields] - The filter for the fields you want to retrieve
  * @param {number} limit - The max number of records to be retrieved
  * @returns {Promise<number[]>} The ids of founds arrays
  */
  public async searchRecords(
    andFilters: LogicFilter[] = [],
    orFilters: LogicFilter[] = [],
    fields?: FieldsFilter,
    limit?: number
  ): Promise<number[]> {
    const params = {
      service: 'object',
      method: 'execute_kw',
      args: [
        this.user.database,
        this.user.uid,
        this.user.password,
        this.modelName,
        'search',
        [andFilters, orFilters],
        {
          fields,
          limit
        }
      ],
    }

    const payload = {
      'jsonrpc': '2.0',
      'method': 'call',
      'params': params,
      'id': 1
    }

    const response = await this.user.connection.client.post('', payload)

    return response.data.result;
  }

  /**
  * Get the list of records and their content
  *
  * @param {LogicFilter[]} [andFilters="[]"] - The filters for the AND logic
  * @param {LogicFilter[]} [orFilters="[]"] - The filters for the OR logic
  * @param {FieldsFilter} [fields] - The filter for the fields you want to retrieve
  * @param {number} limit - The max number of records to be retrieved
  * @returns {OdooRecord[]} List of the records
  */
  public async searchReadRecords(
    andFilters: LogicFilter[] = [],
    orFilters: LogicFilter[] = [],
    fields?: FieldsFilter,
    limit?: number
  ): Promise<T[]> {
    // Combina i filtri AND e OR
    const filters = [
      ...andFilters, // I filtri AND
      ...(orFilters.length > 0 ? [orFilters] : []), // Aggiungi i filtri OR se presenti
    ];

    const params = {
      service: 'object',
      method: 'execute_kw',
      args: [
        this.user.database,
        this.user.uid,
        this.user.password,
        this.modelName,
        'search_read',
        [
          andFilters,
        ],
        {
          fields,
          limit,
        }
      ]
    }

    const payload = {
      'jsonrpc': '2.0',
      'method': 'call',
      'params': params,
      'id': 1
    }

    const response = await this.user.connection.client.post('', payload);

    console.log(`
      ModelQueryBuilder | searchReadRecords
      - user: ${this.user.uid}
      - password: ${this.user.password}
      - model: ${this.modelName}
      - response:
    `, response);

    return response.data.result;
  }

  public async readRecord(
    recordId: number,
    fields?: FieldsFilter,
    limit?: number
  ): Promise<T> {
    const params = {
      service: 'object',
      method: 'execute_kw',
      args: [
        this.user.database,
        this.user.uid,
        this.user.password,
        this.modelName,
        'read',
        [[recordId]],
        {
          fields,
          limit,
        }
      ],
    }

    const payload = {
      'jsonrpc': '2.0',
      'method': 'call',
      'params': params,
      'id': 1
    }

    const response = await this.user.connection.client.post('', payload);

    if (DEBUG) {
      console.log(`
        ModelQueryBuilder | readRecord
        - user: ${this.user.uid}
        - password: ${this.user.password}
        - response:
          ${JSON.stringify(response.data.result)}
      `);
    }

    return response.data.result[0];
  }

  public async readRecords(
    recordsId: number[],
    fields?: FieldsFilter,
    limit?: number
  ): Promise<T[]> {
    const params = {
      service: 'object',
      method: 'execute_kw',
      args: [
        this.user.database,
        this.user.uid,
        this.user.password,
        this.modelName,
        'read',
        [recordsId],
        {
          fields,
          limit,
        }
      ],
    }

    const payload = {
      'jsonrpc': '2.0',
      'method': 'call',
      'params': params,
      'id': 1
    }

    const response = await this.user.connection.client.post('', payload)

    return response.data.result;
  }

  public async deleteRecordById(recordId: number): Promise<any> {
    const params = {
      service: 'object',
      method: 'execute_kw',
      args: [
        this.user.database,
        this.user.uid,
        this.user.password,
        this.modelName,
        'unlink',
        [recordId],
      ]
    }

    const payload = {
      'jsonrpc': '2.0',
      'method': 'call',
      'params': params,
      'id': 1
    }

    const response = await this.user.connection.client.post('', payload);

    if (DEBUG) {
      console.log(`
        ModelQueryBuilder | deleteRecord
        - user: ${this.user.uid}
        - password: ${this.user.password}
        - response:
      `, response);
    }

    return response.data.result;
  }

  public async deleteRecord(record: OdooRecord): Promise<any> {
    return this.deleteRecordById(record.id);
  }

}