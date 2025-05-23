export class Parish {
  private _id: number;
  private _name: string;
  private _location: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(id: number, name: string, location: string, createdAt: Date, updatedAt: Date) {
    this._id = id;
    this._name = name;
    this._location = location;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get location(): string {
    return this._location;
  }

  set location(value: string) {
    this._location = value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  toJSON(): any {
    return {
      id: this._id,
      name: this._name,
      location: this._location,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
