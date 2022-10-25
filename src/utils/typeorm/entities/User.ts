import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import {Exclude} from "class-transformer"

@Entity({name: "users"})
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({name: "first_name"})
    firstName: string;

    @Column({name: "last_name"})
    lastName: string;

    @Column({unique: true})
    username: string;

    @CreateDateColumn({name: "created_at"})
    createdAt: Date

    @Column({select: false})
    @Exclude()
    password: string;
}