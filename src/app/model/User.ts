export class User {
  private _id?: number;
  private _username: string;
  private _email: string;
  private _role: string;
  private _profilePictureUrl: string;
  private _isActive: boolean;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    username: string,
    email: string,
    role: string,
    profilePictureUrl: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,
    id?: number
  ) {
    this._username = username;
    this._email = email;
    this._role = role;
    this._profilePictureUrl = profilePictureUrl;
    this._isActive = isActive;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._id = id;
  }

  // ID
  get id(): number | undefined {
    return this._id;
  }

  set id(value: number | undefined) {
    this._id = value;
  }

  // Username
  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  // Email
  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  // Role
  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }

  // Profile Picture URL
  get profilePictureUrl(): string {
    return this._profilePictureUrl;
  }

  set profilePictureUrl(value: string) {
    this._profilePictureUrl = value;
  }

  // Is Active
  get isActive(): boolean {
    return this._isActive;
  }

  set isActive(value: boolean) {
    this._isActive = value;
  }

  // Created At
  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  // Updated At
  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  toJSON() {
    return {
      id: this._id,
      username: this._username,
      email: this._email,
      role: this._role,
      profilePictureUrl: this._profilePictureUrl,
      isActive: this._isActive,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

}
