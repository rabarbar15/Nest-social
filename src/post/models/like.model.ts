import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { Post } from './post.model';
import { User } from 'src/user/models/user.model';

@Table
export class Like extends Model<Like> {
  @ForeignKey(() => Post)
  @Column
      postId: number;

  @ForeignKey(() => User)
  @Column
      authorId: number;
}