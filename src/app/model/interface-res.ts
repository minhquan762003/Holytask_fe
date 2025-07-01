export interface Priest {
  id: number;
  fullName: string|undefined;
  avatar: string;       // => từ: user.profilePictureUrl
  parish: string;       // => từ: parish.name
  email: string;        // => từ: user.email
  phone: string;        // => bạn cần thêm trường này ở entity User/PriestProfile nếu muốn
  address: string;      // => bạn cần thêm trường này ở entity PriestProfile
  joined: string;       // => từ: ordinationDate (format ISO string)
  bio: string;
}


export interface ScheduleItem {
  id: number;
  datetime: Date;
  address: string;
  notes: string;
  visitType: string;
  createdAt: Date;
  updatedAt: Date;
  createdUser: string;
  priest: Priest;
  class: string;
  label: string;
  status:number;
  headline:string;
}

export interface Parish {
  id: number;
  name: string;
  location: string;
  createdAt?: string;
  updatedAt?: string;
}


export type Role = 'ADMIN' | 'PRIEST'; // hoặc các giá trị Enum thực tế bạn dùng

export interface User {
  id: number;
  username: string;
  passwordHash: string;
  email: string;
  role: Role;
  profilePictureUrl?: string;
  phoneNumber:string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PriestProfile {
  id: number;
  fullName: string;
  ordinationDate?: string;
  parish?: Parish;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
  updatedUser?: string;
  user?: User;
}

export interface SubParish{
  id:number,
  name:string,
  parish:Parish;
}

export interface ParishGroup{
  id:number,
  name:string,
  description:string,
  createdAt?: string;
  updatedAt?: string;
}

export interface ParishionerProfile{
  id:number,
  fullName:string,
  dateOfBirth:Date,
  address:string,
  parishGroup:ParishGroup
  phoneNumber:string,
  subParish:SubParish,
  imgUrl:string,
  updatedUser:string,
  createdUser:string,
  createdAt?: string;
  updatedAt?: string;
}

