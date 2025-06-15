import styles from "../styles/Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div
        style={{
          display: "flex",
          maxWidth: 1400,
          margin: "0 auto",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 32,
          padding: "0 32px",
        }}
      >
        <div style={{ minWidth: 320, flex: 2 }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>
            © MelhorPlano.net 2025
          </div>
          <div style={{ marginBottom: 12 }}>Todos os direitos reservados.</div>
          <address style={{ fontStyle: "normal", marginBottom: 12 }}>
            <div>
              <b>Endereço:</b> R José Versolato, nº 111, Lote 04, Bloco B, Sala
              3.014, Centro
            </div>
            <div>São Bernardo do Campo - SP</div>
            <div>CEP: 09.750-730</div>
          </address>
          <div style={{ marginBottom: 16 }}>
            <b>Telefone:</b> +55 (31) 97575-9932
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <a href="#" aria-label="Facebook" style={{ display: "flex" }}>
              <svg width="36" height="36" fill="none">
                <circle cx="18" cy="18" r="18" fill="#7fd1c3" />
                <path
                  d="M20.5 18h-1.5v6h-2.5v-6h-1v-2h1v-1.2c0-1.1.6-2.3 2.3-2.3h1.7v2h-1.2c-.3 0-.3.1-.3.3V16h1.5l-.2 2z"
                  fill="#fff"
                />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" style={{ display: "flex" }}>
              <svg width="36" height="36" fill="none">
                <circle cx="18" cy="18" r="18" fill="#7fd1c3" />
                <g>
                  <circle cx="18" cy="18" r="5" stroke="#fff" strokeWidth="2" />
                  <circle cx="23" cy="13" r="1" fill="#fff" />
                </g>
              </svg>
            </a>
            <a href="#" aria-label="X" style={{ display: "flex" }}>
              <svg width="36" height="36" fill="none">
                <circle cx="18" cy="18" r="18" fill="#7fd1c3" />
                <path
                  d="M14 13h2l2 2 2-2h2l-3 3 3 3h-2l-2-2-2 2h-2l3-3-3-3z"
                  fill="#fff"
                />
              </svg>
            </a>
            <a href="#" aria-label="YouTube" style={{ display: "flex" }}>
              <svg width="36" height="36" fill="none">
                <circle cx="18" cy="18" r="18" fill="#7fd1c3" />
                <rect x="14" y="15" width="8" height="6" rx="1" fill="#fff" />
                <polygon points="17,16.5 21,18 17,19.5" fill="#7fd1c3" />
              </svg>
            </a>
            <a href="#" aria-label="Telegram" style={{ display: "flex" }}>
              <svg width="36" height="36" fill="none">
                <circle cx="18" cy="18" r="18" fill="#7fd1c3" />
                <path
                  d="M25 13l-2.5 10c-.2.7-.6.9-1.2.6l-3.3-2.4-1.6.8c-.2.1-.4 0-.5-.2l.2-1.7 6.2-5.6c.3-.3-.1-.4-.4-.2l-7.7 4.8-1.6-.5c-.7-.2-.7-.7.1-1l11.2-4.3c.6-.2 1 .1.8.9z"
                  fill="#fff"
                />
              </svg>
            </a>
          </div>
        </div>
        {/* Coluna 2: Sobre nós */}
        <div style={{ minWidth: 180, flex: 1 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>SOBRE NÓS</div>
          <nav>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>
                <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                  Sobre o MelhorPlano.net
                </a>
              </li>
              <li>
                <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                  Imprensa
                </a>
              </li>
              <li>
                <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                  Guia Editorial
                </a>
              </li>
            </ul>
          </nav>
        </div>
        {/* Coluna 3: Suporte */}
        <div style={{ minWidth: 180, flex: 1 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>SUPORTE</div>
          <nav>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>
                <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                  Fale Conosco
                </a>
              </li>
              <li>
                <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                  Blog
                </a>
              </li>
              <li>
                <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                  Mapa do Site
                </a>
              </li>
            </ul>
          </nav>
        </div>
        {/* Coluna 4: Faça parte */}
        <div style={{ minWidth: 180, flex: 1 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>FAÇA PARTE</div>
          <nav>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>
                <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                  Carreira
                </a>
              </li>
              <li>
                <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                  Seja um Parceiro
                </a>
              </li>
            </ul>
          </nav>
        </div>
        {/* Coluna 5: Grupo Cash3 */}
        <div style={{ minWidth: 180, flex: 1 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>GRUPO CASH3</div>
          <nav>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>
                <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                  Minha Conexão
                </a>
              </li>
              <li>
                <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                  MelhorPlano.net
                </a>
              </li>
              <li>
                <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                  Méliuz
                </a>
              </li>
              <li>
                <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                  Picodi Br
                </a>
              </li>
              <li>
                <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                  Promobit
                </a>
              </li>
              <li>
                <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                  iDinheiro
                </a>
              </li>
              <li>
                <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                  iMaquininhas
                </a>
              </li>
              <li>
                <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                  iMelhorSeguro
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* Selo Google Site Seguro */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: 32,
          paddingRight: 32,
        }}
      >
        <svg width="48" height="48" fill="none" style={{ marginRight: 8 }}>
          <circle cx="24" cy="24" r="20" fill="#7fd1c3" />
          <path
            d="M24 14l7 3v5c0 5.25-3.5 10-7 11-3.5-1-7-5.75-7-11v-5l7-3z"
            fill="#fff"
          />
        </svg>
        <div>
          <div style={{ fontSize: 16, color: "#fff" }}>Google</div>
          <div style={{ fontSize: 13, color: "#fff" }}>SITE SEGURO</div>
        </div>
      </div>
    </footer>
  );
}
