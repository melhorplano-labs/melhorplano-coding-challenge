import { useEffect, useState } from "react";
import api from "../services/api";
import PlanCard from "../components/PlanCard";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.scss";

interface Plan {
  id: number;
  name: string;
  speed: string;
  price: number;
  benefits?: string[];
}

export default function Home() {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    api.get("/plans").then((res) => setPlans(res.data));
  }, []);

  return (
    <>
      <Menu />
      <div className={styles.container}>
        <h1 className={styles.titulo}>
          Ofertas de internet residencial exclusivas desse mês
        </h1>
        <p className={styles.subtitulo}>
          Confira as principais ofertas de internet banda larga no seu endereço.
          Compare preço, velocidade de internet, benefícios e mais!
        </p>
        <section className={styles.planos}>
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </section>
      </div>
      <Footer />
    </>
  );
}
