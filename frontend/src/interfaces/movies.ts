export default interface IMovie {
  id: string;
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
}
