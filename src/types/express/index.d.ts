import { JWTToken } from '../../db/middleware/requireToken';
import { User } from '../../db/models/User.model';
import { Movie } from '../../db/models/Movie.model';

declare global {
  namespace Express {
    export interface Request {
      token: JWTToken;
      user: User;
      movie: Movie;
      movies: Movie[];
    }
  }
}
