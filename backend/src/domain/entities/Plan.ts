export class Plan {
  id: number;
  name: string;
  speed: string;
  price: number;
  operator: string;
  city: string;
  dataCap: number; // franquia em GB

  constructor(input: Partial<Plan>) {
    Object.assign(this, input);
  }
}