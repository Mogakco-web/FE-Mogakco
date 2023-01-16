# UI/UX 페이지 구성

피그잼 : https://www.figma.com/file/Qo5d4o9Or8HgTo54YJXDmr/%EB%AA%A8%EA%B0%81%EC%BD%94?node-id=0%3A1&t=3ctAX5zffx6iLjMS-0 

피그마 : https://www.figma.com/file/j2f0YnPrLS8jTQcaxWiOT8/%E3%85%81%E3%84%B1%E3%85%8BUI%2FUX?node-id=0%3A1&t=eYOjLucnlbiOl9Lw-0

# **0. 개발 환경, 언어, 도구**

- VSCode
- React
- TypeScript
- Prettier
- Npm

# 1. React 코딩 컨벤션

## Variables

- file-scope 상수는 `UPPER_CASE` 로 작성합니다.   
- 그외에는 모두 `camelCase`
- `Boolean` 타입의 변수는 `is`, `has`, `can`과 같은 접두사를 붙입니다.

## Event Handler

- Component Prop로 넘기는 이벤트 핸들러에는 `on` 접두사를 붙입니다.

## File Naming

- components 이름은 `PascalCase` 로 작성합니다.
- Non-components, inline스타일, 속성명은 `camelCase` 로 작성합니다.

## BUG AVOIDANCE

- `null` 또는 `undefined` 일 수 있는 값은 optional chaining 연산자 `?.`를 사용합니다.

## ARCHITECTURE & CLEAN CODE

- 유틸리티 파일을 만들어 중복된 코드를 피합니다.
- 하나의 파일에 하나의 React component만 만듭니다.
- 다른 사람의 이해를 돕기 위해 주석을 다는 것을 권장합니다.
- console.log()를 지우고 커밋하길 권장합니다.
- API 호출이나 상태관련 로직은 분리해서 사용합니다.

## ES6

- spread 연산자를 사용합니다.
- let과 const만 사용합니다. (var 사용금지)
- 되도록 Arrow Function을 사용합니다.

# 2. 사용 라이브러리

- `tailwindCSS`
- `tailwind-styled-components`
- `Zustand`
- `react-query`
# 3. Git 컨벤션

## Branch

- `master (main)`: 바로 product로 release(배포)할 수 있는 브랜치
- `dev (develop)`: product로 release할 준비가 된 가장 안정적인 브랜치로 개발이 완료된 상태라면 **master** 브랜치로 merge
- `feat(feature)`: 새로운 기능을 추가할 때 사용하는 브랜치로 **dev** 브랜치에서 분기하여 진행되며, 개발이 완료된 기능은 **dev** 브랜치로 merge
    - **브랜치명 컨벤션** : `feat/{pageName}-{featureName}`

## Commit

| "feat: ~ " | 새로운 기능 추가 |
| --- | --- |
| "fix: ~ " | 수정에 대한 커밋 |
| "bug" ~ " : | 버그에 대한 커밋 |
| "design: ~ " | 스타일이나 UI 수정 |
| "docs: ~ " | 문서 수정 |
| “chore: ~” | 패키지 관련설정 |
