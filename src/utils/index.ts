export const formatTime = (timer: number) => {
  const getSeconds: string = `0${timer % 60}`.slice(-2);
  const minutes: string = `${Math.floor(timer / 60)}`;
  const getMinutes: string = `0${Number(minutes) % 60}`.slice(-2);
  const getHours: string = `0${Math.floor(timer / 3600)}`.slice(-2);

  return `${getHours} : ${getMinutes} : ${getSeconds}`;
};
