import { readFile } from 'fs';

export const file = {
  read: <T>(path: string): Promise<T> => {
    return new Promise((resolve, reject) => {
      readFile(path, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(data));
      });
    });
  },
};
