import { useEffect, useState } from "react";
import api from "../services/api";
import PlanCard from "../components/PlanCard";

interface Plan {
  id: number;
  name: string;
  speed: string;
  price: number;
  highlight?: boolean;
}

export default function Home() {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    api.get("/plans").then((res) => setPlans(res.data));
  }, []);

  return (
    <div>
      <h1>Planos de Internet</h1>
      {plans.map((plan) => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}
