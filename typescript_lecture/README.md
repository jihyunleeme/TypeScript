## 섹션 0. 기본 세팅하기

- **typescript는 최종적으로 javascript로 변환**
- typescript는 언어이자 컴파일러(tsc). ts -> js로
- 타입검사, 코드 변환 (타임검사에 에러가 나더라도 js로 변환은 가능, 서로 별개)
- 기본 세팅 및 실행

```bash
# package.json 생성
> npm init -y

# typescript 설치
> npm i typescript

# tsc 실행
> npx tsc
```

## 섹션 1. 기본 문법 배우기

- 타입스크립트는 변수, 매개변수, 리턴값에 타입을 붙이는 것
- 타입은 js로 변환시 사라진다
- 에러 메시지 마지막 문장을 주의 깊게 보자
- 빈 배열일 때는 never라는 타입이 나온다, 주의할 것

```js
const array: string[] = []; // string[]로 고쳐 적어주자
```

- non-null assertion (비추)
  - null이나 undefined가 아님을 보증하는 non-null assertion
  - non-null assertion을 사용하지 말고 if (head) {}와 같은 형태로 안정성 챙기기

```js
  const head = document.querySelector('#head')!;
  if (head) {
    head.innerHTML = 'hello';
  }
```

- tuple

```js
const tuple: [string, number] = ["111", 1];
tuple.push("hello"); // 이렇게 push로 넣는건 막아주지 못하므로 주의
```

- enum : 숫자, 문자열 기반 열거형 제공, 여러개의 변수를 하나로 묶을 때 사용
  - object 형태로 적는 것과 동일

```js
enum EDirection {
  Up = 1,
  Down,
  Left,
  Right,
}

const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;
```

- object 타입에서 key만 꺼내오고 싶을 때 `keyof typeof`
- union : |
  - 속성 중 하나만 있어도 됨
- intersection : &
  - 모든 속성이 다 있어야함
- 예전에는 IProps, TAlias, EList와 같은 형태로 많이 썼지만 요즘은 I,T,E 많이 안쓴다. 필요성 X
- 타입을 집합으로 생각
  - 넓은 타입에 좁은 타입을 넣을 수 있지만, 좁은 타입에 넓은 타입을 넗을 수 없다.
  - **객체**는 **상세**할수록 **좁은 타입**
- 잉여 속성 검사 : 객체 리터럴을 대입할 때

```js
interface A {
  a: string;
}

const myObj = { a: "hello", b: "world" };
const myObj1: A = myOjb;
```

- void

  - undefined는 ok, null은 불가
  - 함수 : 리턴값이 void
  - 매개변수, 매서드 : 리턴값이 존지해도 됨, 사용하지 않겠다 (무시)

- type guard 타입 좁히기
  - 컴파일러가 타입 예측할 수 있도록 narrowing
  - `typeof`와 `instanceof`

## 섹션 2. lib.es5.d.ts 분석

## 섹션 4. 마무리
