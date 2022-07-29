import { ConnectionInterface } from '../domain/interfaces/connection.interface';

export const getConnectionForButton = (
  connections: ConnectionInterface[],
  buttonGpioNumbeR: number,
) => {
  return connections.find((connection) => {
    return connection.button === buttonGpioNumbeR;
  });
};
