#!/bin/bash

PG_BIN="C:/Program Files/PostgreSQL/18/bin"
PG_DATA="C:/Program Files/PostgreSQL/18/data"
PG_LOG="$PG_DATA/log.txt"

echo "=== PostgreSQL kontrol ediliyor..."
if "$PG_BIN/pg_isready.exe" -h localhost -p 5432 > /dev/null 2>&1; then
  echo "PostgreSQL zaten çalışıyor."
else
  echo "PostgreSQL başlatılıyor..."
  "$PG_BIN/pg_ctl.exe" -D "$PG_DATA" -l "$PG_LOG" start
  echo "PostgreSQL hazır olması bekleniyor..."
  for i in {1..30}; do
    if "$PG_BIN/pg_isready.exe" -h localhost -p 5432 > /dev/null 2>&1; then
      echo "PostgreSQL hazır."
      break
    fi
    sleep 1
  done
fi

echo "=== Prisma client oluşturuluyor..."
npx prisma generate

echo "=== Next.js başlatılıyor..."
npm run dev
