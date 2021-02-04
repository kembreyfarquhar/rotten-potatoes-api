import { MovieController } from '../db/controllers/Movie.controller';
import { UserController } from '../db/controllers/User.controller';

const CONTROLLER_TYPES = {
  USERS: UserController,
  MOVIES: MovieController,
} as const;

type CONTROLLER_TYPES_KEYS = keyof typeof CONTROLLER_TYPES;
type CONTROLLER_TYPES_VALUES = typeof CONTROLLER_TYPES[CONTROLLER_TYPES_KEYS];

export { CONTROLLER_TYPES, CONTROLLER_TYPES_KEYS, CONTROLLER_TYPES_VALUES };
