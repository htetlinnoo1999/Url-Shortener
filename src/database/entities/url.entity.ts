import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'urls' })
export class Url {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public originalUrl: string;

  @Column()
  public shortenUrl: string;

  @Column({ type: 'timestamp', nullable: true })
  public expired_at?: Date;

  @Column({ default: 0 })
  public count?: number;

  @Column({ type: 'timestamp', nullable: true })
  public deleted_at: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
