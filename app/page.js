import { Suspense } from "react";
import ConfettiEffect from "./ConfettiEffect";

export const dynamic = "force-dynamic";

const TABNEWS_CONTENTS_API_URL =
  "https://www.tabnews.com.br/api/v1/contents?page=1&per_page=1&strategy=new";

const numberFormatter = new Intl.NumberFormat("pt-BR");

const EXTERNAL_LINK_ICON = (
  <svg
    className="external-icon"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z" />
  </svg>
);

const STATS_VALUE_SKELETON = (
  <span className="stats-value stats-skeleton" role="status">
    <span aria-hidden="true">&nbsp;</span>
    <span className="sr-only">Carregando total de conteúdos publicados...</span>
  </span>
);

async function getTotalPublishedContents() {
  try {
    const response = await fetch(TABNEWS_CONTENTS_API_URL, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });

    const totalHeader = response.ok
      ? response.headers.get("x-pagination-total-rows")
      : null;

    // Libera o stream do corpo imediatamente, pois só precisamos do header.
    void response.body?.cancel().catch(() => {});

    if (!totalHeader) {
      return null;
    }

    const total = Number.parseInt(totalHeader, 10);

    return Number.isNaN(total) ? null : total;
  } catch {
    return null;
  }
}

async function PublishedContentsStat() {
  const totalPublishedContents = await getTotalPublishedContents();

  if (totalPublishedContents === null) {
    return (
      <span className="stats-fallback">
        Não foi possível carregar no momento
      </span>
    );
  }

  return (
    <strong className="stats-value">
      {numberFormatter.format(totalPublishedContents)}
    </strong>
  );
}

export default function Home() {
  return (
    <>
      <ConfettiEffect />

      <main className="page-container">
        <section className="card" aria-labelledby="page-title">
          <div className="status-badge">
            <span className="status-dot" aria-hidden="true" />
            Em construção
          </div>

          <h1 id="page-title" className="title">
            Em construção
          </h1>

          <p className="subtitle">
            Estamos neste momento construindo um espaço para quem curte
            tecnologia.
          </p>

          <div className="stats-box" aria-live="polite">
            <span className="stats-label">
              Total de conteúdos publicados no TabNews
            </span>
            <Suspense fallback={STATS_VALUE_SKELETON}>
              <PublishedContentsStat />
            </Suspense>
            <span className="stats-source">
              Atualizado em tempo real via API pública do TabNews
            </span>
          </div>

          <a
            href="https://www.tabnews.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="official-link"
          >
            Acessar o site oficial do TabNews
            {EXTERNAL_LINK_ICON}
          </a>
        </section>
      </main>
    </>
  );
}
