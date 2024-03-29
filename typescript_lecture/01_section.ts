/* 기본문법 배우기 */

// 타입스크립트는 변수, 매개변수, 리턴값에 타입을 붙이는 것

let a: string = "4";
const b: number = 112;
const c: boolean = false;
const d: undefined = undefined;
const e: null = null;
const f: any = "hello"; // 아무거나 다 됨. javascript와 동일
const g: true = true; // const일 때 바뀔일 없음. 고정된 값. 최대한 정확하게 좁은 범위로 타입적기
const h = "7"; // 타입스크립트가 저절로 h:'7'로 지정하였다. any로 추론할 때 고쳐 적어주자.

/* 함수 타입지정하기 */
function add(x: number, y: number): number {
  return x + y;
}
function add1(x: number, y: number) {
  return x + y;
} // return값이 명확하므로 number로 타입추론

function minus(x: number, y: number); // 타입, js로 변환시 사라짐
function minus(x, y) {
  // 선언
  return x - y;
}

const multiply: (x: number, y: number) => number = (x, y) => x * y;

// type과 함께
type multiply = (x: number, y: number) => number;
const multiplyWithType: multiply = (x, y) => x * y;

// interface와 함께
interface IMultiply {
  (x: number, y: number): number;
}

// object
const obj: { lat: number; lng: number } = { lat: 120, lng: 400 };

// array
const stringArr: string[] = ["123", "789"];
const numArr: number[] = [999, 123];

// generic
const arrGen: Array<number> = [111, 777];

// tuple destructuring
// 배열처럼 구조분해
const tuple1: [number, number, number] = [111, 222, 333];
const tuple2: [number, boolean, number] = [111, true, 333];

// as
let aa = 834;
// aa = 'hello' // Type 'string' is not assignable to type 'number'.ts(2322)
aa = "hello" as unknown as number; // 문자열을 억지로 바꿀수 있음. (js 변환시 사라짐)

const array: string[] = [];
array.push("hello");
// 빈 배열일때 never라는 타입이 나온다. 주의

// non-null assertion
/*
 * null이나 undefined가 아님을 보증하는 !
 * const head = document.querySelector('#head')!;
 * 하지만, 비추 사용하지 않기 if(head){} 으로 안정성 챙기기
 */

const head = document.querySelector("#head");
if (head) {
  head.innerHTML = "hello";
}

// 지옥이 펼쳐지는 String
// 주의하기
const m: string = "hello";
// const n: String = 'hell';

// 원시 래퍼 타입, 템플릿 리터럴 타입, rest, 튜플
type World = "world" | "hell";
const o: World = "world"; // 자동으로 추천

type Greeting = `hello ${World}`;
const p: Greeting = "hello hell";

let arr: string[] = [];
let arr2: Array<string> = [];

function rest(k, ...args: string[]) {
  // 헷갈리면 타입을 지우고 js로 생각하기
  console.log(k, args); // 1, [2,3]
}

const tuple: [string, number] = ["1", 1];
// tuple[2] = 'hello'; error

tuple.push("hello"); // 막아주지 못함

/* enum */
const enum EDirection {
  Up, // 0
  Down, // 1
  Left, // 2
  Right, // 3
}

const w = EDirection.Up; // 0
const v = EDirection.Left; // 2

const enum EDirection1 {
  Up = 3, // 3
  Down, // 4
  Left = 6, // 6
  Right, // 7
}

const enum EDirection2 {
  Up = "123",
  Down = "hello",
  Left = "world",
  Right = "js",
}

// 여러개의 변수를 하나로 묶을때 enum을 사용한다.
// EDirection와 ODirection는 동일. EDirection은 js로 변환하면 사라진다.
// 남겨야할지 안 남겨야할지 고민된다면 남기기.

const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;

/*
const ODirection: { Up: 0, Down: 1, Left: 2, Right: 3 } = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3,
} 
*/

// key만 꺼내오고 싶을 때
const obj3 = { a: "123", b: "hello", c: "world" } as const;
type Key = keyof typeof obj3; // "a" | "b" | "c"

type Value = typeof obj3[keyof typeof obj3]; // "world" | "123" | "hello"

// 타입
// 간단하게 - type, 객체지향 - interface
type X = { a: string }; // 타입 alias
const x: X = { a: "hello" };

interface Y {
  a: string;
}
const y: Y = { a: "hello" };

/*
 * | - union
 * & - intersection
 */

// intersection - 모든 속성이 다 있어야함
type Ampersand = { hello: "world" } & { jh: "lee" };
const ampersand: Ampersand = { hello: "world", jh: "lee" };

