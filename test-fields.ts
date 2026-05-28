class Base {
  constructor(data: any) {
    Object.assign(this, data);
    console.log('Base constructor, title:', (this as any).title);
  }
}

class Child extends Base {
  title: string;
}

const c = new Child({ title: 'hello' });
console.log('After new Child, title:', c.title);
