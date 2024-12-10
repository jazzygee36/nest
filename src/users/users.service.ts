import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Samson',
      email: 'sam@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 2,
      name: 'Jospeh',
      email: 'josep@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 3,
      name: 'David',
      email: 'david@gmail.com',
      role: 'INTERN',
    },
    {
      id: 4,
      name: 'Queen',
      email: 'queen@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 5,
      name: 'Jojo',
      email: 'jojo@gmail.com',
      role: 'ENGINEER',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users && this.users.length;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User with this id not found');
    }
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: userByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removeUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);
    return removeUser;
  }
}