// union - 하나만 있어도 됨
type Union = { hello: "world" } | { jh: "lee" };
const union: Union = { hello: "world" };

/* 타입 애일리어스와 인터페이스 상속 */
type Animal = { breath: true };
type Mammalia = Animal & { breed: true };
type Human = Mammalia & { think: true };

const jhlee: Human = { breath: true, breed: true, think: true };

interface Ia {
  breath: true;
}

interface Ib extends Ia {
  breed: true;
}

const bb: Ib = { breath: true, breed: true };

interface IDoSomthing {
  talk: () => void;
}

interface IDoSomthing {
  eat: () => void;
}

interface IDoSomthing {
  shit: () => void;
}
interface IDoSomthing {
  sleep: () => void;
}

const person: IDoSomthing = { talk() {}, eat() {}, shit() {}, sleep() {} };

// naming rule
// IProps, TAlisa, EHello를 네이밍에 붙이기 vs 안 붙이기
// 요즘 안 붙인다

/*
 * 타입을 집합으로 생각하자 (좁은타입과 넓은 타입)
 * 넓은 타입에 좁은 타입은  넣을 수 있지만, 좁은 타입에 넓은 타입을 넣을 수 없다.
 */

// 1. union, intersection
// 2. object - 객체는 상세할수록 좁은 타입

/* void의 두가지 사용방법 */
// 잉여 속성 검사 - 객체리터럴을 대입할 때
interface Myobj {
  one: string;
}
const myobj = { one: "hello world", two: "typescript" };
const myobj1: Myobj = myobj;

/*
 * void - return 값을 갖지 않음
 * undefined는 ok
 * null은 불가
 * void 타입은 크게 세가지
 * 1. 리턴 값이 void
 * 2. 매개변수 - 리턴값이 존재해도 됨
 * 3. 매서드 - 리턴값이 존재해도 됨
 * 함수에 직접적으로 void 썼을때만 에러가난다. 매개변수와 메서드는 상관 없음
 */

function myVoidFunc(): void {
  return;
} // 리턴 값이 없다

function q(calback: () => void): void {}
q(() => {
  return "www";
});
// 매개변수 : callback의 void 라턴값이 무엇이든 사용하지 않겠다
// 함수에 직접적으로 function q():void {} 리턴값이 없어야한다.

interface Dog {
  bark: () => void;
}

const chiwawa: Dog = {
  bark() {
    return "abc";
  }, // 메서드의 return 값을 사용하지 않겠다.
};
const cookie = chiwawa.bark() as unknown as number;

// 구현부(바디 없이) 만들기 싫을 때, declare (자바스크립트파일에서 사라짐)
declare function forEach(
  arr: number[],
  callback: (el: number) => void // 매개변수에서 쓰인 void는 리턴값이 무엇이든 상관하지 않겠다.
): void;

// 외부에서 만들어진 애들을 타입선언할때 declare로 해놓고 쓸수 있음.
declare let r: number;
r = 234;

let target: number[] = [];
forEach([1, 2, 3], (el) => target.push(el));

// type으로 사용하지 않으면 객체끼리 비교, 객체를 구분할때는 in을 사용하자
/* 10/17 다시 정리하기!
const sparrow = {peak()};
const tiger = {roar()}
const squirel = {collect()}

if ('peak' in a) {
  a
}
*/

/* 커스텀 타입가드 (is, 형식 조건자) */
// 정확한 타입을 구분해주는 커스텀 함수 직접 만들수 있다
// ex) promise 실패한 것만 모아놓기
// promise settled

/* unknown과 any(그리고 타입 대입가능표) */
// any 타입선언 포기, unknown 지금 당장 모르겠고 나중에 쓰겠다.

const choco: unknown = chiwawa.bark();
(choco as Dog).bark();

// unknown을 사용하는 대표적 경우 try,catch문에서 unknown
try {
} catch (error) {
  (error as Error).message; // typescript의 Error
  // (error as AxiosError) // typescript의 Error
}

/* 타입 좁히기(타입가드) */
function numOrStr1(a: number | string) {
  if (typeof a === "string") {
    a.split(",");
  } else {
    // ts가 if else문에서 원시값을 체크
    a.toFixed(1);
  }
}

function numOrStr(a: number | string) {
  if (typeof a === "number") {
    a.toFixed(1);
  }

  if (typeof a === "string") {
    a.charAt(1);
  }
}

numOrStr("123");
numOrStr(1);

// as - 남이 만든 타입이 틀렸을때, 억지로 바꿀때 as 사용하기

