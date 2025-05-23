import { User } from "./User";
import { Parish } from "./parish";

export class PriestProfile {
  private _id: number;
  private _user: User;
  private _fullName: string;
  private _ordinationDate: Date;
  private _parish: Parish;
  private _bio: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: number,
    user: User,
    fullName: string,
    ordinationDate: Date,
    parish: Parish,
    bio: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this._id = id;
    this._user = user;
    this._fullName = fullName;
    this._ordinationDate = ordinationDate;
    this._parish = parish;
    this._bio = bio;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get fullName(): string {
    return this._fullName;
  }

  set fullName(value: string) {
    this._fullName = value;
  }

  get ordinationDate(): Date {
    return this._ordinationDate;
  }

  set ordinationDate(value: Date) {
    this._ordinationDate = value;
  }

  get parish(): Parish {
    return this._parish;
  }

  set parish(value: Parish) {
    this._parish = value;
  }

  get bio(): string {
    return this._bio;
  }

  set bio(value: string) {
    this._bio = value;
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
      user: this._user ? this._user.toJSON?.() ?? this._user : null,
      fullName: this._fullName,
      ordinationDate: this._ordinationDate,
      parish: this._parish ? this._parish.toJSON?.() ?? this._parish : null,
      bio: this._bio,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
