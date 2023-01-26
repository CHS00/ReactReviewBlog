import './App.css';
import React, {useState} from 'react';

function App() {

  let post = "아래는 map함수로 새로 만든 내용"
  // 기존 JS에선
  // document.querySelector("h4").textContent="맛집"과 같이 사용했지만
  // 리액트에선 위와같이 변수로 보관하여 {}를 사용해 가져온다
  // 이를 데이터바인딩이라 한다

  let [a,setA] = useState(['남자코트추천','강남맛집','자바스크립트'])
  // a는 state에 보관한 자료 (남자코트자료)
  // setA는 state변경을 도와주는 함수
  
  // state를 써야하는 이유 =
  // 유저가 수정을 할 경우, html이 자동으로 재랜더링이 되므로.


  function changeA() {
    let newA = [...a];
    newA[0]="여자코트추천"
    setA(newA);
  }
  // props시험용 함수


  let [logo,setLogo] = useState("리액트블로그");
  // 위와 같이 블로그이름을 바꾸는 state를 만들수도 있으나,
  // 블로그 이름과 같이 변동이 자주 일어나지않는 것은
  // state를 사용할 필요가 없다.

  let [like,setLike] = useState([0,0,0,0])

  let [modal,setModal] = useState(false); //false true, 0 1 등 형식은 자유

  
  let [title,setTitle] = useState(0)

  let [input,setInput] = useState("")

  let [date,setDate] = useState(["1월 15일","1월 9일","1월 1일"])

  return (
    // return소괄호 안에서는 하나의 태그로 모두를 감싸줘야한다
    <div className="App">

      <div className="black-nav">
        <h3>{logo}</h3>
      </div>

      <button onClick={()=>{
        let newArr = [...a];
        newArr.sort();
        setA(newArr)
      }}>가나다순</button>

      <div className="list">
        <h4>
          {a[0]}
          <span onClick={
            ()=>{
              let newLike = [...like];
              newLike[0] += 1
              setLike(newLike)
            }
            // state를 변경하고싶다면 무조건 state변경함수를 써야한다.
            // 함수에는 등호를 쓰지않도록 주의
          }>👍</span>
          {like[0]}
        </h4>
        <p>2월 17일</p>
        <button onClick={()=>{
          let copy = [...a];
          // 위와같이 처리해야하는 이유는 state의 작용원리를 보아야하는데,
          // state변경함수는 기존state와 신규state를 비교하여 같은경우,
          // 변경을 해주지않는다.

          // 또한 array데이터를 저장하는 변수는 해당 배열 가리키는
          // 수단으로밖에 사용되지않으므로
          // copy = a 와 같이 사용해도 변화가 생기지않게 된다.

          // 위(copy = a)와같이 작성한뒤,
          // console.log(copy==a)를 작성할시 true가 출력.
          // (같으므로 변경이 되지않음)

          // 자세한 사항은 reference data type 참조

          // 간단히 정리하자면, state가 array나 object와 같은
          // reference data type이라면,
          // 독립적 카피본(shallow copy)을 만들어 수정해야 한다는 뜻.

          // 위(let copy = [...a])처럼 작성할 경우,
          // 완전히 새로운 배열을 만들어 내므로, 정상적으로 작동한다.

          copy[0]="한겨울 여자코트추천"
          // 위와 같이 데이터를 수정한 뒤, 아래와 같이 적용
          setA(copy);
        }}>이름변경</button>
      </div>

      <div className="list">
        <h4 onClick={()=>{
          modal?setModal(false):setModal(true);
        }}>{a[2]}</h4>
        <p>2월 17일</p>
      </div>

      {/* ----------------아래는 map함수로 만든 것--------------- */}

      <h4 id={post} style={{color:"red",fontSize:"30px"}}>{post}</h4>
      {/* 위와같이 속성에도 {}로써 변수를 가져올 수 있다. */}
      {/* style을 넣을때는 style=color:"red"형식이 아닌,
        style={{스타일명:"값"}}로 사용한다
      */}

      {/* 
        컴포넌트 만들기 3단계
        1.function을 만든다.(return밖에다)
        2.return안에 html을 담는다.
        3.<함수명/>을 쓴다.
      */}
      {/* 
        컴포넌트로 만들어야 하는것
        1.반복적인 html을 축약할 때.
        2.큰 페이지들.
        3.자주 변경되는것들.
      */}

      {
        // {}안에선 for반복문을 사용할 수 없으므로 map함수를 써준다.
        a.map(function(내용,i){
          return (
            <div className="list" key={i}>
              <h4 onClick={()=>{
                modal?setModal(false):setModal(true);
                setTitle(i);
              }}>{내용}
                <span onClick={(e)=>{
                  e.stopPropagation();
                  // 따봉을 눌러도 모달창이 열려버리는 등의
                  // 상위 html요소로 퍼지는 이벤트 버블링을 막고싶을 때
                  // 사용하는것 (stopPropagation)
                  let newLike = [...like];
                  newLike[i+1] += 1
                  setLike(newLike);
                }
                } style={{userSelect:"none"}}>👍</span>
                {like[i+1]}
              </h4>
              
              <p>{date[i]}</p>
              <button onClick={()=>{
                let newA = [...a];
                newA.splice(i,1);
                setA(newA);
                let newLike = [...like];
                newLike.splice(i,1);
                setLike(newLike);
                let newDate = [...date];
                newDate.splice(i,1);
                setDate(newDate);
                console.log(like);

              }}>글 삭제</button>
            </div>
          )
        })
      }

      <input type="text" onChange={(e)=>{
        setInput(e.target.value);
      }} />
      <button onClick={()=>{
        if (input!="") {
          let newA = [...a];
          newA.unshift(input);
          setA(newA);

          let newLike = [...like];
          newLike.unshift(0);
          setLike(newLike);
          console.log(like);

          let newDate = [...date];
          let today = new Date();
          newDate.unshift(`${today.getMonth()+1}월 ${today.getDate()}일`);
          setDate(newDate);

        }else{alert("값입력")}
      }}>글 추가</button>

      {
        // 동적 UI작성
        // html의 공간이므로 if를 사용할수 없으므로 삼항연산자를 사용한다.
        modal
        ?<Modal number={title} color={"skyblue"} send={a} function={changeA}/>
        :null
      }
      {/* 
        동적 UI 만들기
        1.html css로 디자인 완성
        2.UI의 현재상태를 state로 저장
        3.state에 따라 UI가 어떻게 보일지 작성
      */}

      {/* 
        부모에서 자식에게로 state를 전송하는 법(props)
        1.자식 컴포넌트 자유롭게작명한이름={state이름}
        2.자식 컴포넌트에서 props파라미터 등록 후, props.생성한이름 사용
        (보통은 작명할이름과 state이름을 같게 한다) 
      */}

      <Modal2/>

    </div>
  );
}

function Modal(props){
  // 컴포넌트의 첫글자는 대문자로
  return (
    <div className='modal' style={{backgroundColor:props.color}}>
      <h4>{props.send[props.number]}</h4>
      {/* {a}와 같은 변수는 다른 함수에 있으므로 이곳에서 사용할수 없다. */}
      <p>날짜</p>
      <p>내용</p>
      <button onClick={props.function}>제목변경</button>
    </div>
  )
}
// const Modal = () => {} 과 같이 사용해도 무관하다.



// class형식의 컴포넌트를 만들어보기
// class를 쉽게 설명하자면 변수와 함수를 보관하는 통
class Modal2 extends React.Component{
  // class사용시 constructor, super, render를 필히 채워넣어야한다.
  // 아래와 같이 props전달
  constructor(props){
    super(props);
    // 변수는 아래와 같이 작성
    this.state = {
      name : "kim",
      age : 20
    }
  }
  render(){
    return(
      // render 아래에 html작성
      <div>
        <p>안녕하세요{this.state.name}</p>
        <p>{this.state.age}살</p>
        {/* state변경은 다음과 같이 */}
        <button onClick={()=>{
          this.setState({age:21})
        }}>나이변경</button>
      </div>
      
    )
  }
}

export default App;
