# auth-server/Dockerfile
FROM node:16

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 패키지와 종속성 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# 빌드 (선택 사항, TypeScript 사용 시)
RUN npm run build

# 애플리케이션 실행
CMD ["npm", "start"]

# 사용할 포트 설정
EXPOSE 8000
