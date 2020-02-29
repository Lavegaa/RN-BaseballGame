# RN-BaseballGame [expo + contextAPI + typescript]

expo를 사용해 숫자야구를 만들었다. 상태관리를 위해 contextAPI를 사용했다.
![image](https://user-images.githubusercontent.com/34911173/75607373-c7b4cd80-5b39-11ea-9ae2-13c5576aa889.png)

# 빠른시작

## 클론

```
git clone https://github.com/Lavegaa/RN-BaseballGame.git
```

## dependencies 설치

```
npm install
```

or

```
yarn
```

## 시작

```
npm start
```

or

```
yarn start
```
## 클라이언트

핸드폰에서 expo client를 설치 후 터미널에 나오는 QR코드를 스캔해 어플리케이션을 실행한다.

Android - https://play.google.com/store/apps/details?id=host.exp.exponent&hl=ko

IOS - https://apps.apple.com/kr/app/expo-client/id982107779

# 기능

## contextAPI

상태관리를 위해 contextAPI를 사용했다.

- ### State
1. target : 쉬운 값 검사를 위해 number[] 타입으로 정했다.

2-1. game : 입력한 값을 배열에 Game[] 타입으로 저장한다.

2-2. Game: 회차, 입력한 값, 스트라이크, 볼의 카운트를 가진다.

3. totalTurn : 전체 진행된 회차를 저장한다.

4. bestTurn : 최고 기록을 저장한다.

5. isBest : 현재 기록이 최고 기옥인지 boolean값을 가진다.

- ### getData, setData

최고 기록을 유지하기 위해 react-native의 AsyncStorage를 사용했다. 

async와 await을 활용해 볼 수 있는 좋은 기회였다.

- ### generateTarget
랜덤 된 목표 값을 생성한다. 이는 state의 target에 해당된다.

1부터 9까지 배열 중 splice함수를 활용해 배열을 잘라서 중복되지 않은 수를 만들었다.

- ### reducer

1. CHECK

입력받은 값과 target값을 비교 한다.

나머지 연산자(%)를 통해 모든 값을 일관적인 식으로 검사 할 수 있었다.

2. RESET

모든 값을 초기화 시켜준다. 게임 결과 화면에서 다시하기 버튼을 누르면 dispatch한다.

- ### useGameState, useGameDispatch

context에서 useContext를 통해 미리 state와 dispatch를 실행하는 패턴의 함수를 export함으로써 편리한 사용이 가능하다.

