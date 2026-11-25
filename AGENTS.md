# AGENTS.md

Contexto geral e convenções do projeto para agentes de IA.

## Sobre o Projeto

- **Repositório:** `clone-tabnews-ia`
- **Objetivo:** Implementação de um clone do `tabnews.com.br` para o `curso.dev` utilizando agentes de IA.
- **Idioma:** Português do Brasil (`pt-BR`) para interface e documentação.

## Stack Principal

- **Framework:** Next.js (App Router em `app/`)
- **Biblioteca de UI:** React
- **Linguagem:** JavaScript
- **Gerenciador de pacotes:** npm

> Consulte `package.json` como fonte de verdade para versões de dependências e scripts adicionais.

## Comandos

```bash
npm run dev    # Inicia o servidor de desenvolvimento
npm run build  # Gera o build de produção
npm run start  # Inicia o servidor em modo de produção
```

## Organização Base

- `app/` — rotas, layouts e estilos da aplicação (Next.js App Router).
- `AGENTS.md` — fonte única de contexto compartilhado para agentes de IA (`CLAUDE.md` referencia este arquivo via `@AGENTS.md`).
