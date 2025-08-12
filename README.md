# 1. 폴더 구조

```bash
(root)
├── .env # 환경변수
├── .prettierrc # Prettier 규칙
├── .vscode
│   └── settings.json # VSCode 설정 덮어씌우기용
├── app
│   ├── app.vue # 리액트에서 App.jsx 같은 역할
│   ├── assets # 자료들
│   │   ├── font # 폰트 파일
│   │   ├── icon # svg 아이콘
│   │   └── image # 그 외 이미지들
│   ├── components # 공통으로 사용되는 컴포넌트들
│   │   └── Hello.vue
│   ├── composables # 리액트에 hook이 있다면, Vue는 composable이 있음. 즉 Vue의 생명주기를 활용하는 재사용되는 함수들을 모아놓는 곳. 이름도 useXXX처럼 쓴다고 해서 리액트 훅이랑 많이 비슷한듯
│   │   └── useAPI.ts
│   ├── layouts # 레이아웃
│   ├── pages # 페이지 라우팅
│   │   ├── hello # /hello
│   │   │   ├── _components
│   │   │   │   └── HelloComponent.vue
│   │   │   ├── _composables
│   │   │   ├── _utils
│   │   │   └── index.vue # /hello 쳤을때 보여지는 페이지
│   │   └── index.vue # / 쳤을때 보여지는 페이지
│   ├── plugins # Vue에게 자동으로 주입되는 플러그인?들
│   │   ├── api.ts
│   │   └── tanstack-query.ts
│   ├── stores # Pinia라는 Vue의 상태관리 라이브러리로 만든 상태들 저장
│   └── utils # 기타 재사용되는 일반 자바스크립트 함수들
├── eslint.config.mjs # ESlint 설정
├── nuxt.config.ts # Nuxt.js 설정
├── package-lock.json
├── package.json
├── public # public
│   ├── favicon.ico
│   └── robots.txt
├── server # Nuxt.js 서버
│   └── api
│       └── hello.ts # /api/hello API 서버처럼 활용할 수 있음
├── tailwind.config.ts # Tailwind 설정
└── tsconfig.json # Typescript 설정

```

# 2. 코드 스타일

### 컴포넌트 작성법

공통 컴포넌트는 `app/components` 안에 `Hello.vue` 이런식으로 하기. 파일 이름이 곧 컴포넌트 이름이므로 반드시 대문자로 시작.

개별 페이지에서만 쓰이는 컴포넌트들은 `app/pages/hello/_components/Hello.vue` 처럼 만들기. 언더스코어(\_)로 시작함으로써 전역적으로 쓰이지 않고 로컬처럼 쓴다는 약속

그리고 `className` 이 아니라 `class` 입니다?!! @배다은

### 나머지는 아직 생각이…

# 3. 스타일 가이드

## 색상 변수

## Tailwind 사용법 예시

```css
**color-<변수 이름>**

ex)
color-primary
color-background
color-gray-b4
...

**bg-<변수 이름>**
ex)
bg-primary
bg-background
bg-gray-b4

tailwind에 변수 등록해놔서 자유롭게 사용가능함

```

# 4. 커밋 메시지 규칙

예시)

```markdown
feat(#1): 뭐시기뭐시기 함요 -> 뭐시기 겁나 좋아하네 ?
```

```markdown
ui(#13): 뭐시기 페이지 퍼블리싱
```

| feat(#이슈번호)     | 일반적인 코드 추가/수정                                                               |
| ------------------- | ------------------------------------------------------------------------------------- |
| fix(#이슈번호)      | 코드 오류, 버그 해결                                                                  |
| ui(#이슈번호)       | UI 작업                                                                               |
| api(#이슈번호)      | API 연동 관련 작업                                                                    |
| refactor(#이슈번호) | 리팩토링(같은 기능을 하지만, 코드 가독성이나 로직 측면에서 더 효율적으로 수정한 경우) |
| chore(#이슈번호)    | 기타 패키지 설정이라든지 설정 파일 건든다던지..                                       |
| actions(#이슈번호)  | Github Actions 건들때                                                                 |
| add(#이슈번호)      | 파일 추가한경우                                                                       |
| remove(#이슈번호)   | 파일 삭제한경우                                                                       |
| hotfix(#이슈번호)   | 급하게 수정할경우                                                                     |

# 5. 브랜치 네이밍

`feat/navbar` 이런식으로 하지말고

`ui/navbar`

`api/mypage`

세부적이게 이런식으로 ㄱㄱ

# 6. 기여 방식

1. 이슈 생성
2. develop에서 브랜치 생성
3. 생성된 브랜치 checkout 후 작업 시작
4. 작업한거 다 커밋 후 푸시
5. (해당 브랜치) -> develop을 destination으로 하는 PR 생성
6. 코드 리뷰 & status check 확인 후 머지

# 7. svg를 컴포넌트처럼 쓰는 방법

[nuxt-svgo · Nuxt Modules](https://nuxt.com/modules/nuxt-svgo)

```jsx
<template>
	<SearchIcon class="w-[20px] h-[20px]" filled="false" />
</template>

<script setup>
import SearchIcon from "~/assets/icon/search.svg";

// .. 나머지 js 코드

</script>
```
