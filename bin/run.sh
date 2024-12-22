#!/bin/bash

set -eo pipefail

# default variables
: "${PORT:=8000}"
# How many Gunicorn workers should you use?
# According to https://docs.gunicorn.org/en/stable/design.html#how-many-workers
# the formula is simple: (2 x $num_cores) + 1
# Leave it small if you have no way of knowing how many CPU cores you
# have, otherwise apply the formula.
: "${WORKERS:=4}"

usage() {
  echo "usage: ./bin/run.sh web|web-dev|demo|generate-hmac|pip-outdated|index|generate-requirements|mock-haystack|lint"
  exit 1
}

[ $# -lt 1 ] && usage

setup_python() {
  source .venv/bin/activate
}

case $1 in
  web)
    # production like
    setup_python
    gunicorn -w ${WORKERS} -k uvicorn.workers.UvicornWorker src.main:app -b 0.0.0.0:${PORT}
    ;;
  web-dev)
    echo "Remember! You can view the API docs on:"
    echo ""
    echo "  http://127.0.0.1:8000/docs"
    echo "  or"
    echo "  http://127.0.0.1:8000/redoc"
    echo ""

    echo "HERE IN WEB-DEV"
    ls -l
    echo "END OF LS"
    setup_python
    uvicorn src.main:app --reload --host 0.0.0.0 --port ${PORT}
    ;;
  demo)
    cd demo
    PORT=4000 npm run dev
    ;;
  generate-hmac)
    setup_python
    python src/generate-hmac.py $2 $3
    ;;
  index)
    setup_python
    python src/indexer.py $2 $3 $4 $5 $6 $7 $8 $9
    ;;
  mock-haystack)
    uv run uvicorn mock-haystack.main:app --reload --host 0.0.0.0 --port 9000
    ;;
  lint)
    setup_python
    ruff check src/*.py
    ;;
  page-titles-to-search-terms)
    setup_python
    python src/page-titles-to-search-terms.py $2 $3 $4 $5 $6 $7 $8 $9
    ;;
  *)
    echo "Don't know how to run: $1"
    exit 1
    ;;
esac
