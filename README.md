
## 🔎 프로젝트 소개
>  개발자들을 위한 열품타, 모각코!

### 주요 기능

- GitHub Oauth 로그인
- 타이머를 통해 하루 공부 시간 측정
- 할 일 관리 투두리스트 서비스

<div  align="center">
  <img width="600" height="400" alt="gif" src="https://github.com/Mogakco-web/FE-Mogakco/assets/65716445/accd4322-b70c-4a3f-8b2e-aa2d2ce4a8da">
</div>
    

## 📌 기술 스택

- `React`
- `TypeScript`
- `tailwindCSS`
- `tailwind-styled-components`
- `Zustand`
- `react-query`

###  UI/UX 페이지 구성

- 피그잼 : [idea note](https://www.figma.com/file/Qo5d4o9Or8HgTo54YJXDmr/%EB%AA%A8%EA%B0%81%EC%BD%94?node-id=0%3A1&t=3ctAX5zffx6iLjMS-0)
- 피그마 : [figma](https://www.figma.com/file/j2f0YnPrLS8jTQcaxWiOT8/%E3%85%81%E3%84%B1%E3%85%8BUI%2FUX?node-id=0%3A1&t=eYOjLucnlbiOl9Lw-0)


## 🍏 Git 컨벤션

### Branch

- `master (main)`: 바로 product로 release(배포)할 수 있는 브랜치
- `dev (develop)`: product로 release할 준비가 된 가장 안정적인 브랜치로 개발이 완료된 상태라면 **master** 브랜치로 merge
- `feat(feature)`: 새로운 기능을 추가할 때 사용하는 브랜치로 **dev** 브랜치에서 분기하여 진행되며, 개발이 완료된 기능은 **dev** 브랜치로 merge
    - **브랜치명 컨벤션** : `feat/{pageName}-{featureName}`

### Commit

| "feat: ~ " | 새로운 기능 추가 |
| --- | --- |
| "fix: ~ " | 수정에 대한 커밋 |
| "bug" ~ " : | 버그에 대한 커밋 |
| "design: ~ " | 스타일이나 UI 수정 |
| "docs: ~ " | 문서 수정 |
| “chore: ~” | 패키지 관련설정 |
