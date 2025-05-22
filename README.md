# PSWP Graphic-Tool

> for Practice SW Project Assignment

### 🚀 Getting Started

#### 1. Install Dependencies

```bash
yarn
```

#### 2. Run the Dev Server

```bash
yarn dev
```

### Feedback

- React.State를 통해 Object들을 관리하는 방식은 전혀 Model이 아님
  - 따로 Class를 선언해서 Model을 만들어줘야 함
  - 단 이러면 기존에 React.State를 사용해 얻는 이점 (변경 되었을 시 자동으로 state 사용하는 컴포넌트들 변경 적용)은 없어지기 때문에
    알아서 잘 깔끔하고 센스있게 이를 Observer Pattern으로 구현해주면 됨
- Model은 Object들의 정보를 관리하고, Select는 들고 있지 않음. Model의 Manager(Command랑 뭐가 다르지)가 일괄적으로 모델들을 수정할 수 있는 함수를 가지고 있고,
  Model 정보가 수정되면 구독되어있던 View Model들이 한번에 변경되도록 구현
  - Command 패턴 적용해서 모델들 수정된 내역 Stack으로 관리하고 Undo, Redo 구현
  - Select View Model 만들어서 Select 관리는 모델과 분리
- View는 모델들의 정보를 View Model로 부터 받아 그려내기만 하면 됨. 기존 React 코드 크게 변경할 필요 없을 거 같음
- View Model에서 Model Manager (또는 커맨드)가 제공하는 controller를 통해 모델 수정
- Composite 패턴 적용해서 다중선택 또는 그룹 구현 (묶을 때 배열이 아닌 객체로 묶어서 모델에서 관리할 때 다른 오브젝트들과 구별 X)

---

> 🚀 Happy Coding ! 🎨
