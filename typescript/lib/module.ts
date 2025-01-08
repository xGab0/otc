import { OdooUser } from "wrapper";

export class OdooModule {

  public readonly user: OdooUser;
  public readonly id: number;
  public readonly name: string;

  public constructor(user: OdooUser, id: number, name: string) {
    this.user = user;
    this.id = id;
    this.name = name;
  }

  public async searchModels(): Promise<number[]> {
    return await this.user.searchRecords('ir.model', [['module', '=', this.name]], [], undefined, undefined);
  }

  public async searchReadModels(): Promise<any[]> {
    return await this.user.searchReadRecord('ir.model', [['module', '=', this.name]], [], undefined, undefined);
  }

}
