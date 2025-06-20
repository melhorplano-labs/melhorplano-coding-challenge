import { makeApp } from "./app";

const PORT = process.env.PORT || 3001;

const app = makeApp();

app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
