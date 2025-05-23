export class VisitSchedule {
  private _id: number;
  private _visitType: string;
  private _datetime: Date;
  private _address: string;
  private _note: string;
  private _createAt: Date;
  private _updateAt: Date;
  private _priest_id: number;

  constructor(
    id: number,
    visitType: string,
    datetime: Date,
    address: string,
    note: string,
    createAt: Date,
    updateAt: Date,
    priest_id: number
  ) {
    this._id = id;
    this._visitType = visitType;
    this._datetime = datetime;
    this._address = address;
    this._note = note;
    this._createAt = createAt;
    this._updateAt = updateAt;
    this._priest_id = priest_id;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get visitType(): string {
    return this._visitType;
  }

  set visitType(value: string) {
    this._visitType = value;
  }

  get datetime(): Date {
    return this._datetime;
  }

  set datetime(value: Date) {
    this._datetime = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  get note(): string {
    return this._note;
  }

  set note(value: string) {
    this._note = value;
  }

  get createAt(): Date {
    return this._createAt;
  }

  set createAt(value: Date) {
    this._createAt = value;
  }

  get updateAt(): Date {
    return this._updateAt;
  }

  set updateAt(value: Date) {
    this._updateAt = value;
  }

  get priest_id(): number {
    return this._priest_id;
  }

  set priest_id(value: number) {
    this._priest_id = value;
  }

  toJSON(): any {
    return {
      id: this._id,
      visitType: this._visitType,
      datetime: this._datetime,
      address: this._address,
      note: this._note,
      createAt: this._createAt,
      updateAt: this._updateAt,
      priest_id: this._priest_id,
    };
  }
}
