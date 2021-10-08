import { getDb } from '../data';

export const getOneChild = () => {
  const db = getDb();
  if (!db) {
    throw new Error('Could not connect to database');
  }
  return new Promise((resolve, reject) => {
    (db as any).execute({
      sqlText: 'select * from CHILDREN LIMIT 1',
      complete: (err, statement, rows) => {
        if (err) {
          throw new Error(err);
        }
        resolve({ rows });
      }
    });
  });
};

export const getAllChildren = 	async () => {
		const db = getDb();
		if (!db) {
			throw new Error('Could not connect to database');
		}
		return new Promise((resolve, reject) => {
			(db as any).execute({
			sqlText: 'select * from CHILDREN;',
			complete: (err, statement, rows) => {
				if (err) {
				throw new Error(err);
				}
				resolve({ rows });
			}
			});
		});
	}
