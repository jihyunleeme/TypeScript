// 타입스크립트는 변수, 매개변수, 리턴값에 타입을 붙이는 것

let a: string = '4';
const b: number = 112;
const c: boolean = false;
const d: undefined = undefined;
const e: null = null;
const f: any = 'hello'; // 아무거나 다 됨. javascript와 동일
const g: true = true; // const일 때 바뀔일 없음. 고정된 값. 최대한 정확하게 좁은 범위로 타입적기
const h = '7' // 타입스크립트가 저절로 h:'7'로 지정하였다. any로 추론할 때 고쳐 적어주자.

/* 함수 타입지정하기 */
function add(x: number, y:number):number { return x + y }
function add1(x: number, y:number) { return x + y } // return값이 명확하므로 number로 타입추론

function minus(x: number, y:number) // 타입, js로 변환시 사라짐
function minus(x, y) { // 선언
    return x - y;
}

const multiply: (x:number, y:number) => number = (x, y) => x * y;

// type과 함께
type multiply = (x:number, y:number) => number;
const multiplyWithType: multiply = (x, y) => x * y;

// interface와 함께
interface IMultiply {
    (x: number, y: number): number;
}

// object
const obj: { lat: number, lng: number } = { lat: 120, lng: 400 };

// array
const stringArr: string[] = ['123', '789']
const numArr: number[] = [999, 123]

// generic
const arrGen: Array<number> = [111,777];

// tuple destructuring
// 배열처럼 구조분해
const tuple1: [number,number,number] = [111,222,333]
const tuple2: [number,boolean,number] = [111,true,333]

// as
let aa = 834;
// aa = 'hello' // Type 'string' is not assignable to type 'number'.ts(2322)
aa = 'hello' as unknown as number // 문자열을 억지로 바꿀수 있음. (js 변환시 사라짐)


// enum

// declare