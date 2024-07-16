# 어플리케이션 요약
- **모든 백엔드 서비스는 로컬환경에서 Docker 가상화환경을 만들어 진행했습니다. (localhost에서 실행)**
- Auth-server를 통해 로그인, 회원 조회 기능 구현
- 로그인 시 Auth-server에서 보내준 Token을 이용하여 Data-server 자료 접근
- 자료는 비품(Supplies), 예산(Budgets)로 구성
- 회원은 권한에 따라 3이하의 role을 가진 사람은 비품과 예산에 대해 조회만 가능
- 3초과하는 권한을 가진 회원은 비품과 예산에 대하 CRUD 가능

# 환경 설정
- 📌로컬환경에서 Docker Desktop과 같은 Docker 가상화 환경이 필요합니다. (localhost에서 실행)

# 빌드 및 실행 방법
1. 최상위 프로젝트 폴더 `star_backend_test`에서 다음 명령어를 실행하여 Docker 컨테이너를 빌드하고 실행합니다
- `docker-compose up --build -d`

2. DB, 인증 서버, 데이터 서버에 초기 데이터를 삽입하는 데 약 35초 정도 소요됩니다. 
로그에서 `Initial data inserted.` 메시지가 표시되면 성공적으로 초기화된 것입니다.

3. 리액트 프론트엔드를 실행하려면 다음 단계를 수행합니다.
- `star_backend_test/client` 디렉토리로 이동
- `npm install`로 종속성 패키지 설치
- `npm run tsc`로 TypeScript 파일 빌드
- `npm run build`로 리액트 애플리케이션 빌드
- `npm start`로 프론트엔드 실행


# 아키텍처 구성도

![image](https://github.com/user-attachments/assets/926d4248-a48e-4af0-aac0-89445c11d6b2)


# 엔드포인트 설명
## Auth-server(인증서버) - localhost:8000
### 📌서버 실행시 `http://localhost:8000/api-docs/` 에서 Swagger로 테스트 가능합니다. 
![image](https://github.com/user-attachments/assets/7fb6755f-9d68-42ba-9a49-5cbb17b27434)




#### GET /api/auth/member
- 설명: 모든 회원 정보 가져오기
 
#### POST /api/auth/member
- 설명: 새로운 회원 생성

#### GET /api/auth/member/{id}
- 설명: 회원 ID로 회원 정보 가져오기

#### POST /api/auth/login
- 설명: 사용자 로그인
  - 사용자 로그인 성공시 토큰이 포함된 Session 객체 반환

## Data-server(자료서버) - localhost:8001
### 📌서버 실행시 `http://localhost:8001/api-docs/` 에서 Swagger로 테스트 가능합니다. 
### 📌자료서버는 토큰이 필요해 Authorize에 로그인 시 반환되는 토큰을 넣어야 작동합니다.
> **<로그인시 반환하는 accessToken의 값>**

![image](https://github.com/user-attachments/assets/43b6e389-cc1d-4608-a6b5-d4473bdecf9b)



> **<인증키 넣는 곳>**

![image](https://github.com/user-attachments/assets/ae53e1b7-c884-40bb-a697-302abea00f9c)



### 예산 관련 엔드포인트
#### GET /api/data/budgets
- 설명: 모든 예산 목록을 반환
#### POST /api/data/budgets  
- 설명: 새로운 예산을 생성 📢(role > 3.0)
#### GET /api/data/budgets/{id}
- 설명: 지정된 ID의 예산을 반환
#### PUT /api/data/budgets/{id}  
- 설명: 지정된 ID의 예산을 업데이트 📢(role > 3.0)
#### DELETE /api/data/budgets/{id}  
- 설명: 지정된 ID의 예산을 삭제 📢(role > 3.0)

### 물품 관련 엔드포인트
#### GET /api/data/supplies
- 설명: 모든 물품 목록을 반환
#### POST /api/data/supplies  
- 설명: 새로운 물품을 생성 📢(role > 3.0)
#### GET /api/data/supplies/{id}
- 설명: 지정된 ID의 물품을 반환
#### PUT /api/data/supplies/{id}  
- 설명: 지정된 ID의 물품을 업데이트 📢(role > 3.0)
#### DELETE /api/data/supplies/{id}  
- 설명: 지정된 ID의 물품을 삭제 📢(role > 3.0)


