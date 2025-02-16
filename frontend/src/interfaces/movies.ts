export interface IMovie {
  id: string;
  movieId?: string;
  title: string;
  description: string;
  img: string;
  trailer: string;
  releaseDate: string;
  genres: string[];
  duration: number;
  rating: number;
  director: string;
  cast: string[];
  language: string;
  awards: string[];
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userEmail: string;
  userImg: string;
  rating: number;
  datePosted: string;
  comment: string;
}