function numOrNumArray(a: number | number[]) {
  if (Array.isArray(a)) {
    a.concat(4);
  } else {
    a.toFixed(5);
  }
}

numOrNumArray(123);
numOrNumArray([1, 2, 3]);

class A {
  // class 자체가 타입이 될 수 있음
  aaa() {}
}

class B {
  bb() {}
}

function aOrB(param: A | B) {
  if (param instanceof A) {
    param.aaa();
  }
}

aOrB(new A());
aOrB(new B());

// 타입이라는 속성을 하나씩 넣는 습관을 들이자
const bird = { type: "bird" };
const dog = { type: "dog" };
const cat = { type: "cat" };

// function myAnimal(a: bird | dog | cat) {
//   if (a.type === "bird") {
//   }
// }

// 타입을 구분해주는 커스텀 함수를 직접 - is

/* {}와 Object */

const test1: {} = true;
// const test2: {} = null;
// const test2: {} = undefined;
const allType: Object = "hi"; //  {}, Object 모든 타입 (null, undefined 제외)
const xx: object = { hello: "wolrd" }; // 우리가 타입은 object이다 주의하기
const yy: object = { aaa: "hello" }; // object 지양, interface, type, class
const z: unknown = "hi"; // 모든 값을 받을 수있음

// unknown v4.8.x
// unknown = {} | null | undefined
if (z) {
  z;
}

/* readonly */
// 실수로 바꾸는 것을 못 바꾸도록 막을 수 있다
interface AA {
  readonly a: string;
  b: string;
}

const aaa: AA = { a: "hello", b: "world" };
// aaa.a = '안녕' // readonly properties기 때문에 assign할 수 없음.

/* 인덱스드 시그니처 */
// 어떤 키든 간에 문자열, 숫자... 등으로 지정
type Ab = { a: string; b: string; c: string; d: string }; // 와 같은 형태를
type Abc = { [key: string]: number };
//             ^ 모든 key string, ^ 모든 value가 number

/* 맵드 타입스 */
type D = "Human" | "Mammal" | "Animal"; // interface로는 | 가 되지 않으니 type으로 작성하기
type E = { [key in D]: D };

/* 클래스의 새로운 기능들 */
class F {
  a: string;
  b: number;

  constructor(a: string, b: number = 123) {
    // 기본값이 있을 때 ? 붙이지 않음, b?: number 에러
    // 생성자에 매개변수
    this.a = "123";
    this.b = 123;
  }

  method() {}
}

type FF = F; // class의 이름은 그 자체로 타입이 됨. 클래스를 가르키는 것이 아니라 new Bb()를 가르킴
const ff: F = new F("123");

// 타입스크립트의 private을 되도록 사용하자, 정교
// 자바스크립트에서는 public으로 바뀐다고 해도 타입스트립트 단계에서 애러를 뱉어내기 때문에
// 타입스크립트의 private을 사용하자
class G {
  private a: string = "123";
  #b: number = 123;
  protected c: string = "hello";
  // 자바스크립트에서 제공하는 #, private

  method() {
    console.log(this.a, this.#b); // 자기 클래스 내부에서만 쓸 수 있음
  }
}

interface H {
  readonly a: string;
  b: string;
}

/* 클래스를 implements로 통제 가능 */
class I implements H {
  readonly a: string = "123";
  // protected b: string = "world";
  b: string = "world";
  c: string = "wow";

  method() {
    console.log(this.a);
    console.log(this.b);
    console.log(this.c);
  }
}

class J extends I {
  method() {
    console.log(this.a);
    console.log(this.b);
    console.log(this.c);
  }
}
new J().a; // private 접근불가, 상속한 곳에서는 불가
new J().b; // protected 인스턴스에서 불가, 상속한 곳에서는 가능
new J().c; // public 안밖에서 자유롭게 가능

/* 
            public    protected     private
클래스 내부      O          O             O
인스턴스        O          X            X
상속 클래스      O          O            X

- 컴파일 이후 interface 자바스크립트 파일로는 없어진다
- 클래스는 그 자체로 타입
- 객체지향의 원칙 : 추상에 의존하고 구현에 의존하지 말라.
  - interface 추상
  - class 구현 
abstract 키워드를 사용하여 추상 클래스, 메소드 만들 수 있다
extends로 하지 않고 class로 하자
*/

/* optional */
function abc(a: number, b?: number, c?: number) {}
abc(1);
abc(1, 2);
abc(1, 2, 3);
// abc(1,2,3,4) error

function abcd(...args: number[]) {} // 전부
abcd(1, 2, 3, 4);

let object2: { a: string; b?: string } = { a: "hello", b: "world" };
object2 = { a: "hello" };

