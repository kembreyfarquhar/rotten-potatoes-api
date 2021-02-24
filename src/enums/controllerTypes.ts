import { MovieController } from '../db/controllers/Movie.controller';
import { UserController } from '../db/controllers/User.controller';

const controllerTypes = {
	USERS: UserController,
	MOVIES: MovieController,
} as const;

type ControllerTypeKeys = keyof typeof controllerTypes;
type ControllerTypeValues = typeof controllerTypes[ControllerTypeKeys];

export { controllerTypes, ControllerTypeKeys, ControllerTypeValues };
