export interface IRoomPhotoPhoto {
  pk: string;
  file: string;
  description: string;
}

export interface IRoomList {
  pk: number;
  name: string;
  country: string;
  city: string;
  price: number;
  rating: number;
  is_owner: boolean;
  photos: IRoomPhotoPhoto[];
}

export interface IRoomOwner {
  name: string;
  avatar: string;
  username: string;
}

export interface IAmenity {
  pk: number;
  name: string;
  description: string;
}

export interface IRoomDetail extends IRoomList {
  id: number;
  created_at: string;
  updated_at: string;
  rooms: number;
  toilet: number;
  description: string;
  address: string;
  pet_friendly: true;
  kind: string;
  is_owner: boolean;
  is_liked: boolean;
  category: ICategory;
  owner: IRoomOwner;
  amenities: IAmenity[];
  id: number;
}

export interface IReview {
  rating: ReactNode;
  payload: string;
  rating: number;
  user: IRoomOwner;
}

export interface ICategory {
  pk: number;
  name: string;
  kind: string;
}

export interface IBooking {
  check_in: string;
  check_out: string;
  guests: number;
  id: number;
  kind: string;
  not_canceled: boolean;
  room: {
    name: string;
    price: number;
  };
}
