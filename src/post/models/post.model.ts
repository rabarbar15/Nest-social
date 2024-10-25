import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from 'src/user/models/user.model';
import { Like } from './like.model';

@Table
export class Post extends Model<Post> {
    @Column
        title: string;

    @Column
        description: string;

    @Column
        createdDate: string;

    @ForeignKey(() => User)
    @Column
        authorId: string;

    @BelongsTo(() => User)
        user: User;
    
    @HasMany(() => Like)
        likes: Like[];
}
  