# Studyloom

Plataforma web de estudo gamificado para concursos públicos, com Trilha do Edital, baterias de questões com cronômetro e a mentora Lumi.

## Rodar o app

Requisitos: Git e Node.js 22.12 ou mais novo.

```bash
cd studyloom-web
npm ci
npm run dev
```

Abra http://localhost:5173/. No PowerShell do Windows, use `npm.cmd` no lugar de `npm` se os scripts estiverem bloqueados.

## Documentação

- [Guia de avaliação](docs/guia-avaliacao.md): como rodar, roteiro de testes e o que mudou na migração.
- [Pendências](docs/pendencias.md): o que falta antes de um lançamento.
- [CLAUDE.md](CLAUDE.md): contexto do projeto, regras de negócio e histórico das etapas.

## Pastas

- `studyloom-web/`: app React (React 19, TypeScript, Vite, Zustand).
- `studyloom-prototipo/`: protótipo original em HTML, CSS e JS (somente referência).
- `docs/`: guias, pendências e arte original da marca.
