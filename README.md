# Banana Clicker — AppSec Pipeline Demo

Лёгкое учебное уязвимое приложение (кликер с бананом) + готовый AppSec-пайплайн.

## Уязвимости специально

- XSS через `innerHTML` при сохранении имени.
- Эндпоинт `/debug` отдаёт захардкоженные креды.
- Секреты в коде (для gitleaks).

## Как запустить локально

```bash
npm install
npm start
# открыть http://localhost:3000
```

## Пайплайн

Файл `.github/workflows/appsec.yml` содержит:

1. **gitleaks** — поиск секретов (первый job).
2. **Semgrep** — SAST (JS + OWASP).
3. **Syft + Trivy** — сборка образа → SBOM → сканирование High/Critical.
4. **Nuclei + Dastardly** — DAST по `https://cbrsecurity.org` (замени на свой URL или убери, если не нужно).

Все SARIF уходят в GitHub Security tab.

## .gitignore

Игнорируем:
- `node_modules/`
- `.env` и ключи
- логи, билдовые папки
- временные SARIF/SBOM (чтобы не коммитить отчёты)

Не игнорируем исходники, Dockerfile, workflow, package.json.
