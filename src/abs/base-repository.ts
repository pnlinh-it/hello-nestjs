import { Repository } from 'typeorm';
import { ResultSetHeader } from 'mysql2';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class BaseRepository<T> extends Repository<T> {
  async insertGetId(values: QueryDeepPartialEntity<T> | QueryDeepPartialEntity<T>[]) {
    const insertResult = await this.createQueryBuilder()
      .insert()
      .values(values)
      .updateEntity(false)
      .execute();

    return (insertResult.raw as ResultSetHeader).insertId;
  }

  async insertWithoutReload(values: QueryDeepPartialEntity<T> | QueryDeepPartialEntity<T>[]) {
    return this.createQueryBuilder().insert().values(values).updateEntity(false).execute();
  }
}
