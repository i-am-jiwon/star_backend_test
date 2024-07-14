export type PostMember = {
    id: string;          // 사용자 ID
    password: string;    // 비밀번호
    salt: string;        // 비밀번호 해시용 솔트
    name: string;        // 이름
    role: number;        // 역할 (권한)
    email?: string;      // 이메일 (추가 가능 시)
    tel?: string;        // 전화번호 (추가 가능 시)
    depart?: string;     // 부서 (추가 가능 시)
    duty?: string;       // 직무 (추가 가능 시)
  };
  
  export type GetMember = {
    id: string;          // 사용자 ID
    name: string;        // 이름
    email?: string;      // 이메일 (있을 경우)
    depart?: string;     // 부서 (있을 경우)
    duty?: string;       // 직무 (있을 경우)
    role: number;        // 역할
  };