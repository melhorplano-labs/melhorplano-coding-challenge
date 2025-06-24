import styles from "../styles/Menu.module.scss";

export default function Menu() {
  return (
    <header className={styles.menu}>
      <div className={styles.logo}>
        <span className={styles.pigIcon}>
          <img
            src="https://cdn.melhorplano.net/cms/2022/10/27/635ab82c7c24dmelhorplano-net-logo-nova.svg"
            alt="Logo MelhorPlano.net"
            style={{ height: 40, width: "auto" }}
          />
        </span>
      </div>
      <nav>
        <ul>
          <li>
            <a href="/recommend">RECOMENDAÇÕES</a>
          </li>

          <li>
            <a href="#">INTERNET</a>
          </li>
          <li>
            <a href="#">CELULAR</a>
          </li>
          <li>
            <a href="#">TV E STREAMING</a>
          </li>
          <li>
            <a href="#">FIXO E COMBO</a>
          </li>
          <li>
            <a href="#">OPERADORAS</a>
          </li>
          <li>
            <a href="#">GUIAS E FERRAMENTAS</a>
          </li>
          <li>
            <a href="#">CADASTRAR PROVEDOR</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
