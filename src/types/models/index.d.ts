type MovieType = {
  title?: string;
  plot_summary?: string;
  duration?: string;
};

type UserType = {
  id?: number | string;
  username?: string;
  password?: string;
};

export { MovieType, UserType };
