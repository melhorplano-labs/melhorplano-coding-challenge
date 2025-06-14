interface Plan {
  id: number;
  name: string;
  speed: string;
  price: number;
}

export default function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}>
      <h2>{plan.name}</h2>
      <p>Velocidade: {plan.speed}</p>
      <p>Preço: R$ {plan.price}</p>
    </div>
  );
}
