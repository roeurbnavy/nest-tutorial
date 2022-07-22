import { Items } from './../items';
import { Item } from '../item';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemsService {
  private readonly items: Items = {
    1: {
      id: 1,
      name: 'Burger',
      price: 5.99,
      description: 'Tasty',
      image: 'https://cdn.auth0.com/blog/whatabyte/burger-sm.png',
    },
    2: {
      id: 2,
      name: 'Pizza',
      price: 2.99,
      description: 'Cheesy',
      image: 'https://cdn.auth0.com/blog/whatabyte/pizza-sm.png',
    },
    3: {
      id: 3,
      name: 'Tea',
      price: 1.99,
      description: 'Informative',
      image: 'https://cdn.auth0.com/blog/whatabyte/tea-sm.png',
    },
  };

  findAll(): Items {
    return this.items;
  }

  create(doc: Item): void {
    const id = new Date().valueOf();
    this.items[id] = {
      ...doc,
      id,
    };
  }

  find(id: number): Item {
    const record: Item = this.items[id];

    if (record) {
      return record;
    }

    throw new Error('No record found');
  }

  update(doc: Item): void {
    console.log('doc', doc);
    if (this.items[doc.id]) {
      this.items[doc.id] = doc;

      return;
    }

    throw new Error('No record found to update');
  }

  delete(id: number): void {
    const doc: Item = this.items[id];

    if (doc) {
      delete this.items[id];
      return;
    }

    throw new Error('No record found to delete');
  }
}
