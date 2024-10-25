import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Like } from 'src/post/models/like.model';

@Table
export class User extends Model<User> {
  @Column
      firstName: string;

  @Column
      lastName: string;

  @Column
      email: string;

  @Column
      password: string;

    @HasMany(() => Like)
        likes: Like[];
}
